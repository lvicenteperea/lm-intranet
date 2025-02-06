// import React, { useState } from 'react';
// import Login from './components/Login/Login';
// import HomeScreen from './components/HomeScreen/HomeScreen';
// import { login } from './services/authService';
// import './App.css';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   const handleLoginSuccess = async (userData) => {
//     setUser(userData.user);
//     setToken(userData.token);
//     setIsLoggedIn(true);
//     console.log("Usuario logueado:", userData.user);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     setToken(null);
//   };

//   if (!isLoggedIn) {
//     return <Login onLoginSuccess={handleLoginSuccess} />;
//   }

//   return <HomeScreen user={user} onLogout={handleLogout} />;
// };

// export default App;


import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { login } from './services/authService';

const App = () => {
  const [user, setUser] = useState(null); // Inicialmente no hay usuario
  const [loading, setLoading] = useState(false); // Estado de carga

  // ✅ Verificar si localStorage está disponible
  const isStorageAvailable = (type) => {
    try {
      const storage = window[type];
      const testKey = "__test__";
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  };

  // ✅ Leer el token almacenado cuando la app se carga
  useEffect(() => {
    if (isStorageAvailable("localStorage")) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        console.log("🔑 Token encontrado en localStorage:", storedToken);
      } else {
        console.log("🚫 No hay token almacenado.");
      }
    } else {
      console.warn("⚠️ localStorage no está disponible.");
    }
  }, []);


  const handleLogin = async (username, password) => {
    setLoading(true); // Activamos la carga
    const result = await login(username, password);
    setLoading(false); // Terminamos la carga

    console.log("🔍 Resultado de login:", result); // Verifica qué devuelve la función login()


    if (result.success) {
      console.log("✅ Usuario logueado:", result.user); // Confirmamos que se guarda el usuario
      setUser(result.user); // Guardamos el usuario en el estado
    } else {
      console.error("❌ Error al conectar con el servidor:", result.message);
      alert(result.message); // Mostramos un mensaje si falla
    }
  };

  const handleLogout = () => {
    console.log("🚪 Cierre de sesión");
    setUser(null);
    if (isStorageAvailable("localStorage")) {
      localStorage.removeItem("token");
    }
  };

  return (
    <div>
      {user ? (
        <HomeScreen user={user} />
      ) : (
        <Login onLoginSuccess={setUser} />
      )}
    </div>
  );


};

export default App;
