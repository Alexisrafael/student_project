import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { loginSuccess, logoutSuccess, setAllUsers } from "./authSlice";

export const register = (userData) => async (dispatch) => {
  try {
    await api.post("/register", userData);
    return dispatch(login(userData.emailUser, userData.password)); //Inicia sesión automáticamente tras registrar
  } catch (err) {
    console.error("Error en el registro:", err);
    throw err; // para manejar errores en el componente
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await api.post("/login", { email, password });
    dispatch(loginSuccess(res.data.user)); // Guardamos el usuario en Redux
  } catch (err) {
    console.error("Error en el login:", err);
    throw err; // para manejar errores en el componente
  }
}

export const logout = () => async (dispatch) => {
  try {
    await api.post("/logout"); // limpia cookie
    dispatch(logoutSuccess());
  } catch (err) {
    console.error("Error en el logout:", err);
    throw err;
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const res = await api.get("/me"); // usa tu middleware con cookie
    dispatch(loginSuccess(res.data.user));
  } catch {
    dispatch(logoutSuccess());
  }
};

export const allUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users"); // usa tu middleware con cookie
    dispatch(setAllUsers(res.data));
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, newPassword, token, navigate }, { rejectWithValue }) => {
    try {
      const endpoint = token
        ? `/reset_password/${token}`
      : "/forgot_password";

      const payload = token ? { newPassword } : { email };
      console.log(endpoint)
      console.log(payload)
      const res = await api.post(endpoint, payload);

      // redirigir según acción exitosa
      if (token) {
        navigate("/login");
      }
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Ocurrió un error");
    }
  }
);
