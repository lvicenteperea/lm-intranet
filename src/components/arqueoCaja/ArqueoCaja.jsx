import React, { useState } from 'react';
import { fetchArqueoCaja } from '../../services/api';
import './ArqueoCaja.css';

const ArqueoCaja = () => {
    const [dias, setDias] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState("");

    const handleArqueoCaja = async () => {
        if (!dias) {
          setError('Indica el número de dias a sincronizar');
          return;
        }

        setLoading(true);
        setError('');
        
        const response = await fetchArqueoCaja(dias);
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
        <label>Dias a realizar el arqueo:</label>
        <select value={dias} onChange={(e) => setDias(Number(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={handleArqueoCaja}>Arqueo Caja</button>
        <p></p>

        {loading && <p>Cargando datos...</p>}
        {error && <p className="error">{error}</p>}

        {message && <p>{message}</p>}
      </div>
    );
};

export default ArqueoCaja;
