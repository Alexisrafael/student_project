import { createSlice } from '@reduxjs/toolkit';
import { resetPassword } from "./actions";

const initialState = {
  user: null,
  isAuthenticated: false,
  users: [], // Para almacenar todos los usuarios
  resetStatus: { loading: false, success: "", error: "" }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetStatus = { loading: true, success: "", error: "" };
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetStatus = { loading: false, success: action.payload, error: "" };
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetStatus = { loading: false, success: "", error: action.payload };
      });
  },
});

export const { loginSuccess, logoutSuccess, setAllUsers } = authSlice.actions;

export default authSlice.reducer;