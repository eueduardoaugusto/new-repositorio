// Carregar setores ao abrir a página
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

    selectSetor.innerHTML = '<option value="">Selecione um setor</option>';

    setores.forEach((setor) => {
      const option = document.createElement("option");
      option.value = setor.id;
      option.textContent = setor.nome;
      selectSetor.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar setor:", err);
  }
}

// Carregar grupos filtrados
async function carregarOpcoesGrupos() {
  try {
    const selectSetor = document.getElementById("setor");
    const setorSelecionado = selectSetor.value;

    const response = await fetch("http://localhost:3005/api/grupos", {
      credentials: "include",
    });

    if (!response.ok) {
      console.warn("Usuário não autenticado.");
      return;
    }

    const data = await response.json();
    const grupos = data.grupos || data || [];

    const selectGrupos = document.getElementById("grupo");
    selectGrupos.innerHTML = '<option value="">Selecione um grupo</option>';

    // Se não escolheu setor, não mostra grupos
    if (!setorSelecionado) return;

    // FILTRA os grupos que têm o setor igual ao selecionado
    const gruposFiltrados = grupos.filter((g) => g.setor == setorSelecionado);

    gruposFiltrados.forEach((g) => {
      const option = document.createElement("option");
      option.value = g.id;
      option.textContent = g.nome;
      selectGrupos.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar grupos:", err);
  }
}

// QUANDO O SETOR MUDAR → atualizar grupos
document
  .getElementById("setor")
  .addEventListener("change", carregarOpcoesGrupos);

// Evento de submit do formulário
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-produto");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      codigo: document.getElementById("codBarras").value,
      nome: document.getElementById("nomeProduto").value,
      tamanho: document.getElementById("tamanho").value,
      preco: document.getElementById("preco").value,
      setor: document.getElementById("setor").value,
      grupo: document.getElementById("grupo").value,
    };

    try {
      const response = await fetch("http://localhost:3005/api/produtos", {
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

      alert("Produto cadastrado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com a API.");
    }
  });
});
