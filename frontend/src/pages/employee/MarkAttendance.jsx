import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIn, checkOut, getTodayStatus } from '../../store/slices/attendanceSlice';
import { checkTodayLeave } from '../../store/slices/leaveSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import { format } from 'date-fns';

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const { todayStatus, loading, error } = useSelector((state) => state.attendance);
  const { todayLeave } = useSelector((state) => state.leaves);
  const [localStatus, setLocalStatus] = useState(null);

  useEffect(() => {
    dispatch(getTodayStatus());
    dispatch(checkTodayLeave());
  }, [dispatch]);

  useEffect(() => {
    if (todayStatus) {
      setLocalStatus(todayStatus);
    }
  }, [todayStatus]);

  const handleCheckIn = async () => {
    const result = await dispatch(checkIn());
    if (checkIn.fulfilled.match(result)) {
      dispatch(getTodayStatus());
    }
  };

  const handleCheckOut = async () => {
    const result = await dispatch(checkOut());
    if (checkOut.fulfilled.match(result)) {
      dispatch(getTodayStatus());
    }
  };

  const hasApprovedLeave = todayLeave && todayLeave.status === 'approved';
  const canCheckIn = !hasApprovedLeave && (!localStatus || !localStatus.checkInTime);
  const canCheckOut = localStatus && localStatus.checkInTime && !localStatus.checkOutTime;

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'half-day':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Layout role="employee">
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mark Attendance</h1>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => dispatch({ type: 'attendance/clearError' })}
          />
        )}

        {hasApprovedLeave && (
          <Alert
            type="info"
            message={`Your leave for today is approved. Leave Type: ${todayLeave.leaveType?.name || 'N/A'}`}
            className="mb-6"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Check In/Out Card */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Today's Attendance</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Date</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
              </div>

              {localStatus && localStatus.checkInTime && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Check In Time</p>
                  <p className="text-lg font-semibold text-green-600">
                    {format(new Date(localStatus.checkInTime), 'hh:mm:ss a')}
                  </p>
                </div>
              )}

              {localStatus && localStatus.checkOutTime && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Check Out Time</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {format(new Date(localStatus.checkOutTime), 'hh:mm:ss a')}
                  </p>
                </div>
              )}

              {localStatus && localStatus.status && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(
                      localStatus.status
                    )}`}
                  >
                    {localStatus.status.toUpperCase()}
                  </span>
                </div>
              )}

              {localStatus && localStatus.totalHours > 0 && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Hours</p>
                  <p className="text-lg font-semibold text-primary-600">
                    {localStatus.totalHours.toFixed(2)} hours
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={handleCheckIn}
                  disabled={!canCheckIn || loading}
                >
                  {loading ? <LoadingSpinner size="sm" /> : 'Check In'}
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleCheckOut}
                  disabled={!canCheckOut || loading}
                >
                  {loading ? <LoadingSpinner size="sm" /> : 'Check Out'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Instructions Card */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Instructions</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Click "Check In" when you arrive at work</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Click "Check Out" when you leave work</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠</span>
                <span>Check-in after 9:30 AM will be marked as "Late"</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">⚠</span>
                <span>Working less than 4 hours will be marked as "Half Day"</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>You can only check in once per day</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>You must check in before checking out</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MarkAttendance;

