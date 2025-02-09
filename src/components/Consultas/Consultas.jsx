import React, { useState } from 'react';
import { fetchConsultas } from '../../services/api';
import './Consultas.css';

const colores = ["#f9f9f9", "#e3e3e3"]; // Alternancia de colores


const Consultas = () => {
  const [fecha, setFecha] = useState('');
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
    
    const response = await fetchConsultas(fecha);
    setLoading(false);

    if (response.success) {
      setResultados(response.resultados);
    } else {
      setError(response.message);
    }
  };

  const mediosExcluidos = ["TICKET RESTAURANT", "RAPID EXPRESS", "CREDITO CLIENTE", "TRANSFERENCIA", "SMS", "STUART", "GLOVO"];
  const datosFiltrados = resultados
    .filter(item => !(mediosExcluidos.includes(item.Medio_Cobro) && parseFloat(item.Importe) === 0)) // ✅ Filtra solo si Medio_Cobro está en la lista y el importe es 0
    .sort((a, b) => {
      if (a.ID_Apertura !== b.ID_Apertura) {
        return a.ID_Apertura - b.ID_Apertura; // ✅ Ordena por ID_Apertura
      }
      if (a.Puesto_Facturacion !== b.Puesto_Facturacion) {
        return a.Puesto_Facturacion.localeCompare(b.Puesto_Facturacion); // ✅ Ordena por Puesto_Facturacion
      }
      return a.Medio_Cobro.localeCompare(b.Medio_Cobro); // ✅ Ordena por Medio_Cobro (alfabéticamente)
    });


    return (
      <div className="consultas-container">
        <h2>Consultas</h2>
        <label>Selecciona una fecha:</label>
        <input 
          type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
        />
        <button onClick={handleConsulta}>Consultar</button>
        <p></p>

        {loading && <p>Cargando datos...</p>}
        {error && <p className="error">{error}</p>}

        <table className="consultas-table">
          <thead>
            <tr>
              <th className="align-left">Puesto Facturación</th> {/* ✅ Alineación izquierda */}
              {/* <th>ID Apertura</th> */}
              <th>Fecha</th>
              <th>Medio Cobro</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, index) => {
              // Si el ID_Apertura cambia, alternamos color
              if (item.ID_Apertura !== lastID) {
                colorIndex = (colorIndex + 1) % colores.length;
                lastID = item.ID_Apertura;
              }
    
              // Guardamos el color en un mapa por ID_Apertura
              rowColors.set(item.ID_Apertura, colores[colorIndex]);
    
              return (
                <tr key={index} style={{ backgroundColor: rowColors.get(item.ID_Apertura) }}>
                  <td className="align-left">{item.Puesto_Facturacion} ({item.ID_Apertura})</td> {/* ✅ Alineación izquierda */}
                  <td>{new Date(item.Fecha_Hora).toLocaleDateString('es-ES')}</td>
                  <td>{item.Medio_Cobro}</td>
                  <td>{parseFloat(item.Importe).toFixed(2)} €</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

};

export default Consultas;
