/**
 * Renderiza a tela de "Visão Geral" para um objeto específico.
 * @param {Object} objeto - O objeto a ser gerenciado, vindo do localStorage.
 * @param {number} saldoTotal - O saldo total calculado para este objeto.
 */
export function renderGerenciarObjetoView(objeto, saldoTotal) {
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

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

  // CORREÇÃO: A definição da variável 'avatarHtml' estava faltando.
  // Ela precisa ser criada aqui, antes de ser usada no HTML.
  const avatarHtml = objeto.fotoUrl
    ? `<img src="${objeto.fotoUrl}" class="w-34 h-34 rounded-full object-cover">`
    : `<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
         ${objeto.nome.substring(0, 2).toUpperCase()}
       </div>`;

  // Lógica de contas (simulada por enquanto)
  const contasHtml = objeto.contas && objeto.contas.length > 0
    ? objeto.contas.map(conta => `
        <a href="#/dashboard/contas/${conta.id}" class="block w-full">
            <li class="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  ${conta.instituicao.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p class="font-bold text-gray-800">${conta.nome}</p>
                  <p class="text-sm text-gray-500">${conta.instituicao}</p>
                </div>
              </div>
              <p class="font-bold text-lg text-gray-800">${conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </li>
        </a>
      `).join('')
    : '<p class="text-gray-500 text-center py-4">Nenhuma conta adicionada ainda.</p>';

  dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8 space-y-8">
      
      <div class="flex items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-4">
          ${avatarHtml}
          <div>
            <p class="text-sm text-gray-500">Gerenciando o Objeto</p>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">${objeto.nome}</h2>
          </div>
        </div>
        <button class="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>
      </div>

      <hr class="border-gray-300">

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p class="text-sm text-gray-500">Saldo total do Objeto</p>
          <p class="text-4xl font-bold text-gray-900">${saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
        <div class="flex items-stretch gap-2">
          <button class="flex items-center gap-2 bg-red-100 text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
            <span>Despesa</span>
          </button>
          <button class="flex items-center gap-2 bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <span>Receita</span>
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-800">Contas</h3>
            <button class="bg-indigo-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Adicionar Conta
            </button>
          </div>
          <ul id="contas-list" class="space-y-2">${contasHtml}</ul>
        </div>
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Fluxo de Caixa (Últimos 30 dias)</h3>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Placeholder para Gráfico de Barras]
            </div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Distribuição de Despesas</h3>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Placeholder para Gráfico de Pizza]
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}