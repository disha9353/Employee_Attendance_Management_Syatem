import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getLeaveTypes = createAsyncThunk(
  'leaveTypes/getLeaveTypes',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leave-types`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get leave types'
      );
    }
  }
);

export const createLeaveType = createAsyncThunk(
  'leaveTypes/createLeaveType',
  async (leaveTypeData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/leave-types`, leaveTypeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create leave type'
      );
    }
  }
);

export const updateLeaveType = createAsyncThunk(
  'leaveTypes/updateLeaveType',
  async ({ id, leaveTypeData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/leave-types/${id}`, leaveTypeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update leave type'
      );
    }
  }
);

export const deleteLeaveType = createAsyncThunk(
  'leaveTypes/deleteLeaveType',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/leave-types/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete leave type'
      );
    }
  }
);

const leaveTypeSlice = createSlice({
  name: 'leaveTypes',
  initialState: {
    leaveTypes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaveTypes.fulfilled, (state, action) => {
        state.leaveTypes = action.payload.leaveTypes;
      })
      .addCase(createLeaveType.fulfilled, (state, action) => {
        state.leaveTypes.push(action.payload.leaveType);
      })
      .addCase(updateLeaveType.fulfilled, (state, action) => {
        const index = state.leaveTypes.findIndex(
          (lt) => lt._id === action.payload.leaveType._id
        );
        if (index !== -1) {
          state.leaveTypes[index] = action.payload.leaveType;
        }
      })
      .addCase(deleteLeaveType.fulfilled, (state, action) => {
        const index = state.leaveTypes.findIndex(
          (lt) => lt._id === action.payload.leaveType._id
        );
        if (index !== -1) {
          state.leaveTypes[index].isActive = false;
        }
      })
      .addMatcher(
        (action) => action.type.includes('leaveTypes/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.includes('leaveTypes/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.includes('leaveTypes/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearError } = leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;

