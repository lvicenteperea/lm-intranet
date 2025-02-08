import React, { useState } from 'react';
import { fetchFichasTecnicas } from '../../services/fichasTecnicasService';
import './FichasTecnicas.css';

const FichasTecnicas = () => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConsulta = async () => {
    setLoading(true);
    setError('');

    const response = await fetchFichasTecnicas();
    setLoading(false);

    if (response.success) {
      setResultados(response.resultados);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="fichas-container">
      <h2>Generar Fichas Técnicas</h2>
      <button onClick={handleConsulta} disabled={loading}>
        {loading ? "Generando..." : "Generar Fichas"}
      </button>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="resultados-list">
        {resultados.length > 0 ? (
          resultados.map((item, index) => (
            <p key={index}>{item}</p> // ✅ Mostramos cada línea de respuesta
          ))
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default FichasTecnicas;
