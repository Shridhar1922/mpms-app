import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../constants/StaticData';
import { BASE_URL, API_ENDPOINT_EMPLOYEES, API_ENDPOINT_EMPLOYERS } from '../apiTypes';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
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
    getEmployees: builder.query<any, void>({
      query: () => ({
        url: API_ENDPOINT_EMPLOYEES,
        method: 'GET',
      }),
    }),
    getEmployers: builder.query<any, void>({
      query: () => ({
        url: API_ENDPOINT_EMPLOYERS,
        method: 'GET',
      }),
    }),
    createEmployee: builder.mutation({
      query: (data) => {
        const isFormData = data instanceof FormData;
        return {
          url: API_ENDPOINT_EMPLOYEES,
          method: 'POST',
          body: data,
          headers: isFormData ? { 'x-is-formdata': 'true' } : undefined,
        };
      },
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployersQuery, useCreateEmployeeMutation } =
  employeesApi;
