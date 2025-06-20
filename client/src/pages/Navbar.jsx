import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setActiveSection }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <h3 className="logo">
        <a onClick={(e) => { e.preventDefault(); setActiveSection("section1"); }}>
          Sistema educativo
        </a>
      </h3>

      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <div className={`container-button ${open ? "open" : ""}`}>
        <a onClick={(e) => { e.preventDefault(); setActiveSection("section2"); }}>
          Contenido Teórico
        </a>
        <a onClick={(e) => { e.preventDefault(); setActiveSection("section3"); }}>
          Contenido Práctico
        </a>

        {isAuthenticated && (
          <div className="user-info">
            {user.type_user == 0 ? ( 
              <a onClick={(e) => { e.preventDefault(); setActiveSection("section4"); }}>
                <span className="name_user ">Hola, {user.name}</span>
              </a>
        ) :
            ( 
              <span className="title-link name_user">Hola, {user.name}</span>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
