import React, { useState } from 'react';
import { fetchConvierteTarifas } from '../../services/convierteTarifasService';
import './ConvierteTarifas.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL;

// -----------------------------------------------------------------------------------
// 📌  CONVERTIR TARIFAS
// -----------------------------------------------------------------------------------
const ConvierteTarifas = () => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [codigos, setCodigos] = useState('');
  const [codigosError, setCodigosError] = useState('');

  // -----------------------------------------------------------------------------------
  // ✅ CONVERTIR 
  // -----------------------------------------------------------------------------------
  const handleConversion = async () => {
    setLoading(true);
  setError('');
  setCodigosError('');

  // Valida la lista de códigos: solo números, separados por comas
  const codigosLimpios = codigos.split(',')
    .map(c => c.trim())
    .filter(Boolean);

  // Por ejemplo: solo números, sin letras, sin espacios extra
  if (codigosLimpios.length > 0) {
    const regex = /^\d+$/;
    if (!codigosLimpios.every(c => regex.test(c))) {
      setLoading(false);
      setCodigosError('Por favor, introduce una lista válida de códigos numéricos separados por comas.');
      return;
    }
  }

  // ... Aquí tu llamada al servicio, pasando codigosLimpios si lo necesitas
  const response = await fetchConvierteTarifas(codigosLimpios);
  setLoading(false);

  if (response.success) {
    setResultados(response.resultados);
  } else {
    setError(response.message);
  }
};

  // -----------------------------------------------------------------------------------
  // ✅ DESCARGAR
  // -----------------------------------------------------------------------------------
  const handleDownload = async (nombreArchivo) => {
    try {
      const token = localStorage.getItem("token"); // Obtiene el token

      const response = await fetch(`${API_BASE_URL}/mll_descarga`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          // 'Accept': 'application/octet-stream' // Indica que es un archivo
        },
        body: JSON.stringify({
          id_App: 1,
          user: "usuario_dev",
          ret_code: 0,
          ret_txt: "Ok",
          tipo: "TPV",
          nombres: [nombreArchivo] // 👈 Enviado como lista
        })
      });

      if (!response.ok) {
        throw new Error(`Error al descargar el archivo: ${response.statusText}-${nombreArchivo}`);
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

  // -----------------------------------------------------------------------------------
  // ✅ HTML
  // -----------------------------------------------------------------------------------
  return (
    <div className="convierte-container">

      <div className="input-codigos">
        <label>Introduce los códigos (separados por comas):</label>
        <input
          type="text"
          value={codigos}
          onChange={(e) => setCodigos(e.target.value)}
          placeholder="Ej: 12345,67890,54321"
          style={{ width: '100%' }}
        />
        {codigosError && <div className="error">{codigosError}</div>}
      </div>


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
