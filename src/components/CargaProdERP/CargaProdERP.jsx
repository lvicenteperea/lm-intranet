import React, { useState } from 'react';
import { fetchCargaErp } from '../../services/api';
import './CargaProdERP.css';

const CargaProdERP = () => {
  const [origenPath, setOrigenPath] = useState(""); // Estado para el nombre del archivo
  const [file, setFile] = useState(null); // Estado para almacenar el archivo
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Validar que el nombre del archivo tenga entre 5 y 100 caracteres
    if (selectedFile.name.length < 5 || selectedFile.name.length > 100) {
      setMessage("❌ El nombre del archivo debe tener entre 5 y 100 caracteres.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setOrigenPath(selectedFile.name); // Asignamos el nombre del archivo
  };

  const handleCargaProdERP = async () => {
    if (!file) {
      setMessage("❌ Debes seleccionar un archivo antes de continuar.");
      return;
    }

    const confirmacion = window.confirm(`¿Estás seguro de que deseas cargar "${origenPath}" al servidor?`);
    if (!confirmacion) return;

    setLoading(true);
    setMessage("");

    const response = await fetchCargaErp(file);
    setLoading(false);

    // este IF es para asegurar que no falle.
    if (!response || typeof response !== 'object') {
      setMessage("❌ Error desconocido al conectar con el servidor.");
      return;
    }

    console.log("📡 esta es Respuesta recibida:", response);
    setMessage(response);

    if (response.success) {
      setMessage(response.resultados);
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="CargaProdERP-container">
      <h1>Carga de Productos desde ERP</h1>

      <label>Selecciona un archivo:</label>
      <input type="file" onChange={handleFileChange} disabled={loading} />

      <button onClick={handleCargaProdERP} disabled={loading || !file}>
        {loading ? "Cargando..." : "Subir Archivo y Ejecutar Carga"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CargaProdERP;
