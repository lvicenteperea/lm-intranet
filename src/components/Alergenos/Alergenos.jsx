import React, { useState } from 'react';
// import html2pdf from 'html2pdf.js';
import { fetchAlergenos } from '../../services/alergenos';
import './Alergenos.css';

const Alergenos = () => {
  const [punto_venta, setPunto_venta] = useState("0"); // valor por defecto "0"
  const [resultados, setResultados] = useState(["Pulsa una opción"]);
  const [texto, setTexto] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

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
  // const nuevaRuta = "http://localhost:3000/img/";
  // const nuevaRuta = "http://localhost:3000/img/";   // http://localhost:3000/img/alergenos/Cacahuetes.ico




// // -----------------------------------------------------------------------------------
// // 📌 Llamar al servicio para abrir en html en un PDF
// // -----------------------------------------------------------------------------------  
// const descargarPDF = () => {
//   // 1. Crear un elemento DOM temporal
//   const tempDiv = document.createElement('div');
//   tempDiv.innerHTML = html; // tu variable con el HTML
//   document.body.appendChild(tempDiv);

//   // 2. Llamar a html2pdf
//   html2pdf()
//     .set({
//       margin: 0.5,
//       filename: 'alergenos.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//     })
//     .from(tempDiv)
//     .save()
//     .then(() => {
//       // 3. Limpiar el elemento temporal
//       document.body.removeChild(tempDiv);
//     });
// };

  // -----------------------------------------------------------------------------------
  // 📌 Llamar al servicio para abrir en una nueva pestaña la lsita de alergenos
  // -----------------------------------------------------------------------------------
  const handleAlergenos = async () => {
    setLoading(true);
    setError('');
    setHtml(''); // Limpia resultados previos
    setTexto(''); // Limpia resultados previos

    const response = await fetchAlergenos(punto_venta);
    setLoading(false);

    if (response.success) {
      setTexto(response.resultados[0]);
      // setHtml(response.resultados[1].replace(/D:\/Nube\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\//g, nuevaRuta))
      // setHtml(response.resultados[1].replace(/C:\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\//g, nuevaRuta))
      setResultados(response.resultados);
      setHtml(response.resultados[1]);
    } else {
      setError("Se ha producico un error al generar el listado de alergenos"); // response.message);
    }
  };



  // -----------------------------------------------------------------------------------
  // 📌 Código HTML
  // -----------------------------------------------------------------------------------
  return (
    <div className="alergenos-container">
      <h2>Listado de Alergenos</h2>

      {/* ✅ Botón SIEMPRE visible para generar el listado de alergenos*/}
      <label>Selecciona una entidad:</label>
      <select value={punto_venta} onChange={(e) => setPunto_venta(e.target.value)}>
        <option value="0">Todos</option>
        <option value="4">Sol - Quevedo</option>
        <option value="1">Velázquez - MG</option>
        <option value="7">Salón SOL</option>

        {/* <option value="5">Sol - Tienda</option>
        <option value="6">MG Tienda</option>
        <option value="7">Sol - Bombonería</option> */}

        <option value="90">Catering</option>
        <option value="91">Web</option>
        <option value="92">Glovo</option>
      </select>
      <div className="botones-container">
        <button onClick={handleAlergenos} disabled={loading}>
          {loading ? "Generando..." : "Listado de Alergenos"}
        </button>
      </div>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="resultados-list">

        {resultados.length > 0 ? (
          <div>
            <p>{texto}</p>

            {resultados.length > 1 ?(
              <div>
                {/* <button onClick={() => abrirNuevaPestana(resultados[1].replace(/D:\/Nube\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\/alergenos\//g, nuevaRuta))}> */}
                {/* <button onClick={() => abrirNuevaPestana(resultados[1].replace(/D:\/Nube\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\//g, nuevaRuta))}> */}
                <button onClick={() => abrirNuevaPestana(html)}>
                    Abrir en nueva pestaña
                </button>
                {/* <button onClick={descargarPDF}>
                    Descargar como PDF
                </button> */}
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

export default Alergenos;
