// src/services/syncService.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL

export const fetchSincroniza = async (tienda) => {
  console.log(`📡 Buscando Token...`);

  const token = localStorage.getItem("token"); // Obtener token JWT
  if (!token) {
      console.error("❌ No estás autenticado. Inicia sesión primero.");
      return { success: false, message: "No estás autenticado. Inicia sesión primero." };
  }

  try {
        console.log(`📡 Enviando solicitud para sincronización: ${tienda}...`);
        const response = await fetch(`${API_BASE_URL}/mll_sincroniza`, {
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
                // tiendas:`${tienda}`
                tiendas:[tienda]
            })
        });

      console.log("📡 Respuesta recibida:", response);

      if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Error en la consulta: HTTP ${response.status}`, errorText);
          return { success: false, message: `Error HTTP ${response.status}: ${errorText}` };
      }

      const data = await response.json();
      console.log("📡 Datos del servidor:", data);

      if (!data.resultados || !Array.isArray(data.resultados)) {
          console.error("❌ Error: la API no devolvió resultados válidos", data);
          return { success: false, message: "Error: la API no devolvió resultados válidos" };
      }

      console.log("✅ Consulta exitosa. Resultados:", data.resultados);

      return {
          success: true,
          resultados: data.resultados
      };

  } catch (error) {
      console.error("🛑 Error de conexión o en la respuesta:", error.message);
      return { success: false, message: `No se pudo conectar con el servidor: ${error.message}` };
  }
};



























// --------------------------------------------------------------------------
// MAQUETA PARA PRUEBAS desde SincronizaTodo2
// --------------------------------------------------------------------------

export const MaquetaSincronizaTodo = async (fileName, date) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const requestData = {
        id_app: 1,
        user: "admin",
        ret_cod: 0,
        ret_txt: "Ok",
        file_name: fileName,
        date: date
      };

      if (Math.random() > 0.2) {
        resolve({
          success: true,
          message: "Todo correcto",
          response: { ...requestData, ret_cod: 0, ret_txt: "Todo correcto" }
        });
      } else {
        resolve({
          success: false,
          message: "Todo INcorrecto",
          response: { ...requestData, ret_cod: -1, ret_txt: "Todo INcorrecto" }
        });
      }
    }, 2000);
  });
};
  