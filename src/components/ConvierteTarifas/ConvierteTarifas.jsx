import React, { useState } from 'react';
import { fetchConvierteTarifas } from '../../services/convierteTarifasService';
import './ConvierteTarifas.css';

const ConvierteTarifas = () => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConversion = async () => {
    setLoading(true);
    setError('');

    const response = await fetchConvierteTarifas();
    setLoading(false);

    if (response.success) {
      setResultados(response.resultados);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="convierte-container">
      <h2>Conversión de Tarifas</h2>
      <button onClick={handleConversion} disabled={loading}>
        {loading ? "Convirtiendo..." : "Convertir Tarifas"}
      </button>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="resultados-list">
        {resultados.length > 0 ? (
          resultados.map((item, index) => (
            <li key={index}> 
              <a href={item.link} target="_blank" rel="noopener noreferrer"> 🔗 </a>
              <span>{item.texto}</span> 
            </li>
          ))
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default ConvierteTarifas;
