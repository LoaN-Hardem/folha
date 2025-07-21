import { getObjetos } from '../../../../app/storage/objetos.storage.js';

/**
 * Renderiza a visualização principal para gerenciar Objetos.
 */
export function renderObjetosView() {
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

  const objetos = getObjetos();

  dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Meus Objetos</h2>
        <div class="mt-4 sm:mt-0">
          <button type="button" id="create-objeto-btn" class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring">
            Criar novo objeto
          </button>
        </div>
      </div>

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
  const avatarHtml = objeto.fotoUrl
    ? `<img src="${objeto.fotoUrl}" class="w-16 h-16 rounded-full object-cover">`
    : `<div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">
         ${objeto.nome.substring(0, 2).toUpperCase()}
       </div>`;

  return `
    <div class="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
      <div class="flex-shrink-0">
        ${avatarHtml}
      </div>
      <div class="flex-grow">
        <h3 class="text-xl font-bold text-gray-800 truncate">${objeto.nome}</h3>
        <p class="text-sm text-gray-500 mt-1">Contas: ${objeto.contas.length}</p>
        <div class="mt-3 space-x-4">
           <button class="text-white font-semibold text-sm bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full">Gerenciar</button>
           <button id="delete-objeto-${objeto.id}" class="text-white bg-red-500 hover:bg-red-700 font-semibold text-sm py-2 px-4 rounded-full">Excluir</button>
        </div>
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