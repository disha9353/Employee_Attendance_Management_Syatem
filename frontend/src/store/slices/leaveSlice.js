import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const submitLeaveRequest = createAsyncThunk(
  'leaves/submitRequest',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/leaves/request`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit leave request'
      );
    }
  }
);

export const getMyLeaves = createAsyncThunk(
  'leaves/getMyLeaves',
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leaves/my-leaves`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get leaves'
      );
    }
  }
);

export const getLeaveBalance = createAsyncThunk(
  'leaves/getLeaveBalance',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leaves/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get leave balance'
      );
    }
  }
);

export const getLeaveCalendar = createAsyncThunk(
  'leaves/getLeaveCalendar',
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leaves/calendar`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get leave calendar'
      );
    }
  }
);

export const checkTodayLeave = createAsyncThunk(
  'leaves/checkTodayLeave',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leaves/check-today`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to check today leave'
      );
    }
  }
);

// Manager thunks
export const getPendingLeaves = createAsyncThunk(
  'leaves/getPendingLeaves',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leaves/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get pending leaves'
      );
    }
  }
);

export const getAllLeaves = createAsyncThunk(
  'leaves/getAllLeaves',
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leaves/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all leaves'
      );
    }
  }
);

export const approveLeave = createAsyncThunk(
  'leaves/approveLeave',
  async ({ leaveId, managerRemarks }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/leaves/${leaveId}/approve`,
        { managerRemarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to approve leave'
      );
    }
  }
);

export const rejectLeave = createAsyncThunk(
  'leaves/rejectLeave',
  async ({ leaveId, managerRemarks }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/leaves/${leaveId}/reject`,
        { managerRemarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to reject leave'
      );
    }
  }
);

export const holdLeave = createAsyncThunk(
  'leaves/holdLeave',
  async ({ leaveId, managerRemarks }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/leaves/${leaveId}/hold`,
        { managerRemarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to put leave on hold'
      );
    }
  }
);

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    myLeaves: [],
    leaveBalance: [],
    leaveCalendar: [],
    pendingLeaves: [],
    allLeaves: [],
    todayLeave: null,
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
      .addCase(submitLeaveRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLeaveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.myLeaves.unshift(action.payload.leave);
      })
      .addCase(submitLeaveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyLeaves.fulfilled, (state, action) => {
        state.myLeaves = action.payload.leaves;
      })
      .addCase(getLeaveBalance.fulfilled, (state, action) => {
        state.leaveBalance = action.payload.balances || [];
      })
      .addCase(getLeaveBalance.rejected, (state) => {
        state.leaveBalance = [];
      })
      .addCase(getLeaveCalendar.fulfilled, (state, action) => {
        state.leaveCalendar = action.payload.leaves;
      })
      .addCase(checkTodayLeave.fulfilled, (state, action) => {
        state.todayLeave = action.payload.leave;
      })
      .addCase(getPendingLeaves.fulfilled, (state, action) => {
        state.pendingLeaves = action.payload.leaves;
      })
      .addCase(getAllLeaves.fulfilled, (state, action) => {
        state.allLeaves = action.payload.leaves;
      })
      .addCase(approveLeave.fulfilled, (state, action) => {
        const index = state.pendingLeaves.findIndex(
          (l) => l._id === action.payload.leave._id
        );
        if (index !== -1) {
          state.pendingLeaves.splice(index, 1);
        }
      })
      .addCase(rejectLeave.fulfilled, (state, action) => {
        const index = state.pendingLeaves.findIndex(
          (l) => l._id === action.payload.leave._id
        );
        if (index !== -1) {
          state.pendingLeaves.splice(index, 1);
        }
      })
      .addCase(holdLeave.fulfilled, (state, action) => {
        const index = state.pendingLeaves.findIndex(
          (l) => l._id === action.payload.leave._id
        );
        if (index !== -1) {
          state.pendingLeaves[index] = action.payload.leave;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          if (action.type.includes('leaves/')) {
            state.error = action.payload;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearError } = leaveSlice.actions;
export default leaveSlice.reducer;

