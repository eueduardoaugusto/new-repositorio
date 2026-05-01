//aparece o n/ inventario e fornecedor
const id = 1; // só pra teste

fetch(`/api/inventario/${id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("numInventario").textContent = data.numero;
    document.getElementById("nomeFornecedor").textContent = data.fornecedor;
  })
  .catch(() => {
    document.getElementById("numInventario").textContent = "123";
    document.getElementById("nomeFornecedor").textContent = "Fornecedor Teste";
  });

//botão selecionados
function getSelecionados() {
  const checks = document.querySelectorAll(".check-produto:checked");

  return Array.from(checks).map((check) => {
    const linha = check.closest("tr");
    return {
      codigo: linha.children[1].textContent,
      produto: linha.children[2].textContent
    };
  });
}

// Exemplo uso:
document.querySelector(".salvar").addEventListener("click", () => {
  const selecionados = getSelecionados();
  console.log(selecionados);
});

// Função para abrir e fechar popup (mantidas)
function abrirPopupProduto() {
  document.getElementById("popupProduto").style.display = "flex";
}

function fecharPopupProduto() {
  document.getElementById("popupProduto").style.display = "none";
}

// Função para controlar a visibilidade das infos do topo
function atualizarVisibilidadeTopo() {
  const infos = document.querySelectorAll(".info");
  const algumSelecionado = document.querySelectorAll(".check-produto:checked").length > 0;

  infos.forEach(info => {
    if (algumSelecionado) {
      info.classList.add("mostrar");
      // Simula o carregamento dos dados apenas quando aparece
      document.getElementById("numInventario").textContent = "123";
      document.getElementById("nomeFornecedor").textContent = "Fornecedor Teste";
    } else {
      info.classList.remove("mostrar");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-novo-produto");
  const tabela = document.getElementById("tabela-body");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const barcode = document.getElementById('new-barcode').value;
    const nome = document.getElementById('new-nome').value;
    const tamanho = document.getElementById('new-tamanho').value;
    const estoque = parseInt(document.getElementById('new-estoque').value);
    const contada = parseInt(document.getElementById('new-contada').value);
    const divergencia = contada - estoque;

    const tr = document.createElement("tr");
    const cor = divergencia < 0 ? "red" : (divergencia > 0 ? "green" : "black");

    // Aqui inserimos o Checkbox circular que você já estilizou no CSS
    tr.innerHTML = `
      <td>
        <label class="check-container">
          <input type="checkbox" class="check-produto" onchange="atualizarVisibilidadeTopo()">
          <span class="checkmark"></span>
        </label>
      </td>
      <td>${barcode}</td>
      <td>${nome}</td>
      <td>${tamanho}</td>
      <td>${estoque}</td>
      <td>${contada}</td>
      <td style="color:${cor}; font-weight:bold;">
        ${divergencia > 0 ? '+' + divergencia : divergencia}
      </td>
    `;

    tabela.prepend(tr);
    fecharPopupProduto();
    this.reset();
  });
});