const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL

export const fetchArqueoCajaInf = async (fecha, entidad) => {
    console.log(`📡 Enviando solicitud a la API para fecha: ${fecha} y tienda: ${entidad}...`);
  
    const token = localStorage.getItem("token"); // Obtener el token
    if (!token) {
      console.error("❌ No estás autenticado. Inicia sesión primero.");
      return { success: false, message: "No estás autenticado. Inicia sesión primero." };
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/mll_inf_arqueo_caja`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id_App: 1,
          user: "usuario_dev",
          ret_code: 0,
          ret_txt: "Ok",
          fecha: fecha,
          entidad: entidad
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
  