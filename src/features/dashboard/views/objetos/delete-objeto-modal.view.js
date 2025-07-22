/**
 * Renderiza o modal de confirmação para excluir um objeto.
 * @param {Object} objeto - O objeto que está prestes a ser excluído.
 */
export function renderDeleteObjetoModal(objeto) {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'delete-objeto-modal';
  modalContainer.className = 'fixed inset-0 bg-gray-100 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50';

  modalContainer.innerHTML = `
    <div class="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-2xl bg-white transform transition-all scale-95 opacity-0">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900">Excluir Objeto</h3>
        <p class="text-gray-600 my-4">Você tem certeza que deseja excluir o objeto "<strong>${objeto.nome}</strong>"? Esta ação não pode ser desfeita.</p>
      </div>
      <div class="flex justify-center items-center gap-4 mt-6">
        <button id="cancel-delete-objeto" class="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors sm:w-auto">
          Cancelar
        </button>
        <button id="confirm-delete-objeto" class="w-full px-4 py-3 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors sm:w-auto">
          Sim, Excluir
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  // Animação de entrada do modal
  setTimeout(() => {
    const modalContent = modalContainer.querySelector('div > div');
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  }, 10);
}

/**
 * Adiciona os ouvintes de eventos para o modal de exclusão.
 * @param {Function} onConfirm - A função a ser chamada quando o botão de confirmar for clicado.
 */
export function addDeleteModalEventListeners(onConfirm) {
  const modal = document.getElementById('delete-objeto-modal');
  const cancelBtn = document.getElementById('cancel-delete-objeto');
  const confirmBtn = document.getElementById('confirm-delete-objeto');

  const closeModal = () => {
    const modalContent = modal.querySelector('div > div');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal?.remove(), 200); // Espera a animação de saída
  };

  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', () => {
    onConfirm();
    closeModal();
  });

  // Fecha ao clicar fora
  modal.addEventListener('click', (event) => {
    if (event.target.id === 'delete-objeto-modal') closeModal();
  });
}