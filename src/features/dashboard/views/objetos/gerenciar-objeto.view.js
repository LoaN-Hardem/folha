/**
 * Renderiza a tela de gerenciamento para um objeto específico.
 * @param {Object} objeto - O objeto a ser gerenciado, vindo do localStorage.
 */
export function renderGerenciarObjetoView(objeto) {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;

    // Se o objeto não for encontrado, mostra uma mensagem de erro.
    if (!objeto) {
        dashboardContent.innerHTML = `
      <div class="p-8 text-center">
        <h2 class="text-2xl font-bold text-red-600">Objeto não encontrado</h2>
        <p class="text-gray-500 mt-2">O objeto que você está tentando acessar não existe ou foi excluído.</p>
        <a href="#/dashboard/objetos" class="mt-4 inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Voltar para Objetos</a>
      </div>
    `;
        return;
    }

    const avatarHtml = objeto.fotoUrl
        ? `<img src="${objeto.fotoUrl}" class="w-12 h-12 rounded-full object-cover">`
        : `<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
         ${objeto.nome.substring(0, 2).toUpperCase()}
       </div>`;

    dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8">
      {/* Cabeçalho da Página */}
      <div class="flex items-center gap-4 mb-8">
        ${avatarHtml}
        <div>
          <p class="text-sm text-gray-500">Gerenciando o Objeto</p>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">${objeto.nome}</h2>
        </div>
      </div>

      {/* Seção de Contas */}
      <div class="bg-white p-6 rounded-2xl shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">Contas</h3>
          <button class="bg-indigo-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Adicionar Conta
          </button>
        </div>
        <div id="contas-list">
          <p class="text-gray-500">Nenhuma conta adicionada ainda.</p>
        </div>
      </div>

      {/* Futura Seção de Transações */}
      <div class="mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Transações Recentes</h3>
        <div id="transacoes-list">
          <p class="text-gray-500">Nenhuma transação registrada.</p>
        </div>
      </div>
    </div>
  `;
}