/**
 * Opções de configuração para o modal.
 * @typedef {Object} ModalOptions
 * @property {string} title - O título do modal.
 * @property {string} content - O conteúdo HTML a ser inserido no corpo do modal.
 * @property {Array<Object>} actions - Uma lista de botões de ação.
 * @property {string} actions[].id - O ID para o botão.
 * @property {string} actions[].text - O texto do botão.
 * @property {string} actions[].type - O tipo de botão ('primary', 'secondary', 'danger').
 */

/**
 * Cria e exibe um modal genérico na tela.
 * @param {ModalOptions} options - As opções para configurar o modal.
 */
export function showModal({ title, content, actions = [] }) {
    // Remove qualquer modal existente para evitar duplicatas
    document.getElementById('reusable-modal')?.remove();

    const modalContainer = document.createElement('div');
    modalContainer.id = 'reusable-modal';
    modalContainer.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50';

    // Mapeia os botões de ação para HTML
    const actionsHtml = actions.map(action => {
        let buttonClass = 'w-full px-4 py-3 font-bold rounded-lg transition-colors sm:w-auto ';
        if (action.type === 'primary') {
            buttonClass += 'text-white bg-indigo-600 hover:bg-indigo-700';
        } else if (action.type === 'danger') {
            buttonClass += 'text-white bg-red-600 hover:bg-red-700';
        } else { // secondary
            buttonClass += 'text-gray-700 bg-gray-100 hover:bg-gray-200';
        }
        return `<button id="${action.id}" class="${buttonClass}">${action.text}</button>`;
    }).join('');

    modalContainer.innerHTML = `
    <div class="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-2xl bg-white transform transition-all scale-95 opacity-0">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900">${title}</h3>
      </div>
      <div class="mt-4 text-center">
        ${content}
      </div>
      <div class="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 mt-6">
        ${actionsHtml}
      </div>
    </div>
  `;

    document.body.appendChild(modalContainer);
    const modalContent = modalContainer.querySelector('div > div');

    // Animação de entrada
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);

    const closeModal = () => {
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => modalContainer?.remove(), 200);
    };

    // Adiciona eventos aos botões e ao fundo
    actions.forEach(action => {
        document.getElementById(action.id)?.addEventListener('click', () => {
            // A função onClick pode fechar o modal se retornar true ou não fizer nada
            if (action.onClick) {
                action.onClick();
            }
            // O botão 'cancel' ou 'secondary' sempre fecha o modal
            if (action.type === 'secondary') {
                closeModal();
            }
        });
    });

    modalContainer.addEventListener('click', (event) => {
        if (event.target.id === 'reusable-modal') closeModal();
    });

    return { closeModal };
}