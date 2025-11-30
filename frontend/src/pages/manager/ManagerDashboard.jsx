import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getManagerDashboard } from '../../store/slices/attendanceSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import Carousel from '../../components/Carousel';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { managerDashboard, loading, error } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getManagerDashboard()).catch((err) => {
      console.error('Error loading manager dashboard:', err);
    });
  }, [dispatch]);

  if (loading && !managerDashboard) {
    return (
      <Layout role="manager">
        <div className="px-4 sm:px-0">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout role="manager">
        <div className="px-4 sm:px-0">
          <Alert type="error" message={error} />
          <button
            onClick={() => dispatch(getManagerDashboard())}
            className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  const departmentColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const departmentChartData = managerDashboard?.departmentStats?.map((dept, index) => ({
    name: dept.department,
    present: dept.present,
    late: dept.late,
    absent: dept.absent,
    fill: departmentColors[index % departmentColors.length],
  })) || [];

  const pieData = managerDashboard?.departmentStats?.map((dept, index) => ({
    name: dept.department,
    value: dept.totalEmployees,
    fill: departmentColors[index % departmentColors.length],
  })) || [];

  // Show empty state if no data
  if (!managerDashboard && !loading) {
    return (
      <Layout role="manager">
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Manager Dashboard - Welcome, {user?.name || 'Manager'}!
          </h1>
          <Card>
                <p className="text-gray-500">No data available. Please try refreshing the page.</p>
            <button
              onClick={() => dispatch(getManagerDashboard())}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
            >
              Refresh
            </button>
          </Card>
        </div>
      </Layout>
    );
  }

  // Create slideshow for stats
  const statsSlides = [
    <div key="slide1" className="relative h-48 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-2 opacity-90">Total Employees</h3>
        <p className="text-5xl font-bold mb-2">{managerDashboard?.totalEmployees || 0}</p>
        <p className="text-xs opacity-75">Active workforce</p>
      </div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-30">👥</div>
    </div>,
    <div key="slide2" className="relative h-48 bg-gradient-to-br from-green-600 via-teal-600 to-emerald-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-2 opacity-90">Present Today</h3>
        <p className="text-5xl font-bold mb-2">{managerDashboard?.todayStats?.present || 0}</p>
        <p className="text-xs opacity-75">Currently at work</p>
      </div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-30">✅</div>
    </div>,
    <div key="slide3" className="relative h-48 bg-gradient-to-br from-yellow-600 via-orange-600 to-amber-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-2 opacity-90">Late Today</h3>
        <p className="text-5xl font-bold mb-2">{managerDashboard?.todayStats?.late || 0}</p>
        <p className="text-xs opacity-75">Arrived after time</p>
      </div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-30">⏰</div>
    </div>,
    <div key="slide4" className="relative h-48 bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 rounded-xl overflow-hidden p-6 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-2 opacity-90">Absent Today</h3>
        <p className="text-5xl font-bold mb-2">{managerDashboard?.todayStats?.absent || 0}</p>
        <p className="text-xs opacity-75">Not present today</p>
      </div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-30">❌</div>
    </div>,
  ];

  return (
    <Layout role="manager">
      <div className="px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Manager Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name || 'Manager'}! 👋
          </p>
        </motion.div>

        {/* Stats Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Today's Overview</h2>
          <Carousel slides={statsSlides} autoPlay={true} interval={3500} />
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Employees</h3>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {managerDashboard?.totalEmployees || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">👥</div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Present Today</h3>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {managerDashboard?.todayStats?.present || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">✅</div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Late Today</h3>
                <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {managerDashboard?.todayStats?.late || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">⏰</div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Absent Today</h3>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400">
                  {managerDashboard?.todayStats?.absent || 0}
                </p>
              </div>
              <div className="text-4xl opacity-50">❌</div>
            </div>
          </Card>
        </motion.div>

        {/* Absent List */}
        {managerDashboard?.absentList && managerDashboard.absentList.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Absent Employees Today</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {managerDashboard.absentList.map((emp) => (
                    <tr key={emp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {emp.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.department}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Weekly Trend */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">📈</span> Weekly Attendance Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={managerDashboard?.weeklyTrend || []}>
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
                  dataKey="present"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Present"
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Absent"
                  dot={{ fill: '#ef4444', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Distribution */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">🥧</span> Department Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Department Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-2">📊</span> Department-wise Statistics
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
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
                <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" radius={[8, 8, 0, 0]} />
                <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Late" radius={[8, 8, 0, 0]} />
                <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;

