// ---------------------------------------------------------------------
// js para llamar a la api REAL
// ---------------------------------------------------------------------
// // src/services/api.js
// export const login = async (username, password) => {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     });
//     return response.json();
//   };
  
//   export const forgotPassword = async (email) => {
//     const response = await fetch('/api/forgot-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email }),
//     });
//     return response.json();
//   };
  
//   export const getUserData = async (token) => {
//     const response = await fetch('/api/user', {
//       headers: { 'Authorization': `Bearer ${token}` },
//     });
//     return response.json();
//   };

// ---------------------------------------------------------------------
// SIMULACION DE API
// ---------------------------------------------------------------------

// src/services/authService.js
// Simulación de servicio de autenticación
// src/services/authService.js

export const login = async (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === '1234') {
        resolve({
          success: true,
          user: {
            name: 'Admin User',
            email: 'admin@example.com',
            image: 'https://via.placeholder.com/40',
            options: [
              { text: 'Sincroniza BBDD', action: 'openSincronizaTodo' },
              { text: 'Reportes', action: 'openReports' },
              { text: 'Configuración', action: 'openSettings' }
            ]
          }
        });
      } else {
        resolve({
          success: false,
          message: 'Usuario o contraseña incorrectos'
        });
      }
    }, 1000);
  });
};

export const forgotPassword = async (email) => {  // ✅ Asegurar que está exportado
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Se ha enviado un correo para restablecer la contraseña'
      });
    }, 1000);
  });
};

