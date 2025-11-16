// Carrega o header
fetch("/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    carregarCSS("/assets/css/header.css");
    atualizarData();
    configurarMenu();
    atualizarTituloDinamico(); // <-- CHAMADA DA FUNÇÃO
  });


// Carrega CSS dinamicamente
function carregarCSS(caminho) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = caminho;
  document.head.appendChild(link);
}


// Atualiza a data automaticamente
function atualizarData() {
  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();

  document.getElementById("dateDisplay").textContent = `📅 ${dia}/${mes}/${ano}`;
}


// Atualiza o título dinamicamente
function atualizarTituloDinamico() {
  const pageTypeElement = document.getElementById("pageType");
  if (!pageTypeElement) return;

  const tipo = pageTypeElement.getAttribute("data-type");
  const tituloEl = document.getElementById("pageTitle");

  const titulos = {
    vendas: "VENDAS",
    cliente: "CADASTRO DE CLIENTE",
    produto: "CADASTRO DE PRODUTO",
    inicio: "PÁGINA INICIAL"
  };

  tituloEl.textContent = titulos[tipo] || "SISTEMA CANTINHO DO PET";
}

// Menu lateral
function configurarMenu() {
  const btn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const backdrop = document.getElementById("menuBackdrop");

  btn.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
    backdrop.classList.toggle("show");
  });

  backdrop.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    backdrop.classList.remove("show");
  });

  document.getElementById("exitApp").addEventListener("click", () => {
    alert("Encerrando a aplicação...");
    window.close();
  });
}

