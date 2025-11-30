import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchBadges = createAsyncThunk(
  'badges/fetchBadges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/badges/me`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch badges'
      );
    }
  }
);

export const evaluateBadges = createAsyncThunk(
  'badges/evaluateBadges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/badges/evaluate`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to evaluate badges'
      );
    }
  }
);

const badgeSlice = createSlice({
  name: 'badges',
  initialState: {
    badges: [],
    currentStreak: 0,
    longestStreak: 0,
    allBadges: {},
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
      .addCase(fetchBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.badges = action.payload.badges || [];
        state.currentStreak = action.payload.currentStreak || 0;
        state.longestStreak = action.payload.longestStreak || 0;
        state.allBadges = action.payload.allBadges || {};
      })
      .addCase(fetchBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(evaluateBadges.fulfilled, (state, action) => {
        state.badges = action.payload.badges || state.badges;
        state.currentStreak = action.payload.currentStreak || state.currentStreak;
        state.longestStreak = action.payload.longestStreak || state.longestStreak;
      });
  },
});

export const { clearError } = badgeSlice.actions;
export default badgeSlice.reducer;
