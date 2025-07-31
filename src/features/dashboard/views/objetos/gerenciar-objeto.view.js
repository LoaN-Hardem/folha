// Em: src/features/dashboard/views/objetos/gerenciar-objeto.view.js

// Função para formatar a data
const formatCreationDate = (isoString) => {
  if (!isoString) return 'Data indisponível';
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export function renderGerenciarObjetoView(objeto, saldoTotal) {
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

  // Aplica a cor de fundo do tema do objeto
  dashboardContent.style.backgroundColor = objeto?.themeColor || '#F9FAFB';

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
    ? `<img src="${objeto.fotoUrl}" class="w-16 h-16 rounded-full object-cover">`
    : `<div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">${objeto.nome.substring(0, 2).toUpperCase()}</div>`;

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
              <p class="font-bold text-lg ${conta.saldo >= 0 ? 'text-green-600' : 'text-red-600'}">${conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </li>
        </a>
      `).join('')
    : '<p class="text-gray-500 text-center py-4">Nenhuma conta adicionada ainda.</p>';

  dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8 space-y-8">
      
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div id="objeto-avatar-container">${avatarHtml}</div>
          <div>
            <p class="text-sm text-gray-500">Gerenciando o Objeto</p>
            <h2 id="objeto-name-header" class="text-3xl font-bold tracking-tight text-gray-900">${objeto.nome}</h2>
          </div>
        </div>
        <button id="open-settings-panel-btn" class="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>
      </div>

      <hr class="border-gray-200">

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
            <button class="btn btn-primary">Adicionar Conta</button>
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

    <div id="settings-panel" class="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out z-40 flex flex-col">
        <div class="flex items-center justify-between p-4 border-b">
            <h3 class="text-lg font-bold text-gray-800">Configurações do Objeto</h3>
            <button id="close-settings-panel-btn" class="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="flex-grow p-6 space-y-6 overflow-y-auto">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Foto do Objeto</label>
                <div class="flex items-center gap-4">
                    <img id="settings-photo-preview" class="w-16 h-16 rounded-full object-cover" src="${objeto.fotoUrl || `https://ui-avatars.com/api/?name=${objeto.nome.substring(0, 2)}&background=E0E7FF&color=4F46E5`}" alt="Preview"/>
                    <label for="settings-photo-input" class="cursor-pointer text-sm font-semibold text-indigo-600 hover:text-indigo-800">Trocar foto</label>
                    <input type="file" id="settings-photo-input" class="hidden" accept="image/*"/>
                </div>
            </div>
            <div>
                <label for="settings-name-input" class="block text-sm font-medium text-gray-700 mb-1">Nome do Objeto</label>
                <input type="text" id="settings-name-input" class="w-full px-4 py-3 border border-gray-300 rounded-lg" value="${objeto.nome}" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Data de Criação</label>
                <p class="text-sm text-gray-500 bg-gray-100 px-4 py-3 rounded-lg">${formatCreationDate(objeto.criadoEm)}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cor de Fundo da Página</label>
                <div id="color-swatches" class="flex gap-3"></div>
            </div>
        </div>
        <div class="p-4 border-t bg-gray-50">
            <button id="save-settings-btn" class="btn btn-primary w-full">Salvar Alterações</button>
        </div>
    </div>
  `;
}