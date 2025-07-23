import { getObjetos } from '../../../app/storage/objetos.storage.js';
import { renderAccountsView } from '../views/accounts/accounts.view.js';

/**
 * Inicializa a página de Contas.
 */
export function initAccounts() {
    // 1. Busca todos os objetos do localStorage
    const objetos = getObjetos();

    // 2. Renderiza a view, passando os objetos para ela
    renderAccountsView(objetos);

    // 3. Adiciona os event listeners da página
    addEventListeners();
}

function addEventListeners() {
    const addAccountBtn = document.getElementById('add-account-btn');
    addAccountBtn?.addEventListener('click', () => {
        // Futuramente, esta função chamará o modal de adicionar conta
        console.log('Botão "Adicionar Nova Conta" clicado. Próximo passo: abrir o modal.');
    });
}