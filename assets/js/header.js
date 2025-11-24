fetch("/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;

    carregarCSS("/assets/css/header.css");
    atualizarData();
    configurarMenu();
    carregarUsuario();
    atualizarTituloDinamico();
  });

function carregarCSS(caminho) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = caminho;
  document.head.appendChild(link);
}

function atualizarData() {
  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, "0");
  const mes = (hoje.getMonth() + 1).toString().padStart(2, "0");
  const ano = hoje.getFullYear();

  document.getElementById(
    "dateDisplay"
  ).textContent = `📅 ${dia}/${mes}/${ano}`;
}

async function carregarUsuario() {
  try {
    const response = await fetch("http://localhost:3005/api/auth/me", {
      credentials: "include",
    });

    if (!response.ok) {
      console.warn("Usuário não autenticado.");
      return;
    }

    const data = await response.json();

    const nomeUsuario = document.getElementById("usuarioNome");

    if (nomeUsuario) {
      const nome = data.user?.name;
      nomeUsuario.textContent = nome;
    }
  } catch (err) {
    console.error("Erro ao carregar usuário:", err);
  }
}

function atualizarTituloDinamico() {
  const pageTypeElement = document.getElementById("pageType");
  if (!pageTypeElement) return;

  const tipo = pageTypeElement.getAttribute("data-type");
  const tituloEl = document.getElementById("pageTitle");

  const titulos = {
    vendas: "VENDAS",
    cliente: "CADASTRO DE CLIENTE",
    produto: "CADASTRO DE PRODUTO",
    inicio: "PÁGINA INICIAL",
  };

  tituloEl.textContent = titulos[tipo] || "SISTEMA CANTINHO DO PET";
}

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
