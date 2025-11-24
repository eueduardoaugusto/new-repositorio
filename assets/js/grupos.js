carregarOpcoes();

async function carregarOpcoes() {
  try {
    const response = await fetch("http://localhost:3005/api/setor", {
      credentials: "include",
    });

    if (!response.ok) {
      console.warn("Usuário não autenticado.");
      return;
    }

    const data = await response.json();
    const selectSetor = document.getElementById("setor");

    const setores = data.setores || data || [];

    selectSetor.innerHTML =
      '<option value="" disabled selected>Selecione um setor</option>';

    setores.forEach((setor) => {
      const option = document.createElement("option");

      option.value = setor.nome;
      option.textContent = setor.nome;

      selectSetor.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar setor:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-grupos");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,

      setor: document.getElementById("setor").value,

      status: document.getElementById("status").value,
    };

    try {
      const response = await fetch("http://localhost:3005/api/grupos", {
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

      alert("Grupo cadastrado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com a API.");
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const tabelaBody = document.querySelector("tbody");

  try {
    const response = await fetch("http://localhost:3005/api/grupos", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar grupos");
    }

    const grupos = await response.json();

    tabelaBody.innerHTML = "";

    grupos.forEach((p) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>${p.descricao}</td>
        <td>${p.setor}</td>
        <td>${p.status ? "Ativo" : "Inativo"}</td>
      `;

      tabelaBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao carregar grupos:", error);
  }
});
