import React, { useState } from 'react';
import Barcode from 'react-barcode';

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
// const abrirNuevaPestana = (htmlContent) => {
//   const newWindow = window.open();
//   if (newWindow) {
//     newWindow.document.open();
//     newWindow.document.write(htmlContent);
//     newWindow.document.close();
//   } else {
//     alert("No se pudo abrir la nueva pestaña. Verifica los permisos del navegador.");
//   }
// };

// // const rutaOriginal = "D:/Nube/GitHub/Mallorquina_API/app/ficheros/imagen/alergenos/"; 
// const nuevaRuta = process.env.REACT_APP_ALERGENOS;



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
// 📌 Visualizamos ficha técnica
// -----------------------------------------------------------------------------------
const abrirFichaTecnica = async (id) => {
  // Cambia esto por tu API base real
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL;
  const token = localStorage.getItem("token");


  const response = await fetch(`${API_BASE_URL}/mll_recupera_ficha_tecnica`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      id_App: 1,
      user: "usuario_dev",
      ret_code: 0,
      ret_txt: "Ok",
      id_producto: id
    })
  });

  if (!response.ok) {
    alert("Error al obtener la ficha técnica");
    return;
  }

  const data = await response.json();
  const html = data.resultados[1]; // la 0 es el mensaje de OK/KO
  
  // Abrir el HTML en una nueva pestaña
  const newWindow = window.open();
  newWindow.document.open();
  newWindow.document.write(html);
  newWindow.document.close();
};

// -----------------------------------------------------------------------------------
// 📌 Visualizamos listado
// -----------------------------------------------------------------------------------
const ListadoProductos = ({ productos }) => {
  // Guarda el índice del producto cuyo código de barras se muestra
  // const [barcodeVisible, setBarcodeVisible] = useState(null);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Listado productos</h3>
      <div className="tabla-scroll">
        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código de Barras</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod, idx) => (
              <React.Fragment key={prod.ID}>
                <tr>
                  <td>
                    <button
                      style={{
                        color: '#007bff',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => abrirFichaTecnica(prod.ID)}
                    >
                      {prod.ID}
                    </button>
                  </td>
                  <td>{prod.nombre}</td>
                  <td>
                    {/* {prod.codigo_barras}  */}
                    <Barcode value={prod.codigo_barras} format="CODE128" width={2} height={70} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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

                {/* <button onClick={() => abrirNuevaPestana(resultados[1].replace(/D:\/Nube\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\/alergenos\//g, nuevaRuta))}>
                    Abrir en nueva pestaña
                </button> */}

                <div className="tabla-scroll">
                    {resultados && Array.isArray(resultados[1]) && resultados[1].length > 0 && (
                      <ListadoProductos productos={resultados[1]} />
                    )}
                </div>

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
