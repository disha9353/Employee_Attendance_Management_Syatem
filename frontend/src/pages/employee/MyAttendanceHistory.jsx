import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getMyHistory, getMySummary } from '../../store/slices/attendanceSlice';
import { fetchBadges } from '../../store/slices/badgeSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, startOfMonth, endOfMonth, isSameDay, addDays, subDays } from 'date-fns';

const MyAttendanceHistory = () => {
  const dispatch = useDispatch();
  const { history, summary, loading } = useSelector((state) => state.attendance);
  const { currentStreak, badges } = useSelector((state) => state.badges);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [streakDays, setStreakDays] = useState([]);

  useEffect(() => {
    dispatch(getMyHistory({ month: selectedMonth, year: selectedYear }));
    dispatch(getMySummary({ month: selectedMonth, year: selectedYear }));
    dispatch(fetchBadges());
  }, [dispatch, selectedMonth, selectedYear]);

  // Calculate streak days
  useEffect(() => {
    if (history && currentStreak > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const streakDates = [];
      
      for (let i = 0; i < currentStreak; i++) {
        const date = subDays(today, i);
        const dateStr = format(date, 'yyyy-MM-dd');
        const record = history.find(
          (h) => format(new Date(h.date), 'yyyy-MM-dd') === dateStr
        );
        if (record && (record.status === 'present' || record.status === 'late')) {
          streakDates.push(dateStr);
        }
      }
      setStreakDays(streakDates);
    }
  }, [history, currentStreak]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'absent':
        return 'bg-red-500';
      case 'late':
        return 'bg-yellow-500';
      case 'half-day':
        return 'bg-orange-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getDateStatus = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = history?.find(
      (h) => format(new Date(h.date), 'yyyy-MM-dd') === dateStr
    );
    return record?.status || null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const status = getDateStatus(date);
      const dateStr = format(date, 'yyyy-MM-dd');
      const isStreakDay = streakDays.includes(dateStr);
      
      if (status) {
        let className = getStatusColor(status);
        if (isStreakDay) {
          className += ' ring-2 ring-yellow-400 ring-offset-2';
        }
        return className;
      }
    }
    return null;
  };

  const getBadgeMilestone = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = history?.find(
      (h) => format(new Date(h.date), 'yyyy-MM-dd') === dateStr
    );
    if (!record) return null;
    
    // Check if this day contributed to a badge milestone
    if (badges?.includes('On-Time Streak 5 Days') && streakDays.includes(dateStr)) {
      return 'Contributed to 5-day streak badge!';
    }
    return null;
  };

  const getStatusCount = (status) => {
    return history?.filter((h) => h.status === status).length || 0;
  };

  return (
    <Layout role="employee">
      <div className="px-4 sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          My Attendance History
        </motion.h1>

        {/* Streak Info */}
        {currentStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-bold">Current Streak: {currentStreak} days!</p>
                <p className="text-sm opacity-90">
                  {streakDays.length > 0 && 'Highlighted days contribute to your streak'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Month/Year Selector */}
        <Card className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {format(new Date(2000, month - 1), 'MMMM')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Present</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{getStatusCount('present')}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Absent</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{getStatusCount('absent')}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Late</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{getStatusCount('late')}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Half Day</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{getStatusCount('half-day')}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Calendar */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Calendar View</h2>
            <div className="flex justify-center">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                tileClassName={tileClassName}
                className="w-full"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span>Late</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span>Half Day</span>
              </div>
              {currentStreak > 0 && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 ring-2 ring-yellow-400 ring-offset-1 rounded mr-2"></div>
                  <span>Streak Day</span>
                </div>
              )}
            </div>
          </Card>

          {/* Monthly Summary */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monthly Summary</h2>
            {summary && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {summary.summary?.totalHours?.toFixed(1) || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
                  <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                    {summary.summary?.totalDays || 0}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Present:</span>
                      <span className="font-semibold">{summary.summary?.present || 0}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Absent:</span>
                      <span className="font-semibold">{summary.summary?.absent || 0}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Late:</span>
                      <span className="font-semibold">{summary.summary?.late || 0}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Half Day:</span>
                      <span className="font-semibold">{summary.summary?.halfDay || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* History Table */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detailed History</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {history && history.length > 0 ? (
                    history.map((record) => {
                      const dateStr = format(new Date(record.date), 'yyyy-MM-dd');
                      const isStreakDay = streakDays.includes(dateStr);
                      const badgeMilestone = getBadgeMilestone(new Date(record.date));
                      
                      return (
                        <tr
                          key={record._id || record.id}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            isStreakDay ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                          }`}
                          title={badgeMilestone || ''}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {format(new Date(record.date), 'MMM dd, yyyy')}
                            {isStreakDay && <span className="ml-2">🔥</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                                record.status
                              )} text-white`}
                            >
                              {record.status?.toUpperCase() || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {record.checkInTime
                              ? format(new Date(record.checkInTime), 'hh:mm a')
                              : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {record.checkOutTime
                              ? format(new Date(record.checkOutTime), 'hh:mm a')
                              : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {record.totalHours?.toFixed(1) || 0} hrs
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default MyAttendanceHistory;

