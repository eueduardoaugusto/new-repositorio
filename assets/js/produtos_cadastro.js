let setoresCache = [];
let gruposCache = [];

document.addEventListener("DOMContentLoaded", () => {
  const selectSetor = document.getElementById("setor");
  const selectGrupo = document.getElementById("grupo");
  const form = document.getElementById("cadastro-produto");

  if (selectSetor) selectSetor.addEventListener("change", carregarOpcoesGrupos);

  carregarOpcoes();

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const setorNome =
        selectSetor?.selectedOptions?.[0]?.textContent?.trim() || "";

      const grupoNome =
        selectGrupo?.selectedOptions?.[0]?.textContent?.trim() || "";

      const dados = {
        codigo: document.getElementById("codBarras").value,
        nome: document.getElementById("nomeProduto").value,
        tamanho: document.getElementById("tamanho").value,
        preco: document.getElementById("preco").value,
        setor: setorNome,
        grupo: grupoNome,
      };

      try {
        const response = await fetch("http://localhost:3000/api/produtos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(dados),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          alert(
            "Erro ao cadastrar: " + (result.message || "erro desconhecido")
          );
          return;
        }

        alert("Produto cadastrado com sucesso!");
        form.reset();

        if (selectGrupo) {
          selectGrupo.innerHTML =
            '<option value="" disabled selected>Selecione um grupo</option>';
        }
      } catch (err) {
        console.error("Erro ao conectar com a API:", err);
        alert("Erro ao conectar com a API.");
      }
    });
  }
});

async function carregarOpcoes() {
  try {
    const response = await fetch("http://localhost:3000/api/setor", {
      credentials: "include",
    });

    if (!response.ok) {
      console.warn("Usuário não autenticado ao carregar setores.");
      return;
    }

    const data = await response.json();
    const selectSetor = document.getElementById("setor");

    const setores = data.setores || data || [];
    setoresCache = Array.isArray(setores) ? setores : [];

    if (!selectSetor) return;

    selectSetor.innerHTML =
      '<option value="" disabled selected>Selecione um setor</option>';

    setoresCache.forEach((setor) => {
      const option = document.createElement("option");
      option.textContent = setor.nome;
      option.value = setor.nome ?? setor.id ?? "";
      if (setor.id != null) option.dataset.id = setor.id;

      selectSetor.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar setor:", err);
  }
}

async function carregarOpcoesGrupos() {
  try {
    const selectSetor = document.getElementById("setor");
    const selectGrupos = document.getElementById("grupo");

    if (!selectSetor || !selectGrupos) return;

    const setorSelecionado = selectSetor.value;

    if (!gruposCache.length) {
      const resp = await fetch("http://localhost:3000/api/grupos", {
        credentials: "include",
      });

      if (!resp.ok) {
        console.warn("Usuário não autenticado ao carregar grupos.");
        return;
      }

      const data = await resp.json();
      gruposCache = Array.isArray(data) ? data : data.grupos || [];
    }

    selectGrupos.innerHTML =
      '<option value="" disabled selected>Selecione um grupo</option>';

    if (!setorSelecionado) return;

    const setorObj = setoresCache.find(
      (s) => String(s.nome) === String(setorSelecionado)
    );

    const gruposFiltrados = gruposCache.filter((g) => {
      const gSetor = g.setor;

      if (String(gSetor) === String(setorSelecionado)) return true;
      if (setorObj && String(gSetor) === String(setorObj.id)) return true;

      if (g.setorId && String(g.setorId) === String(setorObj?.id)) return true;
      if (g.setor_id && String(g.setor_id) === String(setorObj?.id))
        return true;

      return false;
    });

    gruposFiltrados.forEach((g) => {
      const option = document.createElement("option");
      option.textContent = g.nome;
      option.value = g.nome ?? g.id ?? "";
      if (g.id != null) option.dataset.id = g.id;

      selectGrupos.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao carregar grupos:", err);
  }
}
