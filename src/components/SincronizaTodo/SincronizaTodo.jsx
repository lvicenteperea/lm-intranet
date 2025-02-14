import React, { useState } from "react";
import './SincronizaTodo.css';
import { fetchSincroniza } from "../../services/syncService";

const SincronizaTodo = () => {
  const [tienda, setTienda] = useState("0"); // Tienda por defecto: Todas
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');
  const [expandedTables, setExpandedTables] = useState({});

  const handleSincronizar = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas ejecutar la sincronización?");
    
    if (!confirmacion) {
      return; // Si el usuario cancela, no hace nada
    }

    setLoading(true);
    setError("");
    
    const response = await fetchSincroniza(tienda);
    setLoading(false);

    console.log("📡 Respuesta recibida:", response);

    if (response.success) {
      setResultados(response.resultados);
    } else {
      setError(response.message);
    }
  };

  const toggleTable = (nombre_bbdd) => {
    setExpandedTables(prevState => ({
      ...prevState,
      [nombre_bbdd]: !prevState[nombre_bbdd]
    }));
  };

  return (
    <div className="SincronizaTodo-container">
      <h1>Sincronización de Datos</h1>

      <label>Selecciona una tienda:</label>
      <select value={tienda} onChange={(e) => setTienda(e.target.value)}>
        <option value="0">Todas</option>
        <option value="1">La Nube</option>
        <option value="2">Velázquez</option>
        <option value="3">MG Norte</option>
        <option value="4">Quevedo</option>
        <option value="5">SOL</option>
        <option value="6">MG</option>
        <option value="7">SOL-Bombonería</option>
        <option value="81">LOCAL LM</option>
        <option value="80">LOCAL LM</option>
      </select>
      <button onClick={handleSincronizar}>Consultar</button>
      <p></p>

      {loading ? "Sincronizando..." : ""}

      {error && (() => {
        let errorCode = "Error desconocido";
        let errorMessage = error;
      
        try {
          const match = error.match(/Error HTTP (\d+): (.*)/);
          if (match) {
            errorCode = `Error HTTP ${match[1]}`;
            const errorData = JSON.parse(match[2]);
            errorMessage = errorData.message || "Ocurrió un error inesperado";
          }
        } catch (err) {
          console.error("Error al analizar el mensaje de error:", err);
        }
      
        return (
          <div className="error-container">
            <span className="error-icon">⚠️</span>
            <p className="error-title">{errorCode}</p>
            <p className="error-message">{errorMessage}</p>
          </div>
        );
      })()}

      {resultados && resultados.length > 0 && (
        <div className="resultados-container">
          {Object.entries(resultados.reduce((acc, item) => {
            if (!acc[item.nombre_bbdd]) {
              acc[item.nombre_bbdd] = [];
            }
            acc[item.nombre_bbdd].push(item);
            return acc;
          }, {})).map(([nombre_bbdd, registros]) => (
            <div key={nombre_bbdd} className="tabla-container">
              <button onClick={() => toggleTable(nombre_bbdd)} className="toggle-btn">
                {expandedTables[nombre_bbdd] ? "▼ Ocultar" : "▶ Mostrar"} {nombre_bbdd}
              </button>
              {expandedTables[nombre_bbdd] && (
                <table>
                  <thead>
                    <tr>
                      <th>Entidad</th>
                      <th>Nombre Tabla Origen</th>
                      <th>Reg. Insertados</th>
                      <th>Reg. Actualizados</th>
                      <th>Valor Máximo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registros.map((item, index) => (
                      <tr key={index}>
                        <td>{item.entidad}</td>
                        <td>{item.tabla_origen}</td>
                        <td>{item.insertados || "-"}</td>
                        <td>{item.actualizados || "-"}</td>
                        <td>{item.valor_max || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SincronizaTodo;



































// import React, { useState } from "react";
// import './SincronizaTodo.css';
// import { fetchSincroniza } from "../../services/syncService";




// const SincronizaTodo = () => {
//   const [tienda, setTienda] = useState("0"); // Tienda por defecto: Todas
//   const [loading, setLoading] = useState(false);
//   const [resultados, setResultados] = useState([]);
//   const [error, setError] = useState('');

//   const handleSincronizar = async () => {
//     const confirmacion = window.confirm("¿Estás seguro de que deseas ejecutar la sincronización?");
    
//     if (!confirmacion) {
//       return; // Si el usuario cancela, no hace nada
//     }

//     setLoading(true);
//     setError("");

    
//     const response = await fetchSincroniza(tienda);
//     setLoading(false);

//     console.log("📡 Respuesta recibida:", response);

//     if (response.success) {
//       setResultados(response.resultados);
//     } else {
//       setError(response.message);
//     }

//     console.log("📡 Respuesta recibida2:", response);
//   };





//   return (
//     <div className="SincronizaTodo-container">
//       <h1>Sincronización de Datos</h1>

//       <label>Selecciona una tienda:</label>
//       <select value={tienda} onChange={(e) => setTienda(e.target.value)}>
//         <option value="0">Todas</option>
//         <option value="1">La Nube</option>
//         <option value="2">Velázquez</option>
//         <option value="3">MG Norte</option>
//         <option value="4">Quevedo</option>
//         <option value="5">SOL</option>
//         <option value="6">MG</option>
//         <option value="7">SOL-Bombonería</option>
//         <option value="81">LOCAL LM</option>
//         <option value="80">LOCAL LM</option>
//       </select>
//       <button onClick={handleSincronizar}>Consultar</button>
//       <p></p>

//       {loading ? "Sincronizando..." : ""}

//       {error && (() => {
//         let errorCode = "Error desconocido";
//         let errorMessage = error;
      
//         // Intentar extraer el código de error y el mensaje si está en formato JSON
//         try {
//           const match = error.match(/Error HTTP (\d+): (.*)/);
//           if (match) {
//             errorCode = `Error HTTP ${match[1]}`;
//             const errorData = JSON.parse(match[2]); // Intenta convertir la parte JSON
//             errorMessage = errorData.message || "Ocurrió un error inesperado";
//           }
//         } catch (err) {
//           console.error("Error al analizar el mensaje de error:", err);
//         }
      
//         return (
//           <div className="error-container">
//             <span className="error-icon">⚠️</span>
//             <p className="error-title">{errorCode}</p>
//             <p className="error-message">{errorMessage}</p>
//           </div>
//         );
//       })()}
  

//       {resultados && resultados.length > 0 && (
//         <div className="success-container">
//           <span className="success-icon">✅</span>
//           <p className="success-title">Operación exitosa</p>
//           <ul className="success-list">
//             {resultados.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//     </div>
//   );
// };

// export default SincronizaTodo;
