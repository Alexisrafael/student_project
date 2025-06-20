import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // para redirigir a login
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    emailUser: "",
    password: "",
    identificate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(register(form));
      alert("Registro exitoso");
      navigate("/login"); // redirige al login
    } catch (err) {
      alert(err.response?.data?.error || "Error en el registro");
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="text-gradient">Crear una cuenta</h1>
        <div className="auth-form">
          <input name="name" placeholder="Nombres (Obligatorio)" onChange={handleChange} />
          <input name="lastName" placeholder="Apellidos (Obligatorio)" onChange={handleChange} />
          <input name="email" placeholder="Email del representante (Obligatorio)" onChange={handleChange} />
          <input name="emailUser" placeholder="Email de usuario (Obligatorio)" onChange={handleChange} />
          <input name="phone" placeholder="Telefono del representate (Obligatorio)" onChange={handleChange} />
          <input name="address" placeholder="Dirección del representate (Obligatorio)" onChange={handleChange} />
          <input name="profession" placeholder="A que se dedica el representate" onChange={handleChange} />
          <input name="age" placeholder="Edad del usuario (Obligatorio)" onChange={handleChange} />
          <input name="identificate" placeholder="Identificación (Obligatorio)" onChange={handleChange} />
          <input
            type="password"
            name="password"
            placeholder="Contraseña (Obligatorio)"
            onChange={handleChange}
          />
          <button className="gradient-button" onClick={handleSubmit}>Registrarse</button>

          <div className="form-footer">
            <button
              type="button"
              className="gradient-button"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}