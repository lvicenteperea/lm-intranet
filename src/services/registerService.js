const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_LOGIN;

export const registerUser = async (username, email, password) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: "No autenticado" };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/register?id_App=1&user=usuario_dev&ret_code=0&ret_txt=Ok`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: `Error ${response.status}: ${errorText}` };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: `Error al conectar: ${err.message}` };
  }
};
