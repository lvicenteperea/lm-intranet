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

  // ✅ Función para descargar el archivo desde la API
  const handleDownload = async (nombreArchivo) => {
    try {
      const token = localStorage.getItem("token"); // Obtiene el token

      const response = await fetch(`http://localhost:8000/mallorquina/mll_descarga?id_App=1&user=usuario_dev&ret_code=0&ret_txt=Ok&tipo=TPV&nombre=${nombreArchivo}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
          // 'Accept': 'application/octet-stream' // Indica que es un archivo
        }
      });

      if (!response.ok) {
        throw new Error(`Error al descargar el archivo: ${response.statusText}`);
      }

      const blob = await response.blob(); // 📂 Convierte la respuesta en un archivo binario
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nombreArchivo; // 📂 Nombre del archivo
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error en la descarga:", error);
      setError("Error al descargar el archivo");
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
              <button onClick={() => handleDownload(item.fichero)}>📥 {item.texto}</button>
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
