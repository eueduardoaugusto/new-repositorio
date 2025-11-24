const API_URL = "http://localhost:3005/api/auth/login";

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("usuario").value.trim();
  const password = document.getElementById("senha").value.trim();

  const body = { email, password };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    let data = {};

    if (response.status !== 204) {
      data = await response.json();
    }

    if (response.ok) {
      alert("Login realizado com sucesso!");

      window.location.href = "telainicial.html";
    } else {
      alert(data.errors?.[0] || "Email ou senha incorretos!");
    }
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    alert("Erro ao conectar com o servidor.");
  }
});
