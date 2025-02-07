import React, { useState } from 'react';
import Dashboard from '../SincronizaTodo/SincronizaTodo';
import Dashboard2 from '../SincronizaTodo2/SincronizaTodo2';
import CargaProdERP from '../CargaProdERP/CargaProdERP';
import Consultas from '../Consultas/Consultas'; // consultas
import './HomeScreen.css';

const HomeScreen = ({ user, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // ✅ Evitar errores si `user` es `undefined` o `null`
  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  const renderContent = () => {
    if (selectedOption === "openSincronizaTodo") {
      return <Dashboard />;
    } else if (selectedOption === "openSincronizaTodo2") {
      return <Dashboard2 />;
    } else if (selectedOption === "openCargaProdErp") {
      return <CargaProdERP />;
    } else if (selectedOption === "openConsultaCierre") {
      return <Consultas />;
    } else {
      return (<div>
              <h1>Bienvenido</h1> 
              <p>Selecciona una opción del menú</p>
              </div>);
    }
  };

  return (
    <div className="home-container">
      {/* Encabezado */}
      <header className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="user-menu">
          <img src="https://via.placeholder.com/40" alt="Usuario" className="user-avatar" />
          <div className="user-info">
            <p>{user?.name || "Usuario desconocido"} ({user?.ret_txt || "Sin mensaje"})</p> 
            <button onClick={onLogout} className="logout-button">Cerrar sesión</button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="main-content">
        <nav className="menu">
          {user.options?.map((option, index) => (
            <button 
              key={index} 
              className="menu-item" 
              onClick={() => setSelectedOption(option.action)}
            >
              {option.text}
            </button>
          ))}
        </nav>
        
        <div>
          {renderContent()} {/* Renderiza el contenido dinámico */}
        </div>

        {/* <section className="content-area">
        {selectedOption === "openSincronizaTodo" ? <Dashboard /> : <p>Selecciona una opción del menú</p>}
        {selectedOption === "openSincronizaTodo2" ? <Dashboard2 /> : <p>Selecciona una opción del menú2</p>}
        </section> */}
      </div>
    </div>
  );
};

export default HomeScreen;
