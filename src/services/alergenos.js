const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL


// -----------------------------------------------------------------------------------
// 📌 Servicio para GENERAR todas las FICHAS TECNICAS
// -----------------------------------------------------------------------------------
export const fetchAlergenos = async (punto_venta) => {
  console.log("📡 Enviando solicitud para listado de alergenos...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("❌ No estás autenticado.");
    return { success: false, message: "No estás autenticado. Inicia sesión primero." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/mll_alergenos`, {
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
        output_path: "",
        punto_venta: punto_venta
      })
    });

    console.log("📡 Respuesta recibida:", response);

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: `Error HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    if (!Array.isArray(data.resultados)) {
      return { success: false, message: "Error: la API no devolvió una lista válida" };
    }
    console.log("📡 -------------------->>>>>");
    console.log(data.resultados)
    console.log("📡 -------------------->>>>>");
    return { success: true, resultados: data.resultados };
  } catch (error) {
    return { success: false, message: `No se pudo conectar con el servidor: ${error.message}` };
  }
};

