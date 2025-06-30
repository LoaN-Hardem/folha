/**
 * Renderiza a interface principal do dashboard, incluindo o menu lateral,
 * a navbar e a área de conteúdo inicial.
 */
export function renderDashboardView() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpa a tela para renderizar a nova página
  app.className = 'bg-gray-100'; // Define um fundo para toda a área do dashboard

  // O container principal que organiza o layout em flex
  const container = document.createElement('div');
  container.className = 'flex h-screen';

  container.innerHTML = `
    <aside id="sidebar" class="bg-gray-800 text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out">
      <div class="h-16 flex items-center justify-center border-b border-gray-700">
        <a href="#/dashboard" class="text-2xl font-bold flex items-center">
          <span class="sidebar-text">Folha</span>
          <span class="text-green-400 ml-2">🍃</span>
        </a>
      </div>

      <nav class="flex-grow p-4 space-y-2">
        <a href="#/dashboard" class="flex items-center py-2.5 px-4 rounded-lg bg-green-600/50">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="sidebar-text ml-4">Dashboard</span>
        </a>
        <a href="#" class="flex items-center py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="sidebar-text ml-4">Contas</span>
        </a>
        <a href="#" class="flex items-center py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          <span class="sidebar-text ml-4">Relatórios</span>
        </a>
      </nav>

      <div class="p-4 border-t border-gray-700">
        <a href="#/login" class="flex items-center py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="sidebar-text ml-4">Sair</span>
        </a>
      </div>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6">
        <button id="menu-toggle-btn" class="text-gray-600 hover:text-green-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <div class="flex items-center space-x-4">
          <button class="text-gray-500 hover:text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
          <div class="flex items-center">
            <span class="text-gray-700 font-semibold mr-3">Olá, Usuário</span>
            <img class="w-10 h-10 rounded-full" src="https://ui-avatars.com/api/?name=Usuario&background=10B981&color=fff" alt="Foto do Perfil">
          </div>
        </div>
      </header>

      <main class="flex-1 p-8 flex items-center justify-center">
        <button class="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-300 rounded-2xl hover:bg-gray-200 hover:border-gray-400 transition-all group">
          <div class="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
            <svg class="w-10 h-10 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <h2 class="text-xl font-bold text-gray-700">Criar objeto gerenciável</h2>
          <p class="text-gray-500 mt-1">Clique aqui para começar a organizar suas finanças.</p>
        </button>
      </main>
    </div>
  `;

  app.appendChild(container);

  // Adiciona a lógica de interatividade após a renderização do HTML
  addDashboardLogic();
}


/**
 * Adiciona a lógica de interatividade ao dashboard, como o toggle do menu lateral.
 */
function addDashboardLogic() {
  const sidebar = document.getElementById('sidebar');
  const menuToggleButton = document.getElementById('menu-toggle-btn');
  const sidebarTexts = document.querySelectorAll('.sidebar-text');

  menuToggleButton.addEventListener('click', () => {
    // Alterna a largura da sidebar
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-20');

    // Esconde ou mostra o texto dos itens do menu
    sidebarTexts.forEach(text => {
      text.classList.toggle('hidden');
    });
  });

  // Opcional: Fazer o menu começar retrátil em telas menores
  if (window.innerWidth < 768) {
      menuToggleButton.click();
  }
}