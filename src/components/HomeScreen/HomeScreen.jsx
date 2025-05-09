import React, { useState, useEffect } from 'react';
import Bienvenida from '../Bienvenida/Bienvenida';
import SincronizaTodo from '../SincronizaTodo/SincronizaTodo';
import Dashboard2 from '../SincronizaTodo2/SincronizaTodo2';
import CargaProdERP from '../CargaProdERP/CargaProdERP';
import Consultas from '../Consultas/Consultas'; 
import ArqueoCaja from '../arqueoCaja/ArqueoCaja'; 
import ArqueoCajaInf from '../ArqueoCajaInf/arqueoCajaInf';
import ConvierteTarifas from '../ConvierteTarifas/ConvierteTarifas';
import FichasTecnicas from '../FichasTecnicas/FichasTecnicas';
import Alergenos from '../Alergenos/Alergenos';
import MisDatos from '../MisDatos/MisDatos';
import RegisterUser from '../RegisterUser/RegisterUser';

import './HomeScreen.css';

const HomeScreen = ({ user, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuVisible, setMenuVisible] = useState(window.innerWidth > 390);

  useEffect(() => {
    const handleResize = () => {
      setMenuVisible(window.innerWidth > 390);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return <p>Cargando usuario...</p>;

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const renderContent = () => {
    if (user.showInfo) return <MisDatos user={user} />; // ✅ Mostramos los datos del usuario
   
    switch (selectedOption) {
      case "openSincronizaTodo": return <SincronizaTodo />;
      case "openSincronizaTodo2": return <Dashboard2 />;
      case "openCargaProdErp": return <CargaProdERP />;
      case "openConsultaCierre": return <Consultas />;
      case "openArqueoCaja": return <ArqueoCaja />;
      case "openArqueoCajaInf": return <ArqueoCajaInf />;
      case "openConvierteTarifas": return <ConvierteTarifas />;
      case "openFichasTecnicas": return <FichasTecnicas />;
      case "openAlergenos": return <Alergenos />;
      case "openAltaUsuario": return <RegisterUser
RegisterUser />;
      default:  return <Bienvenida />;
    }
  };

  return (
    <div className="home-container">
      {/* Botón de menú, solo visible cuando el menú está oculto */}
      {!menuVisible && (
        <button className="menu-toggle fixed" onClick={toggleMenu}>
          ☰
        </button>
      )}
      
      {/* Menú lateral */}
      <nav className={`menu ${menuVisible ? 'visible' : 'hidden'}`}>
        <button className="close-menu" onClick={toggleMenu}>✖</button>
        {user.options?.map((option, index) => (
          <button 
            key={index} 
            className="menu-item" 
            onClick={() => {
              setSelectedOption(option.action);
              user.showInfo = false;  // ✅ Ocultamos "Mis Datos" al seleccionar otra opción
            }}
          >
            {option.text}
          </button>
        ))}
      </nav>

      {/* Contenido principal */}
      {/* <div className={`content-area ${menuVisible ? 'menu-open' : ''}`}> */}
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomeScreen;
