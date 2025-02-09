import React from "react";
import "./MisDatos.css";

const MisDatos = ({ user }) => {
  return (
    <div className="mis-datos-container">
      <h2>Información del Usuario</h2>
      <p><strong>Nombre:</strong> {user?.name || "Desconocido"}</p>
      <p><strong>Email:</strong> {user?.email || "No disponible"}</p>
      <p><strong>Departamento:</strong> {user?.dpto || "No especificado"}</p>
    </div>
  );
};

export default MisDatos;
