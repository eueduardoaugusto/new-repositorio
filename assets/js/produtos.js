
carregarOpcoes();

async function carregarOpcoes() {
  try {
    const response = await fetch("http://localhost:3000/api/setor", {
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
      option.value = setor.nome; 
      option.textContent = setor.nome;
      selectSetor.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar setor:", err);
  }
}

async function carregarOpcoesGrupos() {
  try {
    const selectSetor = document.getElementById("setor");
    const setorSelecionado = selectSetor.value;

    const response = await fetch("http://localhost:3000/api/grupos", {
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

    if (!setorSelecionado) return;


    const gruposFiltrados = grupos.filter((g) => g.setor == setorSelecionado);

    gruposFiltrados.forEach((g) => {
      const option = document.createElement("option");
      option.value = g.nome;
      option.textContent = g.nome;
      selectGrupos.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar grupos:", err);
  }
}

document
  .getElementById("setor")
  .addEventListener("change", carregarOpcoesGrupos);

document.addEventListener("DOMContentLoaded", async () => {
  const tabelaBody = document.querySelector("tbody");


  const modalExcluir = document.getElementById("modal-excluir");
  const cancelarModal = document.getElementById("cancelar-modal");
  const formExcluir = document.getElementById("form-excluir");
  const inputIdExcluir = document.getElementById("id-excluir");

  const modalEditar = document.getElementById("modal-editar");
  const cancelarEdicao = document.getElementById("cancelar-edicao");
  const formEditar = document.getElementById("form-editar");

  const editId = document.getElementById("edit-id");
  const editCodigo = document.getElementById("edit-codigo");
  const editNome = document.getElementById("edit-nome");
  const editTamanho = document.getElementById("edit-tamanho");
  const editSetor = document.getElementById("setor");
  const editGrupo = document.getElementById("grupo");
  const editPreco = document.getElementById("edit-preco");


  async function carregarProdutos() {
    try {
      const response = await fetch("http://localhost:3000/api/produtos", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao carregar produtos");

      const produtos = await response.json();
      tabelaBody.innerHTML = "";

      produtos.forEach((p) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${p.codigo}</td>
          <td>${p.nome}</td>
          <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
          <td>${p.tamanho}</td>
          <td>${p.setor || "-"}</td>
          <td>${p.grupo || "-"}</td>
          <td>
            <span class="btn-atualizar" data-id="${p.id}">Atualizar</span>
            <span class="btn-excluir" data-id="${p.id}">Excluir</span>
          </td>
        `;

        tabelaBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  await carregarProdutos();

  tabelaBody.addEventListener("click", async (e) => {
    const btn = e.target;

    
    if (btn.classList.contains("btn-atualizar")) {
      const id = btn.dataset.id;

      const resp = await fetch(`http://localhost:3000/api/produtos/${id}`, {
        credentials: "include",
      });

      const dados = await resp.json();

      editId.value = dados.id;
      editCodigo.value = dados.codigo;
      editNome.value = dados.nome;
      editTamanho.value = dados.tamanho;

      
      editSetor.value = dados.setor || "";
      await carregarOpcoesGrupos();
      editGrupo.value = dados.grupo || "";

      editPreco.value = dados.preco;

      modalEditar.style.display = "flex";
    }

    if (btn.classList.contains("btn-excluir")) {
      const id = btn.dataset.id;
      inputIdExcluir.value = id;
      modalExcluir.style.display = "flex";
    }
  });

  cancelarModal.onclick = () => (modalExcluir.style.display = "none");
  modalExcluir.addEventListener("click", (e) => {
    if (e.target === modalExcluir) modalExcluir.style.display = "none";
  });

  formExcluir.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = inputIdExcluir.value;

    const response = await fetch(`http://localhost:3000/api/produtos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      alert("Produto excluído com sucesso!");
      modalExcluir.style.display = "none";
      carregarProdutos();
    } else {
      alert("Erro ao excluir produto");
    }
  });

  cancelarEdicao.onclick = () => (modalEditar.style.display = "none");
  modalEditar.addEventListener("click", (e) => {
    if (e.target === modalEditar) modalEditar.style.display = "none";
  });

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = editId.value;

    const payload = {
      codigo: editCodigo.value,
      nome: editNome.value,
      tamanho: editTamanho.value,
      setor: editSetor.value, 
      grupo: editGrupo.value, 
      preco: editPreco.value,
    };

    const resp = await fetch(`http://localhost:3000/api/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (resp.ok) {
      alert("Produto atualizado com sucesso!");
      modalEditar.style.display = "none";
      carregarProdutos();
    } else {
      alert("Erro ao atualizar produto");
    }
  });
});
