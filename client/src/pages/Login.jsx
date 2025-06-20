import { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });
      dispatch(loginSuccess(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="text-gradient text_shadow">Bienvenido al Sistema Educativo</h1>
        <div className="auth-form">
          <h2>Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="link-button gradient-button" onClick={handleLogin}>Entrar</button>

          <div className="form-footer">
            <button
              type="button"
              className="link-button gradient-button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
            <button
              type="button"
              className="link-button gradient-button"
              onClick={() => navigate("/reset-password")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}