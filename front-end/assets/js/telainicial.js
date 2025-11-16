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

    const allLinks = document.querySelectorAll('.sidebar-nav a');
    const hasSubmenuItems = document.querySelectorAll('.nav-item.has-submenu');

allLinks.forEach(link => {
    link.addEventListener('click', (e) => {

        const currentItem = link.closest('.nav-item') || link.closest('.submenu-item');

        if (link.closest('.submenu-item')) {
            e.stopPropagation();
            return;
        }

            if (currentItem.classList.contains('has-submenu')) {
                e.preventDefault();

                const wasOpen = currentItem.classList.contains('open');

                hasSubmenuItems.forEach(i => {
                    if (i !== currentItem && i.classList.contains('open')) {
                        i.classList.remove('open');
                        const icon = i.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        }
                    }
                });


                if (!wasOpen) {
                    currentItem.classList.add('open', 'active');
                    const icon = currentItem.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    currentItem.classList.remove('open');
                    const icon = currentItem.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }

                return;
            }

            if (currentItem.classList.contains('submenu-item')) {
                currentItem.classList.add('active');


                const parentSubmenu = currentItem.closest('.has-submenu');
                if (parentSubmenu) {
                    parentSubmenu.classList.add('active', 'open');

                    const icon = parentSubmenu.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                }

                return;
            }


            currentItem.classList.add('active');


            hasSubmenuItems.forEach(i => {
                i.classList.remove('open');
                const icon = i.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });

        });
    });


    document.querySelector('.nav-item:first-child').classList.add('active');


    const trainingCard = document.querySelector('.training-card');
    if (trainingCard) {
        trainingCard.addEventListener('click', () => {
            alert('Redirecionando para o conteúdo de treinamento no Youtube...');
        });
    }

    const supportCard = document.querySelector('.support-card');
    if (supportCard) {
        supportCard.addEventListener('click', () => {
            alert('Abrindo formulário de contato/chat de suporte...');
        });
    }
});
