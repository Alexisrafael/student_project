import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { useEffect } from "react";
import { checkAuth } from "./redux/actions";
import { useDispatch } from "react-redux";
import Navbar from "./pages/Navbar";
import "./styles/normalize.css";
import "./styles/styles.css";
import ScrollToAnchor from "./components/ScrollToAnchor";
import ResetPassword from "./pages/ResetPassword";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  },[dispatch]);

  return (
    <Router>
      <ScrollToAnchor />
      <Routes>
        {/* Rutas públicas protegidas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
