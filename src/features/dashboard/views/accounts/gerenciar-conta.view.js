import { formatCurrency } from "../../../../utils/format-currency";
import { toCapitalize } from "../../../../utils/to-capitalize";

export const GerenciarContaView = (conta, objeto) => {
  const dashboardContent = document.getElementById('dashboard-content');
  if (dashboardContent) dashboardContent.style.backgroundColor = '';

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
          <p id="account-balance" class="text-4xl font-extrabold text-gray-800">${formatCurrency(conta.saldo)}</p>
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
    </div>
  `;
};