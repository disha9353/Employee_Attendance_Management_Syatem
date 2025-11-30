import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    if (allowedRoles.includes('employee')) {
      return <Navigate to="/employee/login" replace />;
    }
    return <Navigate to="/manager/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    if (user?.role === 'employee') {
      return <Navigate to="/employee/dashboard" replace />;
    }
    return <Navigate to="/manager/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;

