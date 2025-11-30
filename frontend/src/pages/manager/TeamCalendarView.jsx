import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const TeamCalendarView = () => {
  const dispatch = useDispatch();
  const { allAttendance } = useSelector((state) => state.attendance);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
    const end = endOfMonth(new Date(selectedYear, selectedMonth - 1));
    dispatch(
      getAllAttendance({
        startDate: format(start, 'yyyy-MM-dd'),
        endDate: format(end, 'yyyy-MM-dd'),
      })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  const getDateStatus = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const records = allAttendance?.filter(
      (a) => format(new Date(a.date), 'yyyy-MM-dd') === dateStr
    ) || [];

    if (records.length === 0) return null;

    const present = records.filter((r) => r.status === 'present').length;
    const late = records.filter((r) => r.status === 'late').length;
    const absent = records.filter((r) => r.status === 'absent').length;
    const halfDay = records.filter((r) => r.status === 'half-day').length;

    return { present, late, absent, halfDay, total: records.length };
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-200';
    const { present, late, absent, total } = status;
    if (absent === total) return 'bg-red-500';
    if (present === total) return 'bg-green-500';
    if (late > 0) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const status = getDateStatus(date);
      return getStatusColor(status);
    }
    return null;
  };

  const selectedDateStatus = getDateStatus(selectedDate);
  const selectedDateRecords = allAttendance?.filter(
    (a) => format(new Date(a.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  ) || [];

  return (
    <Layout role="manager">
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Team Calendar View</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <div className="mb-4 flex flex-wrap gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                        {format(new Date(2000, month - 1), 'MMMM')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <Calendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  tileClassName={tileClassName}
                  className="w-full"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>All Present</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span>Some Late</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                  <span>Mixed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>All Absent</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Selected Date Details */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </h2>
            {selectedDateStatus ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Records</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {selectedDateStatus.total}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="text-xl font-bold text-green-600">
                      {selectedDateStatus.present}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Late</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {selectedDateStatus.late}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="text-xl font-bold text-red-600">
                      {selectedDateStatus.absent}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Half Day</p>
                    <p className="text-xl font-bold text-orange-600">
                      {selectedDateStatus.halfDay}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No attendance records for this date</p>
            )}
          </Card>
        </div>

        {/* Selected Date Records */}
        {selectedDateRecords.length > 0 && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Attendance Details for {format(selectedDate, 'MMMM dd, yyyy')}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedDateRecords.map((record) => (
                    <tr key={record._id || record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.userId?.employeeId || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.userId?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.userId?.department || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkInTime
                          ? format(new Date(record.checkInTime), 'hh:mm a')
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkOutTime
                          ? format(new Date(record.checkOutTime), 'hh:mm a')
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            record.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : record.status === 'late'
                              ? 'bg-yellow-100 text-yellow-800'
                              : record.status === 'half-day'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {record.status?.toUpperCase() || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.totalHours?.toFixed(1) || 0} hrs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TeamCalendarView;

