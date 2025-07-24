import { renderGerenciarObjetoView } from '../views/objetos/gerenciar-objeto.view.js';
import { getObjetos } from '../../../app/storage/objetos.storage.js';
import { getBancos } from '../../../app/services/bank.service.js';
import { showAddAccountModal } from './accounts.controller.js';

/**
 * Inicializa a página de gerenciamento de um objeto específico.
 * @param {Object} params - Parâmetros da rota, injetados pelo roteador.
 */
export function initGerenciarObjeto(params) {
    const objetoId = params.id;
    const objetos = getObjetos();
    const objetoAtual = objetos.find(obj => obj.id === objetoId);

    // Se o objeto não existe, renderiza a view de erro (a própria view já faz isso)
    if (!objetoAtual) {
        renderGerenciarObjetoView(null, 0);
        return;
    }

    // --- SIMULAÇÃO DE DADOS ---
    // No futuro, estes dados virão do próprio objeto no localStorage.
    // Por agora, vamos adicionar dados de exemplo para visualização.
    if (!objetoAtual.contas || objetoAtual.contas.length === 0) {
        objetoAtual.contas = [
            { id: 'cta_1', nome: 'Conta Corrente', instituicao: 'Bradesco', saldo: 1580.75 },
            { id: 'cta_2', nome: 'Conta Poupança', instituicao: 'Inter', saldo: 8450.00 },
            { id: 'cta_3', nome: 'Cartão de Crédito', instituicao: 'Nubank', saldo: -750.40 }
        ];
    }
    // --- FIM DA SIMULAÇÃO ---

    // Calcula o saldo total somando o saldo de todas as contas
    const saldoTotal = objetoAtual.contas.reduce((acc, conta) => acc + conta.saldo, 0);

    // Renderiza a view, passando o objeto e o saldo total calculado
    renderGerenciarObjetoView(objetoAtual, saldoTotal);

    // Aqui adicionaremos a lógica dos botões "Adicionar Conta", "Receita", "Despesa"
    addEventListeners(objetoAtual.id);
}

function addEventListeners(objetoId) { // A função agora recebe o ID do objeto
    const addAccountBtn = document.querySelector('#contas-list + .bg-indigo-600, .lg\\:col-span-1 .bg-indigo-600'); // Seletor mais robusto
    addAccountBtn?.addEventListener('click', () => {
        showAddAccountModal(objetoId); // <-- PASSA O ID AQUI
    });
}