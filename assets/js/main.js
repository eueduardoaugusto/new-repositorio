const modal = document.getElementById("modalSetores");

function abrirModalSetores() {
  modal.style.display = "flex";
}

function fecharModalSetores() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    fecharModalSetores();
  }
};
