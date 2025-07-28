// Em: src/features/dashboard/controllers/gerenciar-conta.controller.js

import { GerenciarContaView } from "../views/accounts/gerenciar-conta.view.js";
import { getObjetos, updateObject } from "../../../app/storage/objetos.storage.js";
import { formatCurrency } from "../../../utils/format-currency.js";
import { toCapitalize } from "../../../utils/to-capitalize.js";
import { showToast } from "../../../components/toast/toast.js";
import { showModal } from "../../../components/modal/modal.js"; // Importa nosso componente padrão de modal
import { v4 as uuidv4 } from "uuid";

// Variáveis de estado
let currentObject;
let currentAccount;
let allObjects;

// Função de inicialização da página
export const initGerenciarConta = (params) => {
    const { id: accountId } = params;
    const dashboardContent = document.getElementById("dashboard-content");
    if (!dashboardContent) return;

    allObjects = getObjetos();
    for (const obj of allObjects) {
        const foundAccount = obj.contas.find(c => c.id === accountId);
        if (foundAccount) {
            currentObject = obj;
            currentAccount = foundAccount;
            break;
        }
    }

    if (!currentAccount) {
        dashboardContent.innerHTML = `<div class="p-8 text-center"><h1 class="text-2xl text-red-500">Conta não encontrada!</h1></div>`;
        return;
    }

    dashboardContent.innerHTML = GerenciarContaView(currentAccount, currentObject);
    attachEventListeners();
};

// Adiciona os listeners aos botões da página
function attachEventListeners() {
    document.getElementById("btn-edit-account")?.addEventListener("click", showEditAccountModal);
    document.getElementById("btn-open-receita-modal")?.addEventListener("click", () => showAddTransactionModal('receita'));
    document.getElementById("btn-open-despesa-modal")?.addEventListener("click", () => showAddTransactionModal('despesa'));
    document.getElementById("btn-open-transfer-modal")?.addEventListener("click", showTransferModal);
    document.getElementById("btn-delete-account")?.addEventListener("click", showDeleteConfirmModal);

    document.querySelectorAll('[data-transaction-id]').forEach(button => {
        button.addEventListener('click', handleDeleteTransaction);
    });
}

// --- FUNÇÕES PARA EXIBIR MODAIS PADRONIZADOS ---

function showEditAccountModal() {
    const contentHtml = `
        <div class="space-y-4 text-left">
            <div>
                <label for="editAccountName" class="block text-sm font-medium text-gray-700 mb-1">Nome da Conta</label>
                <input type="text" id="editAccountName" class="w-full px-4 py-3 border border-gray-300 rounded-lg" value="${currentAccount.nome}" required>
            </div>
            <div>
                <label for="editAccountBank" class="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                <input type="text" id="editAccountBank" class="w-full px-4 py-3 border border-gray-300 rounded-lg" value="${currentAccount.instituicao}" required>
            </div>
        </div>`;

    const modal = showModal({
        title: 'Editar Conta',
        content: contentHtml,
        actions: [
            { id: 'cancel-edit', text: 'Cancelar', type: 'secondary' },
            {
                id: 'save-edit', text: 'Salvar Alterações', type: 'primary',
                onClick: () => {
                    const newName = document.getElementById("editAccountName").value;
                    const newBank = document.getElementById("editAccountBank").value;
                    handleEditAccount(newName, newBank);
                    modal.closeModal();
                }
            }
        ]
    });
}

function showAddTransactionModal(tipo) {
    const isReceita = tipo === 'receita';
    const title = isReceita ? 'Adicionar Receita' : 'Adicionar Despesa';

    const contentHtml = `
        <div class="space-y-4 text-left">
            <div>
                <label for="transDescricao" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input type="text" id="transDescricao" class="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
            </div>
            <div>
                <label for="transValor" class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                <input type="number" step="0.01" min="0.01" id="transValor" class="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
            </div>
            <div>
                <label for="transData" class="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input type="date" id="transData" class="w-full px-4 py-3 border border-gray-300 rounded-lg" value="${new Date().toISOString().substring(0, 10)}" required>
            </div>
        </div>`;

    const modal = showModal({
        title,
        content: contentHtml,
        actions: [
            { id: 'cancel-trans', text: 'Cancelar', type: 'secondary' },
            {
                id: 'save-trans', text: 'Adicionar', type: isReceita ? 'primary' : 'danger',
                onClick: () => {
                    const descricao = document.getElementById('transDescricao').value;
                    const valor = parseFloat(document.getElementById('transValor').value);
                    const data = document.getElementById('transData').value;

                    if (!descricao || !valor || !data) {
                        showToast("Preencha todos os campos!", "error");
                        return;
                    }

                    handleAddTransaction({ descricao, valor, data, tipo });
                    modal.closeModal();
                }
            }
        ]
    });
}

function showTransferModal() {
    const contentHtml = `
        <div class="space-y-4 text-left">
            <div>
                <label for="transferValue" class="block text-sm font-medium text-gray-700 mb-1">Valor a Transferir (R$)</label>
                <input type="number" step="0.01" min="0.01" id="transferValue" class="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
            </div>
            <div>
                <label for="destinationObject" class="block text-sm font-medium text-gray-700 mb-1">Objeto de Destino</label>
                <select id="destinationObject" class="w-full px-4 py-3 border border-gray-300 rounded-lg" required></select>
            </div>
            <div>
                <label for="destinationAccount" class="block text-sm font-medium text-gray-700 mb-1">Conta de Destino</label>
                <select id="destinationAccount" class="w-full px-4 py-3 border border-gray-300 rounded-lg" required></select>
            </div>
        </div>`;

    const modal = showModal({
        title: 'Transferência Entre Contas',
        content: contentHtml,
        actions: [
            { id: 'cancel-transfer', text: 'Cancelar', type: 'secondary' },
            {
                id: 'confirm-transfer', text: 'Confirmar', type: 'primary',
                onClick: () => {
                    const valor = parseFloat(document.getElementById('transferValue').value);
                    const destinationAccountId = document.getElementById('destinationAccount').value;
                    if (!valor || !destinationAccountId) {
                        showToast("Preencha todos os campos!", "error");
                        return;
                    }
                    handleTransfer(valor, destinationAccountId);
                    modal.closeModal();
                }
            }
        ]
    });

    populateTransferModal(); // Popula os selects após o modal ser renderizado
}

function showDeleteConfirmModal() {
    const modal = showModal({
        title: 'Excluir Conta',
        content: `<p class="text-gray-600 my-4">Você tem certeza que deseja excluir a conta "<strong>${currentAccount.nome}</strong>"? Todas as suas transações serão perdidas. Esta ação não pode ser desfeita.</p>`,
        actions: [
            { id: 'cancel-delete', text: 'Cancelar', type: 'secondary' },
            {
                id: 'confirm-delete', text: 'Sim, Excluir', type: 'danger',
                onClick: () => {
                    handleDeleteAccount();
                    modal.closeModal();
                }
            }
        ]
    });
}

// --- LÓGICA DAS AÇÕES (Handlers) ---

function handleEditAccount(newName, newBank) {
    currentAccount.nome = newName;
    currentAccount.instituicao = newBank;
    updateObject(currentObject.id, currentObject);

    document.querySelector('h1.text-3xl').textContent = toCapitalize(newName);
    document.querySelector('p.text-md:last-of-type').textContent = `Instituição: ${newBank}`;
    showToast("Conta atualizada com sucesso!");
}

function handleAddTransaction(transacaoData) {
    if (!currentAccount.transacoes) currentAccount.transacoes = [];

    const novaTransacao = { id: uuidv4(), ...transacaoData };
    currentAccount.transacoes.push(novaTransacao);

    if (novaTransacao.tipo === 'receita') currentAccount.saldo += novaTransacao.valor;
    else currentAccount.saldo -= novaTransacao.valor;

    updateObject(currentObject.id, currentObject);

    document.getElementById('account-balance').textContent = formatCurrency(currentAccount.saldo);
    const tableBody = document.getElementById('statement-table-body');
    const newRow = renderTransactionRow(novaTransacao);

    const emptyRow = tableBody.querySelector('td[colspan="5"]');
    if (emptyRow) emptyRow.parentElement.remove();

    tableBody.prepend(newRow);
    showToast(`${toCapitalize(novaTransacao.tipo)} adicionada!`);
}

function handleDeleteTransaction(e) {
    const transactionId = e.target.dataset.transactionId;

    const modal = showModal({
        title: "Excluir Transação",
        content: "<p>Tem certeza que deseja excluir esta transação?</p>",
        actions: [
            { id: 'cancel-delete-trans', text: 'Cancelar', type: 'secondary' },
            {
                id: 'confirm-delete-trans', text: 'Sim, Excluir', type: 'danger',
                onClick: () => {
                    const transacao = currentAccount.transacoes.find(t => t.id === transactionId);
                    if (transacao.tipo === 'receita') currentAccount.saldo -= transacao.valor;
                    else currentAccount.saldo += transacao.valor;

                    currentAccount.transacoes = currentAccount.transacoes.filter(t => t.id !== transactionId);
                    updateObject(currentObject.id, currentObject);

                    document.getElementById('account-balance').textContent = formatCurrency(currentAccount.saldo);
                    document.querySelector(`tr[data-row-id="${transactionId}"]`)?.remove();
                    showToast("Transação excluída!");
                    modal.closeModal();
                }
            }
        ]
    });
}

function handleDeleteAccount() {
    currentObject.contas = currentObject.contas.filter(c => c.id !== currentAccount.id);
    updateObject(currentObject.id, currentObject);
    showToast("Conta excluída com sucesso!", "error");
    setTimeout(() => {
        window.location.hash = `#/dashboard/objetos/${currentObject.id}`;
    }, 500);
}

function handleTransfer(valor, destinationAccountId) {
    if (valor > currentAccount.saldo) {
        showToast("Saldo insuficiente para transferência.", "error");
        return;
    }

    let destinationObject, destinationAccount;
    for (const obj of allObjects) {
        const found = obj.contas.find(c => c.id === destinationAccountId);
        if (found) {
            destinationObject = obj;
            destinationAccount = found;
            break;
        }
    }

    const dataAtual = new Date().toISOString().substring(0, 10);
    const transferOut = { id: uuidv4(), descricao: `Transferência para ${destinationAccount.nome}`, valor, data: dataAtual, tipo: 'despesa' };
    const transferIn = { id: uuidv4(), descricao: `Transferência de ${currentAccount.nome}`, valor, data: dataAtual, tipo: 'receita' };

    currentAccount.saldo -= valor;
    if (!currentAccount.transacoes) currentAccount.transacoes = [];
    currentAccount.transacoes.push(transferOut);
    updateObject(currentObject.id, currentObject);

    destinationAccount.saldo += valor;
    if (!destinationAccount.transacoes) destinationAccount.transacoes = [];
    destinationAccount.transacoes.push(transferIn);
    updateObject(destinationObject.id, destinationObject);

    document.getElementById('account-balance').textContent = formatCurrency(currentAccount.saldo);
    document.getElementById('statement-table-body').prepend(renderTransactionRow(transferOut));
    showToast("Transferência realizada com sucesso!");
}

// --- FUNÇÕES AUXILIARES ---

const renderTransactionRow = (transaction) => {
    const valueClass = transaction.tipo === 'receita' ? 'text-green-600' : 'text-red-500';
    const valuePrefix = transaction.tipo === 'receita' ? '+' : '-';
    const typeClass = transaction.tipo === 'receita' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

    const row = document.createElement('tr');
    row.className = 'border-b';
    row.dataset.rowId = transaction.id;
    row.innerHTML = `
        <td class="py-3 px-4 text-gray-700">${transaction.data}</td>
        <td class="py-3 px-4 text-gray-700">${toCapitalize(transaction.descricao)}</td>
        <td class="py-3 px-4">
            <span class="px-3 py-1 text-sm rounded-full ${typeClass}">${toCapitalize(transaction.tipo)}</span>
        </td>
        <td class="py-3 px-4 text-right font-medium ${valueClass}">
            ${valuePrefix} ${formatCurrency(transaction.valor)}
        </td>
        <td class="py-3 px-4 text-center">
            <button class="text-red-500 hover:text-red-700" data-transaction-id="${transaction.id}">Excluir</button>
        </td>`;
    row.querySelector('[data-transaction-id]').addEventListener('click', handleDeleteTransaction);
    return row;
};

function populateTransferModal() {
    const destinationObjectSelect = document.getElementById('destinationObject');
    destinationObjectSelect.innerHTML = '<option value="">Selecione um Objeto</option>';

    allObjects.forEach(obj => {
        const option = new Option(obj.nome, obj.id);
        destinationObjectSelect.add(option);
    });

    document.getElementById('destinationObject').addEventListener('change', (e) => {
        populateDestinationAccounts(e.target.value);
    });

    populateDestinationAccounts(null); // Inicializa as contas de destino
}

function populateDestinationAccounts(objectId) {
    const destinationAccountSelect = document.getElementById('destinationAccount');
    destinationAccountSelect.innerHTML = '<option value="">Selecione uma Conta</option>';
    destinationAccountSelect.disabled = true;

    if (!objectId) return;

    const selectedObject = allObjects.find(o => o.id === objectId);
    if (selectedObject) {
        const destinationAccounts = selectedObject.contas.filter(c => c.id !== currentAccount.id);

        if (destinationAccounts.length > 0) {
            destinationAccounts.forEach(acc => {
                const option = new Option(`${acc.nome} (${acc.instituicao})`, acc.id);
                destinationAccountSelect.add(option);
            });
            destinationAccountSelect.disabled = false;
        }
    }
}