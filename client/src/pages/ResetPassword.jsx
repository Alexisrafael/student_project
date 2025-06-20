import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/actions";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [search] = useSearchParams();
  const token = params.token;
  const email = search.get("email");
  const [emailUser, setEmailUser] = useState("")

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { loading, success, error } = useSelector((s) => s.auth.resetStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && newPassword !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    dispatch(
      resetPassword({ emailUser, newPassword, token, navigate })
    );
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="text-gradient text_shadow">{token ? "Restablecer contraseña" : "Solicitar restablecimiento de contraseña"}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {token ? (
            <>
              <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
              <input type="password" placeholder="Confirmar contraseña" value={confirm} onChange={(e) => setConfirm(e.target.value)} required/>
            </>
            ) : (
            <input type="email" placeholder="Tu correo electrónico" defaultValue={setEmailUser || ""} required />
          )}

          <button className="gradient-button" type="submit" disabled={loading}>
            {loading ? "Cargando..." : token ? "Actualizar contraseña" : "Enviar correo"}
          </button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="form-footer">
            <button type="button" className="gradient-button" onClick={() => navigate("/login")}>
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}