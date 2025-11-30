import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getEmployeeDashboard, getTodayStatus } from '../../store/slices/attendanceSlice';
import { fetchBadges } from '../../store/slices/badgeSlice';
import { getLeaveBalance } from '../../store/slices/leaveSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import BadgeCard from '../../components/BadgeCard';
import Carousel from '../../components/Carousel';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);
  const { badges, currentStreak, longestStreak } = useSelector((state) => state.badges);
  const { leaveBalance } = useSelector((state) => state.leaves);

  useEffect(() => {
    dispatch(getEmployeeDashboard());
    dispatch(getTodayStatus());
    dispatch(fetchBadges());
    dispatch(getLeaveBalance());
  }, [dispatch]);

  if (loading && !dashboard) {
    return (
      <Layout role="employee">
        <LoadingSpinner size="lg" />
      </Layout>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'late':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'half-day':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'absent':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const chartData = dashboard?.last7Days?.map((day) => ({
    date: format(new Date(day.date), 'MMM dd'),
    hours: day.totalHours || 0,
  })) || [];

  // Create slideshow slides for achievements
  const achievementSlides = [
    <div key="slide1" className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium mb-2 opacity-90">Current Streak</h3>
          <p className="text-5xl font-bold mb-2">{currentStreak || 0} 🔥</p>
          <p className="text-xs opacity-75">Keep it up!</p>
        </div>
        <div className="text-6xl opacity-50">🔥</div>
      </div>
    </div>,
    <div key="slide2" className="relative h-48 bg-gradient-to-br from-yellow-500 via-orange-600 to-red-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium mb-2 opacity-90">Longest Streak</h3>
          <p className="text-5xl font-bold mb-2">{longestStreak || 0} ⭐</p>
          <p className="text-xs opacity-75">Personal best</p>
        </div>
        <div className="text-6xl opacity-50">⭐</div>
      </div>
    </div>,
    <div key="slide3" className="relative h-48 bg-gradient-to-br from-green-500 via-teal-600 to-cyan-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium mb-2 opacity-90">Badges Earned</h3>
          <p className="text-5xl font-bold mb-2">{badges?.length || 0} 🏆</p>
          <p className="text-xs opacity-75">Out of 4 available</p>
        </div>
        <div className="text-6xl opacity-50">🏆</div>
      </div>
    </div>,
  ];

  return (
    <Layout role="employee">
      <div className="px-4 sm:px-0">
        {/* Welcome Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Here's your attendance overview for today
          </p>
        </motion.div>

        {/* Achievement Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Achievements</h2>
          <Carousel slides={achievementSlides} autoPlay={true} interval={3000} />
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >

        {/* Recent Badges */}
        {badges && badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Your Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.slice(0, 4).map((badge, index) => (
                <BadgeCard key={badge.id || index} badge={badge} earned={true} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Leave Balance Summary */}
        {leaveBalance && leaveBalance.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Leave Balance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {leaveBalance.slice(0, 4).map((balance) => (
                  <div
                    key={balance._id}
                    className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {balance.leaveType.name}
                    </p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {balance.balance.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">days left</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Today's Status</h3>
                {dashboard?.todayStatus ? (
                  <div>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(
                        dashboard.todayStatus.status
                      )}`}
                    >
                      {dashboard.todayStatus.status.toUpperCase()}
                    </span>
                    {dashboard.todayStatus.checkInTime && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Check-in: {format(new Date(dashboard.todayStatus.checkInTime), 'hh:mm a')}
                      </p>
                    )}
                    {dashboard.todayStatus.checkOutTime && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Check-out: {format(new Date(dashboard.todayStatus.checkOutTime), 'hh:mm a')}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Not checked in today</p>
                )}
              </div>
              <div className="text-4xl opacity-50">📅</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Monthly Present</h3>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {dashboard?.monthlyStats?.present || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">✅</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Monthly Absent</h3>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400">
                  {dashboard?.monthlyStats?.absent || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">❌</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Hours (Month)</h3>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {dashboard?.monthlyStats?.totalHours?.toFixed(1) || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">⏰</div>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">📊</span> Monthly Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700"
              >
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {dashboard?.monthlyStats?.present || 0}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Present</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl border border-red-200 dark:border-red-700"
              >
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                  {dashboard?.monthlyStats?.absent || 0}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Absent</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl border border-yellow-200 dark:border-yellow-700"
              >
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                  {dashboard?.monthlyStats?.late || 0}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Late</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border border-orange-200 dark:border-orange-700"
              >
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {dashboard?.monthlyStats?.halfDay || 0}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Half Day</p>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Last 7 Days Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">📈</span> Last 7 Days Hours
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Hours"
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Last 7 Days History */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Last 7 Days History</h2>
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
                {dashboard?.last7Days?.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {format(new Date(day.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                          day.status
                        )}`}
                      >
                        {day.status?.toUpperCase() || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {day.checkInTime
                        ? format(new Date(day.checkInTime), 'hh:mm a')
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {day.checkOutTime
                        ? format(new Date(day.checkOutTime), 'hh:mm a')
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {day.totalHours?.toFixed(1) || 0} hrs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;

