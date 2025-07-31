/**
 * Renderiza a página principal de "Contas", listando todas as contas agrupadas por Objeto.
 * @param {Array<Object>} objetos - A lista completa de objetos gerenciáveis.
 */
export function renderAccountsView(objetos) {
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

  // RESETAR A COR
  dashboardContent.style.backgroundColor = '';

  const accountsByObjectHtml = objetos.map(objeto => {
    // Se um objeto não tiver contas, não o exibimos na lista.
    if (!objeto.contas || objeto.contas.length === 0) {
      return '';
    }

    // Em: src/features/dashboard/views/accounts/accounts.view.js

    const contasHtml = objeto.contas.map(conta => `
    <a href="#/dashboard/contas/${conta.id}" class="block">
      <li class="flex items-center justify-between p-4 border-t border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
            ${conta.instituicao.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p class="font-bold text-gray-800">${conta.nome}</p>
            <p class="text-sm text-gray-500">${conta.instituicao}</p>
          </div>
        </div>
        <p class="font-bold text-lg ${conta.saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
          ${conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </li>
    </a>
    `).join('');

    return `
      <div class="bg-white rounded-2xl shadow-md mb-8 overflow-hidden">
        <div class="p-3 bg-indigo-500 border-b">
            <div class="flex items-center gap-3">
              ${objeto.fotoUrl
        ? `<img src="${objeto.fotoUrl}" class="w-12 h-12 rounded-full object-cover">`
        : `<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">${objeto.nome.substring(0, 2).toUpperCase()}</div>`
      }
              <h3 class="text-lg font-bold text-white">${objeto.nome}</h3>
            </div>
        </div>
        <ul>
          ${contasHtml}
        </ul>
      </div>
    `;
  }).join('');

  dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="sm:flex sm:items-center sm:justify-between mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Todas as Contas</h2>
        <div class="mt-4 sm:mt-0">
          <button type="button" id="add-account-btn" class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700">
            Adicionar Nova Conta
          </button>
        </div>
      </div>

      <hr class="division-separator">

      <div id="all-accounts-list">
        ${accountsByObjectHtml || '<p class="text-center text-gray-500">Nenhuma conta foi adicionada em nenhum objeto ainda.</p>'}
      </div>
    </div>
  `;
}