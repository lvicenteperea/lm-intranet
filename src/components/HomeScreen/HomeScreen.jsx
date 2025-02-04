// import React, { useState, useEffect } from 'react';
// import './HomeScreen.css';

// const HomeScreen = ({ user, options, onLogout }) => {
//   return (
//     <div className="home-container">
//       {/* Encabezado */}
//       <header className="header">
//         <img src="/logo.png" alt="Logo" className="logo" />
//         <div className="user-menu">
//           <img
//             src={user.image}
//             alt="Usuario"
//             className="user-avatar"
//           />
//           <div className="user-info">
//             <p>{user.name}</p>
//             <button onClick={onLogout} className="logout-button">Cerrar sesión</button>
//           </div>
//         </div>
//       </header>

//       {/* Contenido principal */}
//       <div className="main-content">
//         <nav className="menu">
//           {options.map((option, index) => (
//             <button key={index} className="menu-item">{option.text}</button>
//           ))}
//         </nav>
//         <section className="content-area">
//           <h2>Bienvenido, {user.name}</h2>
//           <p>Selecciona una opción del menú para comenzar.</p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;


import React, { useState } from 'react';
import SincronizaTodo from '../SincronizaTodo/SincronizaTodo';
import './HomeScreen.css';

const HomeScreen = ({ user, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="home-container">
      {/* Encabezado */}
      <header className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="user-menu">
          <img src={user.image} alt="Usuario" className="user-avatar" />
          <div className="user-info">
            <p>{user.name}</p>
            <button onClick={onLogout} className="logout-button">Cerrar sesión</button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="main-content">
        <nav className="menu">
          {user.options.map((option, index) => (  // 🔹 Usamos user.options aquí
            <button 
              key={index} 
              className="menu-item" 
              onClick={() => setSelectedOption(option.action)}
            >
              {option.text}
            </button>
          ))}
        </nav>
        
        <section className="content-area">
          {selectedOption === "openSincronizaTodo" ? <SincronizaTodo /> : <p>Selecciona una opción del menú</p>}
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
