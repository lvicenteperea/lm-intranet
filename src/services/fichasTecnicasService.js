export const fetchFichasTecnicas = async () => {
    console.log(`📡 Enviando solicitud a la API para obtener fichas técnicas...`);
  
    const token = localStorage.getItem("token"); // Obtener el token
    if (!token) {
      console.error("❌ No estás autenticado. Inicia sesión primero.");
      return { success: false, message: "No estás autenticado. Inicia sesión primero." };
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/mallorquina/mll_fichas_tecnicas?id_App=1&user=usuario_dev&ret_code=0&ret_txt=OK&output_path=`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          "Authorization": `Bearer ${token}`
        }
      });
  
      console.log("📡 Respuesta recibida:", response);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Error en la obtención de fichas técnicas: HTTP ${response.status}`, errorText);
        return { success: false, message: `Error HTTP ${response.status}: ${errorText}` };
      }
  
      const data = await response.json();
      console.log("📡 Datos del servidor:", data);
  
      if (!Array.isArray(data.resultados)) {
        console.error("❌ Error: la API no devolvió una lista de textos válida", data);
        return { success: false, message: "Error: la API no devolvió una lista de textos válida" };
      }
  
      console.log("✅ Obtención de fichas técnicas exitosa. Resultados:", data.resultados);
  
      return {
        success: true,
        resultados: data.resultados
      };
    } catch (error) {
      console.error("🛑 Error de conexión o en la respuesta:", error.message);
      return { success: false, message: `No se pudo conectar con el servidor: ${error.message}` };
    }
  };
  