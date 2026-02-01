import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  // Switch to JSONPlaceholder for better stability during development
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    prepareHeaders: (headers) => {
      // Standard headers to look more like a browser request
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Testing with 'posts' instead of 'users' for JSONPlaceholder
    getUsers: builder.query({
      query: () => 'posts',
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery } = authApi;
