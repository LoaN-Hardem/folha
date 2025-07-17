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
 * Manipula o salvamento do novo objeto.
 * @param {string} nomeObjeto - O nome do objeto a ser salvo.
 */
function handleSaveObjeto(nomeObjeto) {
    if (nomeObjeto) {
        saveObjeto(nomeObjeto);
        // Após salvar, renderiza a view principal novamente para mostrar a lista atualizada
        renderObjetosView();
        // Re-adiciona o evento ao botão (já que o innerHTML foi reescrito)
        document.getElementById('create-objeto-btn').addEventListener('click', showCreateObjetoModal);
    }
}