(async () => {
  const fetch = (await import("node-fetch")).default;

  const API_URL = "http://localhost:5001/api/users/login";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: "admin",    // Cambiá por tu usuario
        password: "admin123" // Cambiá por tu contraseña
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Error ${response.status}:`, data);
    } else {
      console.log("Login exitoso, token:", data.token);
    }
  } catch (err) {
    console.error("Error al conectar:", err);
  }
})();
