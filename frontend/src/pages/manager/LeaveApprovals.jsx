import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  getPendingLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  holdLeave,
} from '../../store/slices/leaveSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import { format } from 'date-fns';

const LeaveApprovals = () => {
  const dispatch = useDispatch();
  const { pendingLeaves, allLeaves, loading, error } = useSelector((state) => state.leaves);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [managerRemarks, setManagerRemarks] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [conflictWarning, setConflictWarning] = useState(null);

  useEffect(() => {
    dispatch(getPendingLeaves());
    dispatch(getAllLeaves());
  }, [dispatch]);

  const handleAction = async (leave, action) => {
    setSelectedLeave(leave);
    setActionType(action);
    setManagerRemarks('');
    setConflictWarning(null);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedLeave) return;

    let result;
    if (actionType === 'approve') {
      result = await dispatch(approveLeave({ leaveId: selectedLeave._id, managerRemarks }));
      if (approveLeave.fulfilled.match(result) && result.payload.conflictWarning) {
        setConflictWarning(result.payload.conflictWarning);
        return;
      }
    } else if (actionType === 'reject') {
      result = await dispatch(rejectLeave({ leaveId: selectedLeave._id, managerRemarks }));
    } else if (actionType === 'hold') {
      result = await dispatch(holdLeave({ leaveId: selectedLeave._id, managerRemarks }));
    }

    if (result && (result.type.endsWith('/fulfilled') || result.type.endsWith('/rejected'))) {
      setShowModal(false);
      setSelectedLeave(null);
      dispatch(getPendingLeaves());
      dispatch(getAllLeaves());
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'on-hold':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Get today's leaves
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaysLeaves = allLeaves.filter((leave) => {
    const fromDate = new Date(leave.fromDate);
    const toDate = new Date(leave.toDate);
    return leave.status === 'approved' && fromDate <= tomorrow && toDate >= today;
  });

  // Department-wise distribution
  const departmentStats = {};
  allLeaves
    .filter((l) => l.status === 'approved')
    .forEach((leave) => {
      const dept = leave.userId.department || 'Unassigned';
      if (!departmentStats[dept]) {
        departmentStats[dept] = 0;
      }
      departmentStats[dept]++;
    });

  return (
    <Layout role="manager">
      <div className="px-4 sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Leave Approvals
        </motion.h1>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => dispatch({ type: 'leaves/clearError' })}
          />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {pendingLeaves.length}
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Today's Leaves
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {todaysLeaves.length}
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Total Approved
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {allLeaves.filter((l) => l.status === 'approved').length}
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Departments
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {Object.keys(departmentStats).length}
            </p>
          </Card>
        </div>

        {/* Department Distribution */}
        {Object.keys(departmentStats).length > 0 && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Department-wise Leave Distribution
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(departmentStats).map(([dept, count]) => (
                <div key={dept} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{dept}</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {count}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Pending Leaves */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Pending Leave Requests
          </h2>
          {loading ? (
            <LoadingSpinner />
          ) : pendingLeaves.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {pendingLeaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {leave.userId.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {leave.userId.employeeId} - {leave.userId.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {leave.leaveType.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(leave.fromDate), 'MMM dd')} -{' '}
                        {format(new Date(leave.toDate), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {leave.totalDays}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {leave.reason.substring(0, 50)}
                        {leave.reason.length > 50 && '...'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAction(leave, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleAction(leave, 'reject')}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleAction(leave, 'hold')}
                        >
                          Hold
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No pending leave requests
            </p>
          )}
        </Card>

        {/* Action Modal */}
        {showModal && selectedLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {actionType === 'approve'
                  ? 'Approve Leave Request'
                  : actionType === 'reject'
                  ? 'Reject Leave Request'
                  : 'Put Leave On Hold'}
              </h3>

              {conflictWarning && (
                <Alert
                  type="warning"
                  message={conflictWarning.message}
                  className="mb-4"
                />
              )}

              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Employee:</strong> {selectedLeave.userId.name} ({selectedLeave.userId.employeeId})
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Leave Type:</strong> {selectedLeave.leaveType.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Dates:</strong> {format(new Date(selectedLeave.fromDate), 'MMM dd')} -{' '}
                  {format(new Date(selectedLeave.toDate), 'MMM dd, yyyy')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Reason:</strong> {selectedLeave.reason}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Manager Remarks {actionType === 'reject' && '*'}
                </label>
                <textarea
                  value={managerRemarks}
                  onChange={(e) => setManagerRemarks(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  required={actionType === 'reject'}
                  placeholder="Enter your remarks..."
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  variant={actionType === 'approve' ? 'success' : actionType === 'reject' ? 'danger' : 'warning'}
                  onClick={confirmAction}
                  className="flex-1"
                >
                  Confirm
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedLeave(null);
                    setConflictWarning(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LeaveApprovals;

