import React, { useState } from 'react';
import { login } from '../../services/api';
import './Login.css';

const Login = ({ onLoginSuccess, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar el mensaje de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Mostrar mensaje de carga mientras se espera la respuesta de la API

    try {
      const data = await login(username, password);
      setLoading(false); // Ocultar el mensaje de carga
      
      console.error("Vamos a ver data:", data);
      
      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Vamos a ver:error", err);
      setError('Error al conectar con el servidor 1');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading} // Deshabilitar input si está cargando
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // Deshabilitar input si está cargando
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Aceptar'} {/* Cambia el texto del botón */}
        </button>
      </form>

      {loading && <p className="loading-message">Conectando con el servidor...</p>} {/* Mensaje de carga */}
      {error && <p className="error-message">{error}</p>}

      <button onClick={onForgotPassword} disabled={loading}>Recuperar contraseña</button>
    </div>
  );
};

export default Login;
