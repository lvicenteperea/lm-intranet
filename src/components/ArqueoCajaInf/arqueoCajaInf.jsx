import React, { useState } from 'react';
import { fetchArqueoCajaInf } from '../../services/arqueoCajaInfService';
import './arqueoCajaInf.css';

const ArqueoCajaInf = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Fecha por defecto: Hoy
  const [tienda, setTienda] = useState("0"); // Tienda por defecto: Todas
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConsulta = async () => {
    if (!fecha) {
      setError('Por favor, selecciona una fecha.');
      return;
    }

    setLoading(true);
    setError('');

    const response = await fetchArqueoCajaInf(fecha, tienda);
    setLoading(false);

    if (response.success) {
      setResultados(response.resultados);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="arqueoCajaInf-container">
      <h2>Información del Arqueo de Caja</h2>
      <label>Selecciona una fecha:</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

      <label>Selecciona una tienda:</label>
      <select value={tienda} onChange={(e) => setTienda(e.target.value)}>
        <option value="0">Todas</option>
        <option value="1">La Nube</option>
        <option value="2">Velázquez</option>
        <option value="3">MG Norte</option>
        <option value="4">Quevedo</option>
        <option value="5">SOL</option>
        <option value="6">MG</option>
        <option value="7">SOL-Bombonería</option>
        <option value="81">LOCAL LM</option>
        <option value="80">LOCAL LM</option>
      </select>

      <button onClick={handleConsulta}>Consultar</button>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="resultados-list">
        {resultados.length > 0 ? (
          resultados.map((item, index) => (
            <p key={index}>{item}</p> // ✅ Mostramos cada resultado como texto
          ))
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ArqueoCajaInf;
