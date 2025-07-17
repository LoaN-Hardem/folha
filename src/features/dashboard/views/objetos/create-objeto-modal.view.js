/**
 * Renderiza o HTML do modal para criar um novo objeto.
 */
export function renderCreateObjetoModal() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'create-objeto-modal';
  modalContainer.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50';
  modalContainer.innerHTML = `
    <div class="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-2xl bg-white">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900">Criar Novo Objeto</h3>
        <p class="text-sm text-gray-500 mt-2">Dê um nome ao seu objeto (ex: Pessoal, Viagem, Empresa).</p>
        <div class="mt-6">
          <input type="text" id="objeto-name-input" class="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nome do Objeto"/>
        </div>
        <div class="items-center gap-4 mt-6">
          <button id="cancel-create-objeto" class="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors sm:mt-0 sm:w-auto">
            Cancelar
          </button>
          <button id="save-create-objeto" class="w-full px-4 py-3 mt-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors sm:w-auto">
            Salvar Objeto
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);
}

/**
 * Adiciona os ouvintes de eventos para o modal (salvar, cancelar, fechar).
 * @param {Function} onSave - A função a ser chamada quando o botão Salvar for clicado.
 */
export function addModalEventListeners(onSave) {
  const modal = document.getElementById('create-objeto-modal');
  const cancelBtn = document.getElementById('cancel-create-objeto');
  const saveBtn = document.getElementById('save-create-objeto');
  const nameInput = document.getElementById('objeto-name-input');

  const closeModal = () => {
    if (modal) {
      modal.remove();
    }
  };

  saveBtn.addEventListener('click', () => {
    const nome = nameInput.value.trim();
    if (nome) {
      onSave(nome);
      closeModal();
    } else {
      nameInput.focus();
      nameInput.classList.add('border-red-500');
    }
  });

  cancelBtn.addEventListener('click', closeModal);
  // Permite fechar clicando fora do modal
  modal.addEventListener('click', (event) => {
    if (event.target.id === 'create-objeto-modal') {
      closeModal();
    }
  });
}