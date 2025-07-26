// Em: src/features/dashboard/controllers/gerenciar-conta.controller.js

import { GerenciarContaView } from "../views/accounts/gerenciar-conta.view.js";
// Importação CORRIGIDA: agora aponta para o seu arquivo de storage
import { getObjetos, updateObject } from "../../../app/storage/objetos.storage.js";
import { v4 as uuidv4 } from "uuid";

// Variáveis para guardar o estado atual
let currentObject;
let currentAccount;
let allObjects;

export const initGerenciarConta = (params) => {
    const { id: accountId } = params; // Pega o ID da conta da URL
    const dashboardContent = document.getElementById("dashboard-content");
    if (!dashboardContent) return;

    // Encontra a conta e seu objeto
    allObjects = getObjetos(); // Utiliza a função correta
    for (const obj of allObjects) {
        const foundAccount = obj.contas.find(c => c.id === accountId);
        if (foundAccount) {
            currentObject = obj;
            currentAccount = foundAccount;
            break;
        }
    }

    if (!currentAccount) {
        dashboardContent.innerHTML = `<div class="container mx-auto p-8 text-center"><h1 class="text-2xl text-red-500">Conta não encontrada!</h1></div>`;
        return;
    }

    // Renderiza a view com os dados encontrados
    dashboardContent.innerHTML = GerenciarContaView(currentAccount, currentObject);
    attachEventListeners();
};

function attachEventListeners() {
    // --- Funções do Modal de Edição ---
    const modalEdit = document.getElementById("modal-edit-account");
    document.getElementById("btn-edit-account").addEventListener("click", () => modalEdit.classList.remove("hidden"));
    document.getElementById("btn-cancel-edit-account").addEventListener("click", () => modalEdit.classList.add("hidden"));
    document.getElementById("form-edit-account").addEventListener("submit", handleEditAccount);

    // --- Funções do Modal de Receita ---
    const modalReceita = document.getElementById("modal-add-receita");
    document.getElementById("btn-open-receita-modal").addEventListener("click", () => modalReceita.classList.remove("hidden"));
    document.getElementById("btn-cancel-add-receita").addEventListener("click", () => modalReceita.classList.add("hidden"));
    document.getElementById("form-add-receita").addEventListener("submit", (e) => handleAddTransaction(e, 'receita'));

    // --- Funções do Modal de Despesa ---
    const modalDespesa = document.getElementById("modal-add-despesa");
    document.getElementById("btn-open-despesa-modal").addEventListener("click", () => modalDespesa.classList.remove("hidden"));
    document.getElementById("btn-cancel-add-despesa").addEventListener("click", () => modalDespesa.classList.add("hidden"));
    document.getElementById("form-add-despesa").addEventListener("submit", (e) => handleAddTransaction(e, 'despesa'));

    // --- Funções do Modal de Transferência ---
    const modalTransfer = document.getElementById("modal-transfer");
    document.getElementById("btn-open-transfer-modal").addEventListener("click", () => {
        populateTransferModal();
        modalTransfer.classList.remove("hidden");
    });
    document.getElementById("btn-cancel-transfer").addEventListener("click", () => modalTransfer.classList.add("hidden"));
    document.getElementById("form-transfer").addEventListener("submit", handleTransfer);

    // --- Deleção de Conta e Transações ---
    document.getElementById("btn-delete-account").addEventListener("click", handleDeleteAccount);
    document.querySelectorAll('[data-transaction-id]').forEach(button => {
        button.addEventListener('click', handleDeleteTransaction);
    });

    // Listener para o select de objetos no modal de transferência
    document.getElementById('destinationObject').addEventListener('change', (e) => {
        const selectedObjectId = e.target.value;
        populateDestinationAccounts(selectedObjectId);
    });
}

// --- Lógica das Ações (agora usando updateObject) ---

function handleEditAccount(e) {
    e.preventDefault();
    const newName = document.getElementById("editAccountName").value;
    const newBank = document.getElementById("editAccountBank").value;

    currentAccount.nome = newName;
    currentAccount.instituicao = newBank;

    updateObject(currentObject.id, currentObject); // Usa a função correta
    initGerenciarConta({ id: currentAccount.id }); // Recarrega a view
}

function handleAddTransaction(e, tipo) {
    e.preventDefault();
    const form = e.target;
    const descricao = form.querySelector(`#${tipo}Descricao`).value;
    const valor = parseFloat(form.querySelector(`#${tipo}Valor`).value);
    const data = form.querySelector(`#${tipo}Data`).value;

    if (!currentAccount.transacoes) {
        currentAccount.transacoes = [];
    }

    const novaTransacao = {
        id: uuidv4(),
        descricao,
        valor,
        data,
        tipo
    };

    currentAccount.transacoes.push(novaTransacao);

    if (tipo === 'receita') {
        currentAccount.saldo += valor;
    } else {
        currentAccount.saldo -= valor;
    }

    updateObject(currentObject.id, currentObject); // Usa a função correta
    initGerenciarConta({ id: currentAccount.id });
}

function handleDeleteTransaction(e) {
    const transactionId = e.target.dataset.transactionId;
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
        const transacao = currentAccount.transacoes.find(t => t.id === transactionId);

        if (transacao.tipo === 'receita') {
            currentAccount.saldo -= transacao.valor;
        } else {
            currentAccount.saldo += transacao.valor;
        }

        currentAccount.transacoes = currentAccount.transacoes.filter(t => t.id !== transactionId);
        updateObject(currentObject.id, currentObject); // Usa a função correta
        initGerenciarConta({ id: currentAccount.id });
    }
}

function handleDeleteAccount() {
    if (confirm(`Tem certeza que deseja excluir a conta "${currentAccount.nome}"? Esta ação não pode ser desfeita.`)) {
        currentObject.contas = currentObject.contas.filter(c => c.id !== currentAccount.id);
        updateObject(currentObject.id, currentObject); // Usa a função correta
        window.location.hash = `#/dashboard/objetos/${currentObject.id}`;
    }
}

function populateTransferModal() {
    const destinationObjectSelect = document.getElementById('destinationObject');
    destinationObjectSelect.innerHTML = '<option value="">Selecione um Objeto</option>';

    allObjects.forEach(obj => {
        const option = new Option(obj.nome, obj.id);
        destinationObjectSelect.add(option);
    });

    populateDestinationAccounts(null);
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

function handleTransfer(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('transferValue').value);
    const destinationAccountId = document.getElementById('destinationAccount').value;

    if (valor <= 0 || !destinationAccountId) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    if (valor > currentAccount.saldo) {
        alert("Saldo insuficiente para realizar a transferência.");
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
    updateObject(currentObject.id, currentObject); // Usa a função correta

    destinationAccount.saldo += valor;
    if (!destinationAccount.transacoes) destinationAccount.transacoes = [];
    destinationAccount.transacoes.push(transferIn);
    updateObject(destinationObject.id, destinationObject); // Usa a função correta

    initGerenciarConta({ id: currentAccount.id });
}