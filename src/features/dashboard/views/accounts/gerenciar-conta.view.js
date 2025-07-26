import { formatCurrency } from "../../../../utils/format-currency";
import { toCapitalize } from "../../../../utils/to-capitalize";

export const GerenciarContaView = (conta, objeto) => {
    // Inicialmente, as transações podem vir vazias
    const transacoes = conta.transacoes || [];

    return `
    <div class="container mx-auto p-4 md:p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">${toCapitalize(conta.nome)}</h1>
          <p class="text-md text-gray-500">Pertence ao Objeto: <strong>${toCapitalize(objeto.nome)}</strong></p>
          <p class="text-md text-gray-500">Instituição: ${conta.instituicao}</p>
        </div>
        <div class="flex items-center space-x-2 mt-4 md:mt-0">
          <button id="btn-edit-account" class="btn btn-secondary">Editar</button>
          <button id="btn-open-transfer-modal" class="btn btn-secondary">Transferir</button>
          <button id="btn-delete-account" class="btn btn-danger">Excluir Conta</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-1 flex flex-col justify-center">
          <h2 class="text-gray-500 text-lg">Saldo Atual</h2>
          <p class="text-4xl font-extrabold text-gray-800">${formatCurrency(conta.saldoInicial)}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button id="btn-open-receita-modal" class="bg-green-500 text-white w-full h-full py-4 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-green-600 transition-all">
              Adicionar Receita
            </button>
            <button id="btn-open-despesa-modal" class="bg-red-500 text-white w-full h-full py-4 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-red-600 transition-all">
              Adicionar Despesa
            </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Extrato da Conta</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="py-3 px-4 text-left text-gray-600 font-semibold">Data</th>
                <th class="py-3 px-4 text-left text-gray-600 font-semibold">Descrição</th>
                <th class="py-3 px-4 text-left text-gray-600 font-semibold">Tipo</th>
                <th class="py-3 px-4 text-right text-gray-600 font-semibold">Valor</th>
                <th class="py-3 px-4 text-center text-gray-600 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody id="statement-table-body">
              ${transacoes.length > 0
            ? transacoes.map(t => `
                      <tr class="border-b">
                        <td class="py-3 px-4 text-gray-700">${t.data}</td>
                        <td class="py-3 px-4 text-gray-700">${toCapitalize(t.descricao)}</td>
                        <td class="py-3 px-4">
                          <span class="px-3 py-1 text-sm rounded-full ${t.tipo === 'receita' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${toCapitalize(t.tipo)}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-right font-medium ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-500'}">
                          ${t.tipo === 'receita' ? '+' : '-'} ${formatCurrency(t.valor)}
                        </td>
                        <td class="py-3 px-4 text-center">
                           <button class="text-red-500 hover:text-red-700" data-transaction-id="${t.id}">Excluir</button>
                        </td>
                      </tr>
                    `).join('')
            : `
                      <tr>
                        <td colspan="5" class="text-center py-10 text-gray-500">Nenhuma transação registrada.</td>
                      </tr>
                    `
        }
            </tbody>
          </table>
        </div>
      </div>

      ${ModalEditarConta(conta)}
      ${ModalAdicionarTransacao('receita')}
      ${ModalAdicionarTransacao('despesa')}
      ${ModalTransferencia()}
    </div>
  `;
};

// Componente do Modal para Editar Conta
const ModalEditarConta = (conta) => `
<div id="modal-edit-account" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6">Editar Conta</h2>
    <form id="form-edit-account">
        <input type="hidden" id="editAccountId" value="${conta.id}">
        <div class="mb-4">
            <label for="editAccountName" class="block text-gray-700">Nome da Conta</label>
            <input type="text" id="editAccountName" class="w-full p-2 border rounded" value="${conta.nome}" required>
        </div>
        <div class="mb-4">
            <label for="editAccountBank" class="block text-gray-700">Instituição</label>
            <input type="text" id="editAccountBank" class="w-full p-2 border rounded" value="${conta.instituicao}" required>
        </div>
        <div class="flex justify-end space-x-4">
            <button type="button" id="btn-cancel-edit-account" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Salvar Alterações</button>
        </div>
    </form>
  </div>
</div>
`;


// Componente Reutilizável para Modal de Receita e Despesa
const ModalAdicionarTransacao = (tipo) => {
    const isReceita = tipo === 'receita';
    const title = isReceita ? 'Adicionar Receita' : 'Adicionar Despesa';
    const modalId = `modal-add-${tipo}`;
    const formId = `form-add-${tipo}`;

    return `
    <div id="${modalId}" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6">${title}</h2>
        <form id="${formId}">
            <div class="mb-4">
                <label for="${tipo}Descricao" class="block text-gray-700">Descrição</label>
                <input type="text" id="${tipo}Descricao" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-4">
                <label for="${tipo}Valor" class="block text-gray-700">Valor (R$)</label>
                <input type="number" step="0.01" id="${tipo}Valor" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-4">
                <label for="${tipo}Data" class="block text-gray-700">Data</label>
                <input type="date" id="${tipo}Data" class="w-full p-2 border rounded" value="${new Date().toISOString().substring(0, 10)}" required>
            </div>
            <div class="flex justify-end space-x-4">
                <button type="button" id="btn-cancel-add-${tipo}" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn ${isReceita ? 'btn-success' : 'btn-danger'}">Adicionar</button>
            </div>
        </form>
      </div>
    </div>
  `;
};

// Componente do Modal para Transferência
const ModalTransferencia = () => `
<div id="modal-transfer" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-6">Transferência Entre Contas</h2>
        <form id="form-transfer">
            <div class="mb-4">
                <label for="transferValue" class="block text-gray-700">Valor a Transferir (R$)</label>
                <input type="number" step="0.01" id="transferValue" class="w-full p-2 border rounded" required>
            </div>
            <div class="mb-4">
                <label for="destinationObject" class="block text-gray-700">Objeto de Destino</label>
                <select id="destinationObject" class="w-full p-2 border rounded" required></select>
            </div>
            <div class="mb-4">
                <label for="destinationAccount" class="block text-gray-700">Conta de Destino</label>
                <select id="destinationAccount" class="w-full p-2 border rounded" required></select>
            </div>
            <div class="flex justify-end space-x-4">
                <button type="button" id="btn-cancel-transfer" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Confirmar Transferência</button>
            </div>
        </form>
    </div>
</div>
`;