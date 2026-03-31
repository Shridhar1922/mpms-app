import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../constants/StaticData';
import {
  BASE_URL,
  API_ENDPOINT_HOLIDAYS,
  API_ENDPOINT_CHECKIN,
  API_ENDPOINT_CHECKOUT,
  API_ENDPOINT_ATTENDANCE_BY_EMPLOYEE,
  API_ENDPOINT_EMPLOYEES,
  API_ENDPOINT_EMPLOYERS,
} from '../apiTypes';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      // Don't set Content-Type for FormData requests
      const isFormData = headers.get('x-is-formdata');
      if (!isFormData) {
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
      } else {
        headers.delete('x-is-formdata');
        headers.set('Accept', 'application/json');
        // Let the browser set Content-Type with boundary for FormData
      }

      try {
        const token = await AsyncStorage.getItem(USER_INFO.TOKEN);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.warn('Failed to get token from storage', error);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHolidays: builder.query({
      query: () => ({
        url: API_ENDPOINT_HOLIDAYS,
        method: 'GET',
      }),
    }),
    getTodayAttendance: builder.query({
      query: ({ employeeId, date }) => {
        return {
          url: `${API_ENDPOINT_CHECKIN}/${employeeId}?date=${date}`,
          method: 'GET',
        };
      },
    }),
    checkIn: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINT_CHECKIN,
        method: 'POST',
        body: data,
      }),
    }),
    checkOut: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINT_CHECKOUT}/${data.attendanceId}`,
        method: 'PATCH',
        body: {
          attendanceType: data.attendanceType,
          checkOutAt: data.checkOutAt,
        },
      }),
    }),
    getAttendancesByMonth: builder.query({
      query: ({ employeeId, year, month, limit = 31 }) => ({
        url: `${API_ENDPOINT_ATTENDANCE_BY_EMPLOYEE}/${employeeId}?year=${year}&month=${month}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetHolidaysQuery,
  useGetTodayAttendanceQuery,
  useLazyGetTodayAttendanceQuery,
  useCheckInMutation,
  useCheckOutMutation,
  useLazyGetAttendancesByMonthQuery,
} = dashboardApi;
