function abrirPopupAcoes() {
    document.getElementById("popup-acoes").style.display = "flex";
}

window.onclick = function(e) {
    const popup = document.getElementById("popup-acoes");
    if (e.target === popup) {
        popup.style.display = "none";
    }
}

// Abrir Pop-up Transmitir
document.querySelector(".btn-transmitir").onclick = () => {
    fecharPopups();
    document.getElementById("popup-transmitir").style.display = "flex";
};

// Abrir Pop-up Monitorar
document.querySelector(".btn-monitorar").onclick = () => {
    fecharPopups();
    document.getElementById("popup-monitorar").style.display = "flex";
};

// Função para fechar qualquer popup aberto
function fecharPopups() {
    document.getElementById("popup-transmitir").style.display = "none";
    document.getElementById("popup-monitorar").style.display = "none";
    document.getElementById("popup-acoes").style.display = "none";
}

// Fechar ao clicar fora
window.addEventListener("click", function(e) {
    const popups = ["popup-transmitir", "popup-monitorar", "popup-acoes"];
    popups.forEach(id => {
        const el = document.getElementById(id);
        if (e.target === el) el.style.display = "none";
    });
});

