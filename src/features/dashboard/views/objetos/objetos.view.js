import { getObjetos } from '../../../../app/storage/objetos.storage.js';
import { formatCurrency } from '../../../../utils/format-currency.js';
/**
 * Renderiza a visualização principal para gerenciar Objetos.
 */
export function renderObjetosView() {
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

  const objetos = getObjetos();

  dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="sm:flex sm:items-center sm:justify-between mb-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Meus Objetos</h2>
        <div class="mt-4 sm:mt-0">
          <button type="button" id="create-objeto-btn" class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-800 focus:outline-none focus:ring hover:cursor-pointer">
            Criar novo objeto
          </button>
        </div>
      </div>

      <hr class="division-separator">

      <div id="objetos-list" class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${objetos.length > 0 ? objetos.map(objeto => renderObjetoCard(objeto)).join('') : renderEmptyState()}
      </div>
    </div>
  `;
}

/**
 * Renderiza um card para um único objeto gerenciável.
 * @param {Object} objeto - O objeto a ser renderizado.
 * @returns {string} O HTML do card.
 */
function renderObjetoCard(objeto) {
  // Simulação do saldo total, já que ainda não temos as contas.
  // No futuro, este valor virá de um cálculo real.
  const saldoTotal = objeto.contas.reduce((acc, conta) => acc + conta.saldo, 0);

  // Lógica para criar o avatar (foto ou iniciais)
  const avatarHtml = objeto.fotoUrl
    ? `<img src="${objeto.fotoUrl}" class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md">`
    : `<div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-4xl border-4 border-white shadow-md">
         ${objeto.nome.substring(0, 2).toUpperCase()}
       </div>`;

  return `
    <div id="objeto-${objeto.id}" class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 flex flex-col items-center text-center">
        <div class="mb-4">
          ${avatarHtml}
        </div>
        <h3 class="text-xl font-bold text-gray-900 truncate w-full">${objeto.nome}</h3>
        <div class="my-2">
          <p class="text-sm text-gray-500">Saldo Total</p>
          <p class="text-2xl font-bold text-green-600">${formatCurrency(saldoTotal)}</p>
        </div>
        <div class="mt-4 w-full flex flex-col space-y-2">
         <button class="manage-btn btn btn-primary">Gerenciar</button>
         <button class="delete-btn btn btn-secondary">Excluir</button>
        </div>
    </div>
  `;
}

/**
 * Renderiza a mensagem de estado vazio quando não há objetos.
 * @returns {string} O HTML do estado vazio.
 */
function renderEmptyState() {
  return `
    <div class="col-span-full text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">Nenhum objeto criado</h3>
      <p class="mt-1 text-sm text-gray-500">Comece criando seu primeiro objeto gerenciável.</p>
    </div>
  `;
}