import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';
import { dashboardApi } from './api/dashboard.api';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
  // Adding the api middleware enables caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, dashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
