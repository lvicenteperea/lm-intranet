import React, { useState } from 'react';
import { fetchConsultas } from '../../services/api';
import './Consultas.css';

const colores = ["#f9f9f9", "#e3e3e3"]; // Alternancia de colores


const Consultas = () => {
  const [fecha, setFecha] = useState('');
  const [entidad, setEntidad] = useState("0"); // entidad por defecto: Todas
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  let lastID = null;
  let colorIndex = 0;
  const rowColors = new Map(); // Mapa para guardar el color asignado a cada ID_Apertura


  const handleConsulta = async () => {
    if (!fecha) {
      setError('Por favor, selecciona una fecha.');
      return;
    }

    setLoading(true);
    setError('');
    
    const response = await fetchConsultas(fecha, entidad);
    setLoading(false);

    if (response.success) {
      setResultados(response.resultados);
    } else {
      setError(response.message);
    }
  };

  // const mediosExcluidos = ["TICKET RESTAURANT", "RAPID EXPRESS", "CREDITO CLIENTE", "TRANSFERENCIA", "SMS", "STUART", "GLOVO"];
  const datosFiltrados = resultados
    // .filter(item => !(mediosExcluidos.includes(item.id_medios_pago) && parseFloat(item.total_ventas) === 0)) // ✅ Filtra solo si Medio_Cobro está en la lista y el total_ventas es 0
    // .sort((a, b) => {
    //   if (a.cierre_tpv_id !== b.cierre_tpv_id) {
    //     return a.cierre_tpv_id - b.cierre_tpv_id; // ✅ Ordena por cierre_tpv_id
    //   }
    //   if (a.Nombre_TPV !== b.Nombre_TPV) {
    //     return a.Nombre_TPV.localeCompare(b.Nombre_TPV); // ✅ Ordena por Nombre_TPV
    //   }
    //   return a.id_medios_pago.localeCompare(b.id_medios_pago); // ✅ Ordena por Medio_Cobro (alfabéticamente)
    // });


    return (
      <div className="consultas-container">
        <h2>Consultas</h2>
        <label>Selecciona una fecha:</label>
        <input 
          type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
        />
        <label>Selecciona una entidad:</label>
        <select value={entidad} onChange={(e) => setEntidad(e.target.value)}>
            <option value="6">Velázquez</option>
            <option value="9">SOL-Bombonería</option>
            <option value="10">MG Kiosko</option>
            <option value="13">MG Norte</option>
            {/* <option value="1">SOL Bombonería</option> 
                <option value="12">Quevedo</option> */}
        </select>
        <button onClick={handleConsulta}>Consultar</button>
        <p></p>

        {loading && <p>Cargando datos...</p>}
        {error && <p className="error">{error}</p>}

        <table className="consultas-table">
          <thead>
            <tr>
              <th className="align-left">TPV</th> {/* ✅ Alineación izquierda */}
              {/* <th>ID Apertura</th> */}
              <th>Cierre</th>
              <th>Fecha</th>
              <th>Medio Cobro</th>
              <th>Arqueo</th>
              <th>Importe</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, index) => {
              // Si el cierre_tpv_id cambia, alternamos color
              if (item.cierre_tpv_id !== lastID) {
                colorIndex = (colorIndex + 1) % colores.length;
                lastID = item.cierre_tpv_id;
              }
    
              // Guardamos el color en un mapa por ID_Apertura
              rowColors.set(item.ID_Apertura, colores[colorIndex]);
    
              return (
                <tr key={index} style={{ backgroundColor: rowColors.get(item.cierre_tpv_id) }}>
                  <td className="align-left">{item.Nombre_TPV} ({item.serie})</td> {/* ✅ Alineación izquierda */}

                  <td>{item.cierre_tpv_desc} ({item.cierre_tpv_id})</td>
                  <td>{new Date(item.fecha).toLocaleDateString('es-ES')}</td>
                  <td>{item.Nombre_MdP} ({item.id_medios_pago})</td>
                  <td>{parseFloat(item.total_arqueo_ciego).toFixed(2)} €</td>
                  <td>{parseFloat(item.total_ventas).toFixed(2)} €</td>
                  <td>{parseFloat(item.total_operaciones).toFixed(2)} €</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

};

export default Consultas;
