document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-setor");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // PEGANDO OS CAMPOS
    const dados = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,
      sigla: document.getElementById("sigla").value,
      status: document.getElementById("status").value,
    };

    try {
      const response = await fetch("http://localhost:3005/api/setor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Erro ao cadastrar: " + result.message);
        return;
      }

      alert("Setor cadastrado com sucesso!");
      form.reset(); // limpar os campos
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com a API.");
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const tabelaBody = document.querySelector("tbody");

  try {
    const response = await fetch("http://localhost:3005/api/setor", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar setor");
    }

    const setor = await response.json();

    tabelaBody.innerHTML = ""; // limpa a tabela inicial

    setor.forEach((p) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>${p.descricao}</td>
        <td>${p.sigla}</td>
        <td>${p.status || "-"}</td>
      `;

      tabelaBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao carregar setor:", error);
  }
});
