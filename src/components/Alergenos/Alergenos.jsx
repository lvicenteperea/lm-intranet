import React, { useState } from 'react';
import { fetchAlergenos } from '../../services/alergenos';
import './Alergenos.css';

const Alergenos = () => {
  const [punto_venta, setPunto_venta] = useState(2); // entidad Velazquez por defecto
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
  const nuevaRuta = "http://localhost:3000/img/";



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
      setHtml(response.resultados[1].replace(/D:\/Nube\/GitHub\/Mallorquina_API\/app\/ficheros\/imagen\//g, nuevaRuta))
      setResultados(response.resultados);
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
        <option value="2">Velázquez</option>
        <option value="3">MG Norte (Kiosko)</option>
        <option value="4">Quevedo</option>
        <option value="5">Sol - Tienda</option>
        <option value="6">MG Tienda</option>
        <option value="7">Sol - Bombonería</option>
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
