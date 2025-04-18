const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL

// -----------------------------------------------------------------------------------
// 📌 Llamar al servicio para CONVERTIR TARIFAS
// -----------------------------------------------------------------------------------
export const fetchCargaErp = async (file) => {
    console.log(`📡 Enviando solicitud a la API para carge fichero de productos...`);
  
    const token = localStorage.getItem("token"); // Obtener el token
    if (!token) {
      console.error("❌ No estás autenticado. Inicia sesión primero.");
      return { success: false, message: "No estás autenticado. Inicia sesión primero." };
    }
  
    try {
      const formData = new FormData();
      formData.append("id_App", 1);
      formData.append("user", "usuario_dev");
      formData.append("ret_code", 0);
      formData.append("ret_txt", "OK");
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/mll_carga_prod_erp`, { 
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
          "Authorization": `Bearer ${token}`
        },
        body: formData // Enviamos los datos como `multipart/form-data`
      });
  
      console.log("📡 Respuesta recibida:", response);
  
      if (!response.ok) {
        console.error(`❌ Error en la carga: ${response.ret_txt}`);
      }
  
      // const text = await response.text();
      // console.log("🧾 Respuesta cruda:", text);
      const data = await response.json();
      console.log("📡 Datos del servidor:", data);
  
      if (!Array.isArray(data.resultados)) {
        console.error("❌ Error: la API no devolvió una lista de textos válida", data);
        return { success: false, message: "Error: la API no devolvió una lista de textos válida" };
      }

      console.log("✅ Conversión exitosa. Resultados:", data.resultados);
  

  
      return {
        success: true,
        resultados: data.resultados
      };
    } catch (error) {
      console.error("❌ Error al subir el archivo:", error);
      return { success: false, message: "Error de red o al subir archivo" };
    }
  };
  