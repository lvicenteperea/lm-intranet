import React, { useState } from 'react';
import { sincronizaTodo } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [fileName, setFileName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await sincronizaTodo(fileName, date);
    
    setLoading(false);
    setMessage(response.message);
  };

  return (
    <div className="dashboard-container">
      <h2>Sincronización de Datos</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del fichero:</label>
        <input 
          type="text" 
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
          required 
        />

        <label>Fecha:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />

        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Ejecutar Sincronización"}
        </button>
      </form>

      {message && <p className={message.includes("correcto") ? "success" : "error"}>{message}</p>}
    </div>
  );
};

export default Dashboard;
