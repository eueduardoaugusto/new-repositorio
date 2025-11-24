function atualizarDataHeader() {
  const dataElemento = document.getElementById("data-atual");

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();

  dataElemento.textContent = `${dia}/${mes}/${ano}`;
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarDataHeader();

  const allLinks = document.querySelectorAll(".sidebar-nav a");
  const hasSubmenuItems = document.querySelectorAll(".nav-item.has-submenu");

  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const currentItem =
        link.closest(".nav-item") || link.closest(".submenu-item");

      if (link.closest(".submenu-item")) {
        e.stopPropagation();
        return;
      }

      if (currentItem.classList.contains("has-submenu")) {
        e.preventDefault();

        const wasOpen = currentItem.classList.contains("open");

        hasSubmenuItems.forEach((i) => {
          if (i !== currentItem) {
            i.classList.remove("open", "active");

            const icon = i.querySelector("i");
            if (icon) {
              icon.classList.remove("fa-minus");
              icon.classList.add("fa-plus");
            }
          }
        });

        if (!wasOpen) {
          currentItem.classList.add("open", "active");

          const icon = currentItem.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
          }
        } else {
          currentItem.classList.remove("open", "active");

          const icon = currentItem.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
          }
        }

        return;
      }

      currentItem.classList.add("active");

      hasSubmenuItems.forEach((i) => {
        i.classList.remove("open", "active");

        const icon = i.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
        }
      });
    });
  });

  const trainingCard = document.querySelector(".training-card");
  if (trainingCard) {
    trainingCard.addEventListener("click", () => {
      alert("Redirecionando para o conteúdo de treinamento no Youtube...");
    });
  }

  const supportCard = document.querySelector(".support-card");
  if (supportCard) {
    supportCard.addEventListener("click", () => {
      alert("Abrindo formulário de contato/chat de suporte...");
    });
  }
});

carregarUsuario();

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

    const nomeUsuario = document.getElementById("info-user");

    if (nomeUsuario) {
      const nome = data.user?.name;
      nomeUsuario.textContent = nome;
    }
  } catch (err) {
    console.error("Erro ao carregar usuário:", err);
  }
}
