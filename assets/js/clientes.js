document.addEventListener("DOMContentLoaded", async () => {
  const tabelaBody = document.querySelector("tbody");

  try {
    const response = await fetch("http://localhost:8080/api/clientes", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar clientes");
    }

    const clientes = await response.json();

    tabelaBody.innerHTML = ""; // limpa a tabela inicial

    clientes.forEach((p) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.id_cliente}</td>
        <td>${p.nome}</td>
        <td>${p.telefone}</td>
        <td>${p.Pets ? p.Pets[0].pet_name : ""}</td>
        <td>${p.Pets ? p.Pets[0].pet_specie : ""}</td>
        <td>${p.Pets ? p.Pets[0].pet_race : ""}</td>
        <td>${p.Pets ? p.Pets[0].pet_age : ""}</td>
      `;

      tabelaBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
});
