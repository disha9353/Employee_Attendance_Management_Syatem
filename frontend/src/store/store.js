import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import badgeReducer from './slices/badgeSlice';
import leaveReducer from './slices/leaveSlice';
import leaveTypeReducer from './slices/leaveTypeSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    badges: badgeReducer,
    leaves: leaveReducer,
    leaveTypes: leaveTypeReducer,
    notifications: notificationReducer,
  },
});

