const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_MLL


// -----------------------------------------------------------------------------------
// 📌 Servicio para GENERAR todas las FICHAS TECNICAS
// -----------------------------------------------------------------------------------
export const fetchFichasTecnicas = async () => {
  console.log("📡 Enviando solicitud para generar fichas técnicas...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("❌ No estás autenticado.");
    return { success: false, message: "No estás autenticado. Inicia sesión primero." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/mll_fichas_tecnicas`, {
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
        output_path: ""
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

    return { success: true, resultados: data.resultados };
  } catch (error) {
    return { success: false, message: `No se pudo conectar con el servidor: ${error.message}` };
  }
};

// -----------------------------------------------------------------------------------
// 📌 Servicio para DESCARGAR todas las FICHAS TECNICAS
// -----------------------------------------------------------------------------------
export const descargarFichasTecnicas = async (nombresArchivos) => {
  console.log("📡 Enviando solicitud de descarga de fichas...");

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("❌ No estás autenticado.");
    return { success: false, message: "No estás autenticado. Inicia sesión primero." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/mll_descarga`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        id_App: 1,
        user: "usuario_dev",
        ret_code: 0,
        ret_txt: "Ok",
        tipo: "Alérgenos",
        nombres: []
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: `Error HTTP ${response.status}: ${errorText}` };
    }

    // ✅ Procesar la respuesta como un Blob (archivo binario)
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // ✅ Determinar el nombre del archivo correctamente
    const fileName = `fichas_tecnicas.zip`;
    // nombresArchivos.length === 1 
    // ? nombresArchivos[0]  // Si hay un solo archivo, usar su nombre real
    // : `fichas_tecnicas_${new Date().toISOString().slice(0, 10)}.zip`; // Si son varios, usar un nombre genérico
    

    // ✅ Crear un enlace temporal para descargar el archivo
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;  // ⚡ Aquí se asigna el nombre correcto
    // a.download = nombresArchivos.length > 1 ? "fichas_tecnicas.zip" : nombresArchivos[0]; // Nombre de archivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return { success: true, message: "Descarga iniciada" };
  } catch (error) {
    return { success: false, message: `No se pudo conectar con el servidor: ${error.message}` };
  }
};

