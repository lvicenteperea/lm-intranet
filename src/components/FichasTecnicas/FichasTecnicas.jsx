import React, { useState } from 'react';
import { fetchFichasTecnicas, descargarFichasTecnicas } from '../../services/fichasTecnicasService';
import './FichasTecnicas.css';

const FichasTecnicas = () => {
  const [resultados, setResultados] = useState(["Pulsa una opción"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [descargando, setDescargando] = useState(false);



  // 📌 Llamar al servicio para generar las fichas técnicas
  const handleConsulta = async () => {
    setLoading(true);
    setError('');
    setResultados([]); // Limpia resultados previos

    const response = await fetchFichasTecnicas();
    setLoading(false);

    if (response.success) {
      setResultados(["Fichas generadas correctamente"]);//response.resultados);
    } else {
      setError("Se ha producico un error al generar la fichas"); // response.message);
    }
  };



// -----------------------------------------------------------------------------------
// 📌 Llamar al servicio para descargar todas las fichas técnicas
// -----------------------------------------------------------------------------------
const handleDescarga = async () => {
    setDescargando(true);

    const nombresArchivos = resultados.map(item => item.fichero); // Extraer nombres de archivos

    const response = await descargarFichasTecnicas(nombresArchivos);
    setDescargando(false);

    if (response.success) {
      setResultados(["Descarga generada correctamente"]);  // response.resultados);
    } else {
      setError(`Error al descargar archivos");   // : ${response.message}`);
    }
  };


// -----------------------------------------------------------------------------------
// 📌 Código HTML
// -----------------------------------------------------------------------------------
  return (
    <div className="fichas-container">
      <h2>Generar Fichas Técnicas</h2>

      {/* ✅ Botón SIEMPRE visible */}
      <div className="botones-container">
        <button onClick={handleConsulta} disabled={loading}>
          {loading ? "Generando..." : "Generar Fichas"}
        </button>

        <button 
          onClick={handleDescarga} 
          disabled={descargando} 
          className={resultados.length === 0 ? "disabled" : ""}
        >
          {descargando ? "Descargando..." : "Descargar todas"}
          
        </button>
      </div>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="resultados-list">
        {resultados}

        {resultados.length > 0 ? (
          <p>
            {resultados.map((item, index) => (
              item.ret_txt
            ))}
          </p>
        ) : (
          <p>Pulsa una opción</p>
        )}
      </div>
    </div>
  );
};

export default FichasTecnicas;
