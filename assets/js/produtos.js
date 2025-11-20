document.addEventListener("DOMContentLoaded", async () => {
  const tabelaBody = document.querySelector("tbody");

  // MODAL EXCLUSÃO
  const modalExcluir = document.getElementById("modal-excluir");
  const cancelarModal = document.getElementById("cancelar-modal");
  const formExcluir = document.getElementById("form-excluir");
  const inputIdExcluir = document.getElementById("id-excluir");

  // MODAL EDIÇÃO
  const modalEditar = document.getElementById("modal-editar");
  const cancelarEdicao = document.getElementById("cancelar-edicao");
  const formEditar = document.getElementById("form-editar");

  const editId = document.getElementById("edit-id");
  const editCodigo = document.getElementById("edit-codigo");
  const editNome = document.getElementById("edit-nome");
  const editTamanho = document.getElementById("edit-tamanho");
  const editSetor = document.getElementById("edit-setor");
  const editGrupo = document.getElementById("edit-grupo");
  const editPreco = document.getElementById("edit-preco");

  // ================================
  // 1. CARREGAR PRODUTOS
  // ================================
  async function carregarProdutos() {
    try {
      const response = await fetch("http://localhost:3005/api/produtos", {
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
          <td>${p.grupo || "-"}</td>
          <td>${p.setor || "-"}</td>
          <td>
              <span class="btn-atualizar" data-id="${p.id}">Atualizar</span>
              <span class="btn-excluir" data-id="${p.id}">Excluir</span>
          </td>
        `;

        tabelaBody.appendChild(tr);
      });

      ativarEventosAcoes();
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  await carregarProdutos();

  // ================================
  // 2. EVENTOS EDITAR / EXCLUIR
  // ================================
  function ativarEventosAcoes() {
    // BOTÃO EDITAR
    document.querySelectorAll(".btn-atualizar").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;

        const resp = await fetch(`http://localhost:3005/api/produtos/${id}`, {
          credentials: "include",
        });

        const dados = await resp.json();

        // Preencher modal
        editId.value = dados.id;
        editCodigo.value = dados.codigo;
        editNome.value = dados.nome;
        editTamanho.value = dados.tamanho;
        editSetor.value = dados.setor || "";
        editGrupo.value = dados.grupo || "";
        editPreco.value = dados.preco;

        modalEditar.style.display = "flex";
      });
    });

    // BOTÃO EXCLUIR
    document.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        inputIdExcluir.value = id;
        modalExcluir.style.display = "flex";
      });
    });
  }

  // ================================
  // 3. FECHAR MODAL EXCLUSÃO
  // ================================
  cancelarModal.onclick = () => {
    modalExcluir.style.display = "none";
  };

  modalExcluir.onclick = (e) => {
    if (e.target === modalExcluir) modalExcluir.style.display = "none";
  };

  // ================================
  // 4. CONFIRMAR EXCLUSÃO
  // ================================
  formExcluir.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = inputIdExcluir.value;

    const response = await fetch(`http://localhost:3005/api/produtos/${id}`, {
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

  // ================================
  // 5. FECHAR MODAL EDIÇÃO
  // ================================
  cancelarEdicao.onclick = () => {
    modalEditar.style.display = "none";
  };

  modalEditar.onclick = (e) => {
    if (e.target === modalEditar) modalEditar.style.display = "none";
  };

  // ================================
  // 6. SALVAR EDIÇÃO (PUT)
  // ================================
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

    const resp = await fetch(`http://localhost:3005/api/produtos/${id}`, {
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
