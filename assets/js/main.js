// Obtém a referência da janela modal
const modal = document.getElementById('modalSetores');

// Função para abrir a janela (chamada pelo onclick do lápis)
function abrirModalSetores() {
    // Muda o estilo de exibição para 'flex' para mostrar o modal
    modal.style.display = 'flex';
}

// Função para fechar a janela (chamada pelo botão CANCELAR)
function fecharModalSetores() {
    // Esconde o modal
    modal.style.display = 'none';
}

// Opcional: Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        fecharModalSetores();
    }
}