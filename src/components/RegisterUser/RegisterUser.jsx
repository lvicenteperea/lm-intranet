import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import './RegisterUser.css';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setMensaje('');
    setLoading(true);

    const response = await registerUser(username, email, password);
    setLoading(false);

    if (response.success) {
      setMensaje("✅ Registro exitoso");
    } else {
      setMensaje(`❌ ${response.message}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar Usuario</h2>

      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Nombre de usuario:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Contraseña:</label>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Ocultar" : "Mostrar"}
      </button>

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default RegisterUser;
