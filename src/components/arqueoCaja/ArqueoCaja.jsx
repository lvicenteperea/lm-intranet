import React, { useState } from 'react';
import { fetchArqueoCaja } from '../../services/api';
import './ArqueoCaja.css';

const ArqueoCaja = () => {
    const [fecha, setFecha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState("");

    const handleArqueoCaja = async () => {
        if (!fecha) {
        setError('Por favor, selecciona una fecha.');
        return;
        }

        setLoading(true);
        setError('');
        
        const response = await fetchArqueoCaja(fecha);
        setLoading(false);

        if (response.success) {
          // setResultados(response.resultados);
          setMessage(`✅ Carga exitosa: ${response.resultados}`);
        } else {
          setError(response.message);
          setMessage(`❌ Error en la carga: ${response.ret_txt}`);
    }
    };

    return (
      <div className="arqueoCaja-container">
        <h2>Arqueo Caja</h2>
        <label>Selecciona una fecha:</label>
        <input 
          type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
        />
        <button onClick={handleArqueoCaja}>Arqueo Caja</button>
        <p></p>

        {loading && <p>Cargando datos...</p>}
        {error && <p className="error">{error}</p>}

        {message && <p>{message}</p>}
      </div>
    );
};

export default ArqueoCaja;
