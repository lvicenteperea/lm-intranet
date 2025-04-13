import React, { useState } from "react";
import "./Header.css";
import userDefaultImage from "../../assets/images/user-default.png";
import logo from "../../assets/images/logo.png"


const Header = ({ user, onLogout, onShowUserInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Obtener la imagen del usuario o la predeterminada
  const userImage = user?.img ? require(`../../assets/images/${user.img}`) : userDefaultImage;

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <a href="https://pastelerialamallorquina.es/" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" />
        </a>
      </div>

      {/* Menú de usuario */}
      <div className="user-menu">
        {/* Imagen del usuario */}
        <img
          src={userImage}
          alt="Usuario"
          className="user-avatar"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* Nombre del usuario con menú desplegable */}
        <div className="user-info">
          <p className="username" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {user?.name || "Usuario"}
          </p>
        </div>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={onShowUserInfo}>Mis Datos</button>
            <button onClick={onLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
