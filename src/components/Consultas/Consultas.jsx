import React, { useState } from 'react';
import { fetchConsultas } from '../../services/api';
import './Consultas.css';

// const colores = ["#f9f9f9", "#e3e3e3"]; // Alternancia de colores

const Consultas = () => {
  const [fecha, setFecha] = useState('');
  const [entidad, setEntidad] = useState(6); // entidad por defecto: Todas
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Ordenar los datos por Cierre, TPV y Medio de Cobro
  const datosOrdenados = [...resultados].sort((a, b) => {
    if (a.cierre_tpv_id !== b.cierre_tpv_id) return a.cierre_tpv_id - b.cierre_tpv_id;
    if (a.Nombre_TPV !== b.Nombre_TPV) return a.Nombre_TPV.localeCompare(b.Nombre_TPV);
    return a.Nombre_MdP.localeCompare(b.Nombre_MdP);
  });

  let totalArqueo = 0, totalVentas = 0, totalOperaciones = 0;
  let lastCierreTPV = null;
  const rowGroups = [];
  let subTotalArqueo = 0, subTotalVentas = 0, subTotalOperaciones = 0;

  datosOrdenados.forEach((item, index) => {
    if (lastCierreTPV !== `${item.cierre_tpv_id}-${item.Nombre_TPV}`) {
      if (lastCierreTPV !== null) {
        rowGroups.push({ subtotal: true, cierre_tpv_id: lastCierreTPV, totalArqueo: subTotalArqueo, totalVentas: subTotalVentas, totalOperaciones: subTotalOperaciones });
        subTotalArqueo = 0;
        subTotalVentas = 0;
        subTotalOperaciones = 0;
      }
      lastCierreTPV = `${item.cierre_tpv_id}-${item.Nombre_TPV}`;
    }

    rowGroups.push(item);
    subTotalArqueo += parseFloat(item.total_arqueo_ciego);
    subTotalVentas += parseFloat(item.total_ventas);
    subTotalOperaciones += parseFloat(item.total_operaciones);

    totalArqueo += parseFloat(item.total_arqueo_ciego);
    totalVentas += parseFloat(item.total_ventas);
    totalOperaciones += parseFloat(item.total_operaciones);
  });

  if (lastCierreTPV !== null) {
    rowGroups.push({ subtotal: true, cierre_tpv_id: lastCierreTPV, totalArqueo: subTotalArqueo, totalVentas: subTotalVentas, totalOperaciones: subTotalOperaciones });
  }

  return (
    <div className="consultas-container">
      <h2>Consultas</h2>
      <label>Selecciona una fecha:</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      <label>Selecciona una entidad:</label>
      <select value={entidad} onChange={(e) => setEntidad(e.target.value)}>
        <option value="6">Velázquez</option>
        <option value="9">SOL-Bombonería</option>
        <option value="10">MG Kiosko</option>
        <option value="13">MG Norte</option>
      </select>
      <button onClick={handleConsulta}>Consultar</button>
      <p></p>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <table className="consultas-table">
        <thead>
          <tr>
            <th className="align-left">TPV</th>
            <th>Cierre</th>
            {/* <th>Fecha</th> */}
            <th>Medio Cobro</th>
            <th>Arqueo</th>
            <th>Importe</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {rowGroups.map((item, index) => 
            item.subtotal ? (
              <tr key={`subtotal-${item.cierre_tpv_id}`} className="subtotal-row">
                <td colSpan={3}><strong>Subtotal</strong></td>
                <td><strong>{item.totalArqueo.toFixed(2)} €</strong></td>
                <td><strong>{item.totalVentas.toFixed(2)} €</strong></td>
                <td><strong>{item.totalOperaciones}</strong></td>
              </tr>
            ) : (
              <tr key={index}>
                <td className="align-left">{item.Nombre_TPV} ({item.serie})</td>
                <td>{item.cierre_tpv_desc}</td>
                {/* <td>{item.cierre_tpv_desc} ({item.cierre_tpv_id})</td>
                <td>{new Date(item.fecha).toLocaleDateString('es-ES')}</td>
                <td>{item.Nombre_MdP} ({item.id_medios_pago})</td> */}
                <td>{item.Nombre_MdP}</td>
                <td>{parseFloat(item.total_arqueo_ciego).toFixed(2)} €</td>
                <td>{parseFloat(item.total_ventas).toFixed(2)} €</td>
                <td>{parseFloat(item.total_operaciones)}</td>
              </tr>
            )
          )}
          <tr className="total-row">
            <td colSpan={3}><strong>Total General</strong></td>
            <td><strong>{totalArqueo.toFixed(2)} €</strong></td>
            <td><strong>{totalVentas.toFixed(2)} €</strong></td>
            <td><strong>{totalOperaciones}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Consultas;
