import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ENDPOINT_LOGIN } from '../apiTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // iOS often requires this to explicitly expect JSON back
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: API_ENDPOINT_LOGIN,
        method: 'POST',
        body: payload,
      }),
      // Help debug iOS-specific response issues
      transformResponse: (response: any) => {
        return response;
      },
      // Log the error specifically for iOS debugging
      transformErrorResponse: (response) => {
        console.log('iOS Network Error Detail:', response);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
