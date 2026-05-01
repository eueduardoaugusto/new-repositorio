// agendamentos.js

const optionButtons = document.querySelectorAll('.option-btn');

optionButtons.forEach(button => {

    button.addEventListener('click', () => {

        alert(`Você clicou em: ${button.innerText}`);

    });

});