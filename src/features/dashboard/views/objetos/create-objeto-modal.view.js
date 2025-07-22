/**
 * Renderiza o HTML do modal para criar um novo objeto.
 */
export function renderCreateObjetoModal() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'create-objeto-modal';
  modalContainer.className = 'fixed inset-0 bg-gray-100 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50';

  modalContainer.innerHTML = `
    <div class="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-2xl bg-white">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900">Criar Novo Objeto</h3>
        <p class="text-sm text-gray-500 mt-2">Dê um nome e, opcionalmente, uma foto para o seu objeto.</p>
        
        <div class="mt-6 space-y-4">
          <input type="text" id="objeto-name-input" class="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nome do Objeto" required/>
          
          <label for="objeto-photo-input" class="w-full flex items-center gap-4 px-4 py-3 text-gray-800 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span id="objeto-photo-label">Escolher uma foto (opcional)</span>
            <img id="objeto-photo-preview" class="w-10 h-10 rounded-full object-cover hidden ml-auto" src="#" alt="Preview"/>
          </label>
          <input type="file" id="objeto-photo-input" class="hidden" accept="image/*"/>
        </div>

        <div class="items-center gap-4 mt-6">
          <button id="cancel-create-objeto" class="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors sm:mt-0 sm:w-auto">Cancelar</button>
          <button id="save-create-objeto" class="w-full px-4 py-3 mt-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors sm:w-auto">Salvar Objeto</button>
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
  const photoInput = document.getElementById('objeto-photo-input');
  const photoLabel = document.getElementById('objeto-photo-label');
  const photoPreview = document.getElementById('objeto-photo-preview');

  // MELHORIA: Evento para mostrar a pré-visualização da imagem
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.src = e.target.result;
        photoPreview.classList.remove('hidden');
        photoLabel.textContent = file.name; // Mostra o nome do arquivo
      };
      reader.readAsDataURL(file);
    }
  });

  const closeModal = () => modal?.remove();

  saveBtn.addEventListener('click', () => {
    const nome = nameInput.value.trim();
    const file = photoInput.files[0];

    if (nome) {
      onSave(nome, file); // Agora passa o nome e o arquivo
      closeModal();
    } else {
      nameInput.focus();
      nameInput.classList.add('border-red-500');
    }
  });

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target.id === 'create-objeto-modal') closeModal();
  });
}