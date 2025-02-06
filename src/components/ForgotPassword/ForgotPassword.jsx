// src/components/ForgotPassword/ForgotPassword.jsx
import React, { useState } from 'react';
// import { forgotPassword } from '../../services/authService'; // ✅ Cambiado desde api.js
import { forgotPassword } from '../../services/api'; // ✅ Seguirá funcionando

import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
    } catch (err) {
      setMessage('Error al conectar con el servidor 2');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {message && <p className="message">{message}</p>}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ForgotPassword;
