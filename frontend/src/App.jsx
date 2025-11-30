import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './store/slices/authSlice';

// Employee Routes
import EmployeeLogin from './pages/employee/EmployeeLogin';
import EmployeeRegister from './pages/employee/EmployeeRegister';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MarkAttendance from './pages/employee/MarkAttendance';
import MyAttendanceHistory from './pages/employee/MyAttendanceHistory';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import LeaveRequest from './pages/employee/LeaveRequest';
import LeaveCalendar from './pages/employee/LeaveCalendar';
import LeaveHistory from './pages/employee/LeaveHistory';

// Manager Routes
import ManagerLogin from './pages/manager/ManagerLogin';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import AllEmployeesAttendance from './pages/manager/AllEmployeesAttendance';
import TeamCalendarView from './pages/manager/TeamCalendarView';
import Reports from './pages/manager/Reports';
import LeaveApprovals from './pages/manager/LeaveApprovals';

// Components
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated && !user) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated, user]);

  // Show loading while checking authentication
  if (loading && !user && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/employee/login"
        element={
          isAuthenticated && user?.role === 'employee' ? (
            <Navigate to="/employee/dashboard" replace />
          ) : (
            <EmployeeLogin />
          )
        }
      />
      <Route
        path="/employee/register"
        element={
          isAuthenticated && user?.role === 'employee' ? (
            <Navigate to="/employee/dashboard" replace />
          ) : (
            <EmployeeRegister />
          )
        }
      />
      <Route
        path="/manager/login"
        element={
          isAuthenticated && user?.role === 'manager' ? (
            <Navigate to="/manager/dashboard" replace />
          ) : (
            <ManagerLogin />
          )
        }
      />

      {/* Employee Protected Routes */}
      <Route
        path="/employee/dashboard"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/mark-attendance"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <MarkAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/history"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <MyAttendanceHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/profile"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <EmployeeProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/leave-request"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <LeaveRequest />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/leave-calendar"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <LeaveCalendar />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/leave-history"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <LeaveHistory />
          </PrivateRoute>
        }
      />

      {/* Manager Protected Routes */}
      <Route
        path="/manager/dashboard"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <ManagerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/attendance"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <AllEmployeesAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/calendar"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <TeamCalendarView />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/reports"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/leave-approvals"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <LeaveApprovals />
          </PrivateRoute>
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={
          loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : isAuthenticated && user ? (
            user.role === 'employee' ? (
              <Navigate to="/employee/dashboard" replace />
            ) : (
              <Navigate to="/manager/dashboard" replace />
            )
          ) : (
            <Landing />
          )
        }
      />
    </Routes>
  );
}

export default App;

