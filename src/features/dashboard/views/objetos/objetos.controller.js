import { renderObjetosView } from './objetos.view.js';
import { renderCreateObjetoModal, addModalEventListeners } from './create-objeto-modal.view.js';
import { saveObjeto } from '../../../../app/storage/objetos.storage.js';

/**
 * Inicializa a página de gerenciamento de Objetos.
 */
export function initObjetos() {
    // 1. Renderiza a visualização principal
    renderObjetosView();

    // 2. Adiciona o evento de clique ao botão de criar
    const createBtn = document.getElementById('create-objeto-btn');
    if (createBtn) {
        createBtn.addEventListener('click', showCreateObjetoModal);
    }
}

/**
 * Mostra o modal de criação de objeto.
 */
function showCreateObjetoModal() {
    // Renderiza o modal na tela
    renderCreateObjetoModal();

    // Adiciona os eventos de formulário (salvar, cancelar)
    addModalEventListeners(handleSaveObjeto);
}

/**
 * Manipula o salvamento do novo objeto, incluindo a conversão da foto.
 * @param {string} nomeObjeto - O nome do objeto a ser salvo.
 * @param {File|null} arquivoFoto - O arquivo de imagem do input.
 */
function handleSaveObjeto(nomeObjeto, arquivoFoto) {
    if (!nomeObjeto) return;

    // Se não houver foto, salva diretamente com null
    if (!arquivoFoto) {
        saveObjeto(nomeObjeto, null);
        initObjetos(); // Re-renderiza a página de objetos
        return;
    }

    // Se houver uma foto, converte para Base64 primeiro
    const reader = new FileReader();
    reader.onloadend = () => {
        // reader.result contém a string Base64 da imagem
        const fotoUrl = reader.result;
        saveObjeto(nomeObjeto, fotoUrl);
        initObjetos(); // Re-renderiza a página após o salvamento
    };
    reader.readAsDataURL(arquivoFoto);
}