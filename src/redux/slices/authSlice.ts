import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Define the User shape based on your API response
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface AuthState {
  // 2. Replace 'any' with the 'User' interface
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 3. Update the PayloadAction to use the User interface
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
