import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Section4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  return (
    <div className="section4-container">
      <div className="auth-info">
        <h2>Bienvenido(a), {authUser?.name}</h2>
        <br />
        <p><b>Informasión Personal:</b></p>
        <br />
        <p><b>Email:</b> {authUser?.email}</p>
        <p><b>Dirección:</b> {authUser?.address}</p>
        <p><b>Telefono:</b> {authUser?.phone}</p>
        <p><b>Edad:</b> {authUser?.age} años</p>
        <br />
        <button
          className="gradient-button"
          onClick={() => navigate("/reset-password")}
        >
          Cambiar mi contraseña
        </button>
      </div>

      <h3>Usuarios asociados</h3>
      <br />
      {users.length === 0 ? (
        <p>No hay usuarios asociados.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Edad</th>
              <th>Telefono</th>
              <th>Sesiones iniciadas</th>
              <th>Ultima sesión</th>
              <th>Cambiar contraseña</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.type_user == 1 ? "usuario" : "Representate"}</td>
                <td>{u.age}</td>
                <td>{u.phone ? u.phone : "No aplica"}</td>
                <td>{u.sesionCount}</td>
                <td>{u.updatedAt}</td>
                <td>
                  <button
                    className="gradient-button small"
                    onClick={() => navigate(`/reset-password/${u.id}`)}
                  >
                    Cambiar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}