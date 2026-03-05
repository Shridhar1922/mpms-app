import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
  // Adding the api middleware enables caching, invalidation, and polling
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
