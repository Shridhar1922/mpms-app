import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AttendanceStatus =
  | 'present'
  | 'absent'
  | 'weekly-off'
  | 'holiday'
  | 'leave'
  | 'half-day';

export interface CheckInOutRecord {
  date: string; // YYYY-MM-DD format
  checkInTime?: string; // HH:mm format
  checkOutTime?: string; // HH:mm format
  status: 'checked-in' | 'checked-out' | 'absent';
  attendanceStatus?: AttendanceStatus; // attendance calendar status
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Holiday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD format
  description: string;
}

export interface DashboardState {
  checkInOutRecords: CheckInOutRecord[];
  announcements: Announcement[];
  holidays: Holiday[];
  currentDayCheckedIn: boolean;
  currentDayCheckedOut: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  checkInOutRecords: [],
  announcements: [],
  holidays: [],
  currentDayCheckedIn: false,
  currentDayCheckedOut: false,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCheckInOutRecords: (state, action: PayloadAction<CheckInOutRecord[]>) => {
      state.checkInOutRecords = action.payload;
    },
    addCheckInOutRecord: (state, action: PayloadAction<CheckInOutRecord>) => {
      const existingIndex = state.checkInOutRecords.findIndex(
        (record) => record.date === action.payload.date
      );
      if (existingIndex >= 0) {
        state.checkInOutRecords[existingIndex] = {
          ...state.checkInOutRecords[existingIndex],
          ...action.payload,
        };
      } else {
        state.checkInOutRecords.push(action.payload);
      }
    },
    checkIn: (state, action: PayloadAction<{ date: string; time: string }>) => {
      const { date, time } = action.payload;
      const existingIndex = state.checkInOutRecords.findIndex((record) => record.date === date);
      if (existingIndex >= 0) {
        state.checkInOutRecords[existingIndex].checkInTime = time;
        state.checkInOutRecords[existingIndex].status = 'checked-in';
      } else {
        state.checkInOutRecords.push({
          date,
          checkInTime: time,
          status: 'checked-in',
        });
      }
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        state.currentDayCheckedIn = true;
      }
    },
    checkOut: (state, action: PayloadAction<{ date: string; time: string }>) => {
      const { date, time } = action.payload;
      const existingIndex = state.checkInOutRecords.findIndex((record) => record.date === date);
      if (existingIndex >= 0) {
        state.checkInOutRecords[existingIndex].checkOutTime = time;
        state.checkInOutRecords[existingIndex].status = 'checked-out';
      } else {
        state.checkInOutRecords.push({
          date,
          checkOutTime: time,
          status: 'checked-out',
        });
      }
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        state.currentDayCheckedOut = true;
      }
    },
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => {
      state.announcements = action.payload;
    },
    setHolidays: (state, action: PayloadAction<Holiday[]>) => {
      state.holidays = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCheckInOutRecords,
  addCheckInOutRecord,
  checkIn,
  checkOut,
  setAnnouncements,
  setHolidays,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
