import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ENDPOINT_LOGIN, API_ENDPOINT_REFRESH_TOKEN } from '../apiTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        return {
          url: API_ENDPOINT_LOGIN,
          method: 'POST',
          body: payload,
        };
      },
    }),
    refreshToken: builder.mutation({
      query: (payload) => ({
        url: API_ENDPOINT_REFRESH_TOKEN,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
