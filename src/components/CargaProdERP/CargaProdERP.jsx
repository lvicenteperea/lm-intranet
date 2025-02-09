import React, { useState } from 'react';
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

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ No estás autenticado. Inicia sesión primero.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("id_App", 63);
      formData.append("user", "usuario_dev");
      formData.append("ret_code", 0);
      formData.append("ret_txt", "OK");
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/mallorquina/mll_carga_prod_erp", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData // Enviamos los datos como `multipart/form-data`
      });

      console.log("📡 Respuesta recibida:", response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("📡 Datos del servidor:", data);

      if (data.ret_code === 0) {
        setMessage(`✅ Carga exitosa: ${data.ret_txt} - ${data.resultados}`);
      } else {
        setMessage(`❌ Error en la carga: ${data.ret_txt}`);
      }

    } catch (error) {
      console.error("❌ Error al subir el archivo:", error);
      setMessage("❌ Error al conectar con el servidor.");
    }

    setLoading(false);
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
