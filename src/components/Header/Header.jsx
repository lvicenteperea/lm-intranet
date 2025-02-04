// src/components/Header/Header.jsx
import React, { useState } from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <a href="https://tu-logo.com" target="_blank" rel="noopener noreferrer">
          <img src="logo.png" alt="Logo" />
        </a>
      </div>
      <div className="user-menu">
        <img
          src={user.image}
          alt="Usuario"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={() => alert('Mostrar mis datos')}>Mis datos</button>
            <button onClick={onLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;