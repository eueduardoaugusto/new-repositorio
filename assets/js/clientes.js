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
  const editNome = document.getElementById("edit-nome");
  const editTelefone = document.getElementById("edit-telefone");
  const editPetNome = document.getElementById("edit-pet-nome");
  const editPetEspecie = document.getElementById("edit-pet-especie");
  const editPetRaca = document.getElementById("edit-pet-raca");
  const editPetIdade = document.getElementById("edit-pet-idade");

  async function carregarClientes() {
    try {
      const response = await fetch("http://localhost:3005/api/clientes", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao carregar clientes");

      const clientes = await response.json();
      tabelaBody.innerHTML = "";

      clientes.forEach((c) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${c.id}</td>
          <td>${c.nome}</td>
          <td>${c.telefone}</td>
          <td>${c.pet_nome}</td>
          <td>${c.pet_especie}</td>
          <td>${c.pet_raca}</td>
          <td>${c.pet_idade}</td>
          <td>
            <span class="btn-atualizar" data-id="${c.id}">Atualizar</span>
            <span class="btn-excluir" data-id="${c.id}">Excluir</span>
          </td>
        `;

        tabelaBody.appendChild(tr);
      });
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  }

  await carregarClientes();

  tabelaBody.addEventListener("click", async (e) => {
    const btn = e.target;

    if (btn.classList.contains("btn-atualizar")) {
      const id = btn.dataset.id;
      if (!id) return console.error("ERRO: ID undefined");

      const resp = await fetch(`http://localhost:3005/api/clientes/${id}`, {
        credentials: "include",
      });

      const dados = await resp.json();

      editId.value = dados.id;
      editNome.value = dados.nome;
      editTelefone.value = dados.telefone;
      editPetNome.value = dados.pet_nome;
      editPetEspecie.value = dados.pet_especie;
      editPetRaca.value = dados.pet_raca;
      editPetIdade.value = dados.pet_idade;

      modalEditar.style.display = "flex";
    }

    if (btn.classList.contains("btn-excluir")) {
      const id = btn.dataset.id;
      inputIdExcluir.value = id;
      modalExcluir.style.display = "flex";
    }
  });

  cancelarModal.onclick = () => (modalExcluir.style.display = "none");
  modalExcluir.onclick = (e) => {
    if (e.target === modalExcluir) modalExcluir.style.display = "none";
  };

  formExcluir.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = inputIdExcluir.value;

    const resp = await fetch(`http://localhost:3005/api/clientes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (resp.ok) {
      alert("Cliente excluído com sucesso!");
      modalExcluir.style.display = "none";
      carregarClientes();
    } else {
      alert("Erro ao excluir cliente");
    }
  });

  cancelarEdicao.onclick = () => (modalEditar.style.display = "none");
  modalEditar.onclick = (e) => {
    if (e.target === modalEditar) modalEditar.style.display = "none";
  };

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = editId.value;

    const payload = {
      nome: editNome.value,
      telefone: editTelefone.value,
      pet_nome: editPetNome.value,
      pet_especie: editPetEspecie.value,
      pet_raca: editPetRaca.value,
      pet_idade: editPetIdade.value,
    };

    const resp = await fetch(`http://localhost:3005/api/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (resp.ok) {
      alert("Cliente atualizado!");
      modalEditar.style.display = "none";
      carregarClientes();
    } else {
      alert("Erro ao atualizar cliente");
    }
  });
});
