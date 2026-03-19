import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_URL,
  API_ENDPOINT_LOGIN,
  API_ENDPOINT_REFRESH_TOKEN,
  API_ENDPOINT_HOLIDAYS,
} from '../apiTypes';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

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
  }),
});

export const { useGetHolidaysQuery } = dashboardApi;
