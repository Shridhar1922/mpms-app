import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth.api';
import { employeesApi } from './api/employees.api';
import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';
import employeesReducer from './slices/employeesSlice';
import { dashboardApi } from './api/dashboard.api';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    auth: authReducer,
    employees: employeesReducer,
    dashboard: dashboardReducer,
  },
  // Adding the api middleware enables caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      dashboardApi.middleware,
      employeesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
