import React, { useState } from 'react';
import { fetchArqueoCajaInf } from '../../services/arqueoCajaInfService';
import './arqueoCajaInf.css';

const ArqueoCajaInf = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Fecha por defecto: Hoy
  const [entidad, setEntidad] = useState("0"); // entidad por defecto: Todas
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL;

  // -----------------------------------------------------------------------------------
  // ✅ CONSULTAR 
  // -----------------------------------------------------------------------------------
  const handleConsulta = async () => {
    if (!fecha) {
      setError('Por favor, selecciona una fecha.');
      return;
    }

    setLoading(true);
    setError('');

    const response = await fetchArqueoCajaInf(fecha, entidad);
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
          tipo: "Arqueo",
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
    <div className="arqueoCajaInf-container">
      <h2>Información del Arqueo de Caja</h2>
      <label>Selecciona una fecha:</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

      <label>Selecciona una entidad:</label>
      <select value={entidad} onChange={(e) => setEntidad(e.target.value)}>
        <option value="0">Todas</option>
        <option value="6">Velázquez</option>
        <option value="9">SOL-Bombonería</option>
        <option value="10">MG Kiosko</option>
        <option value="13">MG Norte</option>
        {/* <option value="1">SOL Bombonería</option> 
            <option value="12">Quevedo</option> */}
      </select>

      <button onClick={handleConsulta}>Consultar</button>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      {/* <div className="resultados-list">
        {resultados.length > 0 ? (
          resultados.map((item, index) => (
            <p key={index}>{item}</p> // ✅ Mostramos cada resultado como texto
          ))
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div> */}
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

export default ArqueoCajaInf;
