import React, { useState } from 'react';
import { fetchFichasTecnicas, descargarFichasTecnicas } from '../../services/fichasTecnicasService';
import './FichasTecnicas.css';

const FichasTecnicas = () => {
  const [resultados, setResultados] = useState(["Pulsa una opción"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [descargando, setDescargando] = useState(false);



// -----------------------------------------------------------------------------------
// 📌 Funciones y variables  auxiliares
// -----------------------------------------------------------------------------------
const abrirNuevaPestana = (htmlContent) => {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  } else {
    alert("No se pudo abrir la nueva pestaña. Verifica los permisos del navegador.");
  }
};

// const rutaOriginal = "D:/Nube/GitHub/Mallorquina_API/app/ficheros/imagen/alergenos/";
const nuevaRuta = REACT_APP_ALERGENOS


// -----------------------------------------------------------------------------------
// 📌 Llamar al servicio para generar las fichas técnicas
// -----------------------------------------------------------------------------------
const handleFichasTecnicas = async () => {
  setLoading(true);
  setError('');
  setResultados([]); // Limpia resultados previos

  const response = await fetchFichasTecnicas();
  setLoading(false);

  if (response.success) {
    setResultados(response.resultados);
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

      {/* ✅ Botón SIEMPRE visible para generar las fichas técnicas*/}
      <div className="botones-container">
        <button onClick={handleFichasTecnicas} disabled={loading}>
          {loading ? "Generando..." : "Generar Fichas"}
        </button>
      </div>



      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="resultados-list">
        {resultados.length > 0 ? (
          <div>
            <p>{resultados[0]}</p>

            {resultados.length > 1 ?(
              <div>
                <button onClick={handleDescarga} 
                        disabled={descargando} 
                        className={resultados.length === 0 ? "disabled" : ""}
                >
                {descargando ? "Descargando..." : "Descargar todas"}
                
                </button>

                <button onClick={() => abrirNuevaPestana(resultados[1].replace(/D:\/Nube\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\/alergenos\//g, nuevaRuta))}>
                    Abrir en nueva pestaña
                </button>
              </div>
            ) : ( <p></p>         
            )}
          </div>
        ) : (
          <p>Pulsa una opción</p>
        )}
      </div>
    </div>
  );
};

export default FichasTecnicas;
