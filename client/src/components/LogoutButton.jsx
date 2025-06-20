import api from "../api";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await api.post("/logout");
    dispatch(logoutSuccess());
    alert("Sesión cerrada");
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}