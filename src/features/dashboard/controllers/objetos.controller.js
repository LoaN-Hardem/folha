import { renderObjetosView } from '../views/objetos/objetos.view.js';
import { showModal } from '../../../components/modal/modal.js'; // Importa o novo modal
import { saveObjeto, getObjetos, deleteObjeto } from '../../../app/storage/objetos.storage.js';

/**
 * Inicializa a página de gerenciamento de Objetos.
 */
export function initObjetos() {
    renderObjetosView();
    addObjectViewEventListeners();
}

/**
 * Adiciona os listeners de eventos para a view de objetos.
 */
function addObjectViewEventListeners() {
    document.getElementById('create-objeto-btn')?.addEventListener('click', showCreateObjetoModal);

    getObjetos().forEach(objeto => {
        document.querySelector(`#objeto-${objeto.id} .manage-btn`)?.addEventListener('click', () => handleManageObjeto(objeto));
        document.querySelector(`#objeto-${objeto.id} .delete-btn`)?.addEventListener('click', () => showDeleteObjetoModal(objeto));
    });
}

/**
 * Mostra o modal de criação de objeto usando o componente reutilizável.
 */
function showCreateObjetoModal() {
    const contentHtml = `
        <p class="text-sm text-gray-500 mt-2 mb-6">Dê um nome e, opcionalmente, uma foto para o seu objeto.</p>
        <div class="space-y-4">
          <input type="text" id="objeto-name-input" class="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nome do Objeto" required/>
          <label for="objeto-photo-input" class="w-full flex items-center gap-4 px-4 py-3 text-gray-800 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span id="objeto-photo-label" class="truncate">Escolher foto</span>
            <img id="objeto-photo-preview" class="w-10 h-10 rounded-full object-cover hidden ml-auto" src="#" alt="Preview"/>
          </label>
          <input type="file" id="objeto-photo-input" class="hidden" accept="image/*"/>
        </div>
    `;

    const modal = showModal({
        title: 'Criar Novo Objeto',
        content: contentHtml,
        actions: [
            { id: 'cancel-create', text: 'Cancelar', type: 'secondary' },
            {
                id: 'save-create', text: 'Salvar Objeto', type: 'primary', onClick: () => {
                    const nomeInput = document.getElementById('objeto-name-input');
                    const photoInput = document.getElementById('objeto-photo-input');
                    const nome = nomeInput.value.trim();

                    if (nome) {
                        handleSaveObjeto(nome, photoInput.files[0]);
                        modal.closeModal(); // Fecha o modal após o sucesso
                    } else {
                        nomeInput.focus();
                        nomeInput.classList.add('border-red-500');
                    }
                }
            }
        ]
    });

    // Adiciona lógica de preview da imagem dentro do modal
    const photoInput = document.getElementById('objeto-photo-input');
    photoInput?.addEventListener('change', () => {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('objeto-photo-preview').src = e.target.result;
                document.getElementById('objeto-photo-preview').classList.remove('hidden');
                document.getElementById('objeto-photo-label').textContent = file.name;
            };
            reader.readAsDataURL(file);
        }
    });
}

/**
 * Mostra o modal de confirmação de exclusão.
 * @param {Object} objeto
 */
function showDeleteObjetoModal(objeto) {
    const modal = showModal({
        title: 'Excluir Objeto',
        content: `<p class="text-gray-600 my-4">Você tem certeza que deseja excluir o objeto "<strong>${objeto.nome}</strong>"? Esta ação não pode ser desfeita.</p>
                  <p class="text-gray-600 my-4">Todas os dados e informações relacionadas ao objeto serão excluídas permanentemente.</p>
        `,
        actions: [
            { id: 'cancel-delete', text: 'Cancelar', type: 'secondary' },
            {
                id: 'confirm-delete', text: 'Sim, Excluir', type: 'danger', onClick: () => {
                    handleDeleteObjeto(objeto.id);
                    modal.closeModal();
                }
            }
        ]
    });
}

function handleManageObjeto(objeto) {
    location.hash = `#/dashboard/objetos/${objeto.id}`;
}

function handleDeleteObjeto(objetoId) {
    deleteObjeto(objetoId);
    initObjetos();
}

/**
 * Manipula o salvamento do novo objeto, incluindo a conversão e compressão da foto.
 * @param {string} nomeObjeto
 * @param {File|null} arquivoFoto
 */
async function handleSaveObjeto(nomeObjeto, arquivoFoto) {
    if (!arquivoFoto) {
        saveObjeto(nomeObjeto, null);
        initObjetos();
        return;
    }

    try {
        // Chama a nova função para comprimir a imagem
        const fotoComprimidaUrl = await compressImage(arquivoFoto);
        saveObjeto(nomeObjeto, fotoComprimidaUrl);
        initObjetos();
    } catch (error) {
        console.error("Erro ao comprimir a imagem:", error);
        // Opcional: Mostrar um modal de erro para o usuário
    }
}

/**
 * Redimensiona e comprime uma imagem no lado do cliente.
 * @param {File} file - O arquivo de imagem a ser comprimido.
 * @returns {Promise<string>} Uma Promise que resolve com a URL da imagem comprimida em Base64.
 */
function compressImage(file) {
    return new Promise((resolve, reject) => {
        const MAX_WIDTH = 800; // Largura máxima da imagem
        const MAX_HEIGHT = 800; // Altura máxima da imagem

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converte o canvas para uma imagem JPG com 70% de qualidade
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(dataUrl);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}