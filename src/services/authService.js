// ---------------------------------------------------------------------
// js para llamar a la api REAL
// luis mi_contraseña_segura
// ---------------------------------------------------------------------

// Función para verificar si localStorage está disponible
const isStorageAvailable = (type) => {
  try {
    const storage = window[type];
    const testKey = "__test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};


export const login = async (username, password) => {
  try {
    console.log("📡 Enviando solicitud a la API...");

    const response = await fetch('http://localhost:8000/auth/login?id_App=1&user=usuario_dev&ret_code=0&ret_txt=Registro%20exitoso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("📡 Respuesta recibida:", response);

    // ✅ Verificar si la respuesta es válida
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error en la autenticación: HTTP ${response.status}`, errorText);
      return { success: false, message: `Error HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    console.log("📡 Datos del servidor:", data);

    // ✅ Asegurar que se recibe un `ret_code: 0` como éxito
    if (data.ret_code !== 0) {
      console.error("❌ Error en la API:", data.ret_txt);
      return { success: false, message: data.ret_txt };
    }

    // ✅ Verificar si el usuario viene correctamente
    if (!data.user) {
      console.error("❌ Error: la API no devolvió el usuario correctamente", data);
      return { success: false, message: "Error: la API no devolvió el usuario correctamente" };
    }

    console.log("✅ Autenticación exitosa. Usuario:", data.user);

    // ✅ Guardar el token en localStorage de forma segura
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("token", data.token);
      console.log("🔑 Token guardado en localStorage:", localStorage.getItem("token"));
    } else {
      console.warn("⚠️ localStorage no está disponible.");
    }

    console.log("✅ Autenticación exitosa. Usuario:", data.user);

    return {
      success: true,
      token: data.token || null, // ⚡ Guarda el token si lo devuelve
      user: {
        id: data.user.id,
        name: data.user.username,
        ret_code: data.ret_code,
        ret_txt: data.ret_txt,
        options: data.options
      }
    };
  } catch (error) {
    console.error("🛑 Error de conexión o en la respuesta:", error.message);
    return { success: false, message: `No se pudo conectar con el servidor: ${error.message}` };
  }
};