import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getLeaveCalendar } from '../../store/slices/leaveSlice';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay, parseISO } from 'date-fns';

const LeaveCalendar = () => {
  const dispatch = useDispatch();
  const { leaveCalendar, loading } = useSelector((state) => state.leaves);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(getLeaveCalendar({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const getLeaveStatus = (date) => {
    return leaveCalendar.find((leave) => {
      const fromDate = new Date(leave.fromDate);
      const toDate = new Date(leave.toDate);
      return date >= fromDate && date <= toDate;
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const leave = getLeaveStatus(date);
      if (leave) {
        switch (leave.status) {
          case 'approved':
            return 'bg-green-500 text-white';
          case 'pending':
            return 'bg-yellow-500 text-white';
          case 'rejected':
            return 'bg-red-500 text-white';
          case 'on-hold':
            return 'bg-orange-500 text-white';
          default:
            return '';
        }
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const leave = getLeaveStatus(date);
      if (leave && isSameDay(date, new Date(leave.fromDate))) {
        return <div className="text-xs font-bold">{leave.leaveType.code}</div>;
      }
    }
    return null;
  };

  return (
    <Layout role="employee">
      <div className="px-4 sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Leave Calendar
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Month
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year
                  </label>
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

              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex justify-center">
                  <Calendar
                    value={new Date(selectedYear, selectedMonth - 1, 1)}
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                    className="w-full"
                  />
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Approved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>Rejected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                  <span>On Hold</span>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Leave Details
              </h2>
              {loading ? (
                <LoadingSpinner />
              ) : leaveCalendar.length > 0 ? (
                <div className="space-y-3">
                  {leaveCalendar.map((leave) => (
                    <div
                      key={leave._id}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {leave.leaveType.name}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            leave.status === 'approved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : leave.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : leave.status === 'rejected'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          }`}
                        >
                          {leave.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(leave.fromDate), 'MMM dd')} -{' '}
                        {format(new Date(leave.toDate), 'MMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {leave.totalDays} day(s)
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No leaves for this period</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveCalendar;

