/**
 * Renderiza a interface principal do dashboard, incluindo o menu lateral,
 * a navbar e a área de conteúdo inicial.
 */
export function renderDashboardView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.className = 'bg-gray-100';

  const container = document.createElement('div');
  // Alterado para 'relative' para ser a referência do menu mobile
  container.className = 'relative min-h-screen md:flex';

  container.innerHTML = `
    <div id="logout-confirmation-popup" class="hidden fixed inset-0 bg-black/60 items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center transform transition-all scale-95 opacity-0">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Confirmar Saída</h2>
        <p class="text-gray-600 mb-6">Você tem certeza que deseja encerrar a sessão?</p>
        <div class="flex justify-center space-x-4">
          <button id="cancel-logout-btn" class="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all">Cancelar</button>
          <button id="confirm-logout-btn" class="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all">Sair</button>
        </div>
      </div>
    </div>

    <div id="sidebar-backdrop" class="hidden md:hidden fixed inset-0 bg-black/50 z-30"></div>


      <aside id="sidebar" class="bg-gray-800 text-white w-64 flex-shrink-0 flex flex-col fixed inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-40">
            
        <div class="flex items-center justify-center h-20 border-b border-gray-700">
          <a href="#/dashboard" class="text-2xl font-bold text-white flex items-center">
            <span class="sidebar-text">Folha</span>
            <span class="text-green-500 ml-2">🍃</span>
          </a>
        </div>

        <nav class="flex-grow p-4 space-y-2">
          <a href="#/dashboard" data-view="home" class="nav-link flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-700">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span class="sidebar-text ml-4 transition-all duration-200">Dashboard</span>
          </a>
          
          <a href="#/dashboard/objetos" data-view="objects" class="nav-link flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-700">
            <svg class="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            <span class="sidebar-text ml-4 transition-all duration-200">Objetos</span>
          </a>

          <a href="#/dashboard/accounts" data-view="accounts" class="nav-link flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-700">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span class="sidebar-text ml-4 transition-all duration-200">Contas</span>
          </a>
        </nav>
        
        <div class="p-4 border-t border-gray-700">
          <a href="#" id="logout-btn" class="flex items-center py-2.5 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span class="sidebar-text ml-4 transition-all duration-200">Sair</span>
          </a>
        </div>
      </aside>

      <div class="flex-1 flex flex-col h-screen overflow-hidden">
       <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-20">
          <button id="menu-toggle-btn" class="text-gray-600 hover:text-green-600 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <div class="flex items-center space-x-4">
            <button class="text-gray-500 hover:text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <div class="flex items-center">
              <span class="text-gray-700 font-semibold mr-3">Olá, Usuário</span>
              <img class="w-10 h-10 rounded-full" src="https://ui-avatars.com/api/?name=Usuario&background=10B981&color=fff" alt="Foto do Perfil">
            </div>
          </div>
        </header>
        <main id="dashboard-content" class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"></main>
      </div>
  `;

  app.appendChild(container);
}