import React, { useState } from "react";
import './SincronizaTodo.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL

const SincronizaTodo = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSincronizar = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas ejecutar la sincronización?");
    
    if (!confirmacion) {
      return; // Si el usuario cancela, no hace nada
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // Obtener token JWT
      if (!token) {
        setMessage("❌ No estás autenticado. Inicia sesión primero.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/mll_sincroniza?id_App=1&user=usuario_dev&ret_code=0&ret_txt=Ok`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("📡 Respuesta recibida:", response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("📡 Datos del servidor:", data);

      if (data.ret_code === 0) {
        setMessage(`✅ Sincronización exitosa: ${data.ret_txt} - ${data.resultados}`);
      } else {
        setMessage(`❌ Error en la sincronización: ${data.ret_txt}`);
      }

    } catch (error) {
      console.error("❌ Error al ejecutar la sincronización:", error);
      setMessage("❌ Error al conectar con el servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="SincronizaTodo-container">
      <h1>Sincronización de Datos</h1>
      <button onClick={handleSincronizar} disabled={loading}>
        {loading ? "Sincronizando..." : "Ejecutar Sincronización"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SincronizaTodo;
