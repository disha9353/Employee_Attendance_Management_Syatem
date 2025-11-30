import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import axios from 'axios';
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
} from 'recharts';
import { format } from 'date-fns';

const Reports = () => {
  const dispatch = useDispatch();
  const { allAttendance, loading } = useSelector((state) => state.attendance);
  const [filters, setFilters] = useState({
    startDate: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    department: '',
  });

  useEffect(() => {
    const params = {};
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.department) params.department = filters.department;

    dispatch(getAllAttendance(params));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.department) params.append('department', filters.department);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/attendance/export?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to export CSV');
    }
  };

  // Process data for charts
  const processChartData = () => {
    if (!allAttendance || allAttendance.length === 0) return [];

    const dateMap = {};
    allAttendance.forEach((record) => {
      const dateStr = format(new Date(record.date), 'yyyy-MM-dd');
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { date: dateStr, present: 0, late: 0, absent: 0, halfDay: 0 };
      }
      if (record.status === 'present') dateMap[dateStr].present++;
      else if (record.status === 'late') dateMap[dateStr].late++;
      else if (record.status === 'absent') dateMap[dateStr].absent++;
      else if (record.status === 'half-day') dateMap[dateStr].halfDay++;
    });

    return Object.values(dateMap)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => ({
        ...item,
        date: format(new Date(item.date), 'MMM dd'),
      }));
  };

  const chartData = processChartData();

  const summary = {
    total: allAttendance?.length || 0,
    present: allAttendance?.filter((a) => a.status === 'present').length || 0,
    late: allAttendance?.filter((a) => a.status === 'late').length || 0,
    absent: allAttendance?.filter((a) => a.status === 'absent').length || 0,
    halfDay: allAttendance?.filter((a) => a.status === 'half-day').length || 0,
    totalHours: allAttendance?.reduce((sum, a) => sum + (a.totalHours || 0), 0) || 0,
  };

  return (
    <Layout role="manager">
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Reports</h1>
          <Button variant="success" onClick={handleExport}>
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Report Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                placeholder="All Departments"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <p className="text-sm text-gray-600 mb-1">Total Records</p>
            <p className="text-2xl font-bold text-primary-600">{summary.total}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Present</p>
            <p className="text-2xl font-bold text-green-600">{summary.present}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Late</p>
            <p className="text-2xl font-bold text-yellow-600">{summary.late}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Absent</p>
            <p className="text-2xl font-bold text-red-600">{summary.absent}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Half Day</p>
            <p className="text-2xl font-bold text-orange-600">{summary.halfDay}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-1">Total Hours</p>
            <p className="text-2xl font-bold text-blue-600">{summary.totalHours.toFixed(1)}</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Attendance Trend</h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="present"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Present"
                  />
                  <Line
                    type="monotone"
                    dataKey="late"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Late"
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Absent"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Status Distribution</h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" />
                  <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Late" />
                  <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                  <Bar dataKey="halfDay" stackId="a" fill="#f97316" name="Half Day" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;

