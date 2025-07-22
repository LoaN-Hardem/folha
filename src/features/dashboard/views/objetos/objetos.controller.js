import { renderObjetosView } from '../objetos/objetos.view.js';
import { renderCreateObjetoModal, addModalEventListeners as addCreateModalListeners } from '../objetos/create-objeto-modal.view.js';
import { renderDeleteObjetoModal, addDeleteModalEventListeners } from '../objetos/delete-objeto-modal.view.js';
import { saveObjeto, getObjetos, deleteObjeto } from '../../../../app/storage/objetos.storage.js';

/**
 * Inicializa a página de gerenciamento de Objetos.
 */
export function initObjetos() {
    renderObjetosView();
    addObjectViewEventListeners();
}

/**
 * Adiciona os listeners de eventos para a view de objetos (botões de criar, gerenciar e excluir).
 */
function addObjectViewEventListeners() {
    // Botão principal para criar novo objeto
    const createBtn = document.getElementById('create-objeto-btn');
    createBtn?.addEventListener('click', showCreateObjetoModal);

    // Botões de cada card
    const objetos = getObjetos();
    objetos.forEach(objeto => {
        // Botão Gerenciar
        const manageBtn = document.querySelector(`#objeto-${objeto.id} .manage-btn`);
        manageBtn?.addEventListener('click', () => handleManageObjeto(objeto));

        // Botão Excluir
        const deleteBtn = document.querySelector(`#objeto-${objeto.id} .delete-btn`);
        deleteBtn?.addEventListener('click', () => showDeleteObjetoModal(objeto));
    });
}

/**
 * Mostra o modal de criação de objeto.
 */
function showCreateObjetoModal() {
    renderCreateObjetoModal();
    addCreateModalListeners(handleSaveObjeto);
}

/**
 * Mostra o modal de confirmação de exclusão para um objeto específico.
 * @param {Object} objeto - O objeto a ser excluído.
 */
function showDeleteObjetoModal(objeto) {
    renderDeleteObjetoModal(objeto);
    addDeleteModalEventListeners(() => {
        handleDeleteObjeto(objeto.id);
    });
}

/**
 * Lida com o clique no botão "Gerenciar".
 * Por enquanto, apenas exibe um log no console.
 * @param {Object} objeto
 */
function handleManageObjeto(objeto) {
    console.log(`Gerenciando o objeto: ${objeto.nome} (ID: ${objeto.id})`);
    // Futuramente, aqui será chamada a função para navegar para a tela de gerenciamento
    // Ex: location.hash = `#/dashboard/objetos/${objeto.id}`;
}

/**
 * Lida com a confirmação de exclusão de um objeto.
 * @param {string} objetoId
 */
function handleDeleteObjeto(objetoId) {
    deleteObjeto(objetoId);
    initObjetos(); // Re-renderiza a view para mostrar a lista atualizada
}

/**
 * Manipula o salvamento do novo objeto, incluindo a conversão da foto.
 * @param {string} nomeObjeto
 * @param {File|null} arquivoFoto
 */
function handleSaveObjeto(nomeObjeto, arquivoFoto) {
    if (!nomeObjeto) return;

    if (!arquivoFoto) {
        saveObjeto(nomeObjeto, null);
        initObjetos();
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        saveObjeto(nomeObjeto, reader.result);
        initObjetos();
    };
    reader.readAsDataURL(arquivoFoto);
}