/**
 * Renderiza o conteúdo da tela inicial do dashboard.
 */
export function renderDashboardHomeView() {
  // Encontra o "palco" que a view principal do dashboard criou.
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

  dashboardContent.innerHTML = `
    <button class="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-300 rounded-2xl h-full w-full hover:bg-gray-200 hover:border-gray-400 transition-all group">
      <div class="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
        <svg class="w-10 h-10 text-gray-500 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
      </div>
      <h2 class="text-xl font-bold text-gray-700">Criar objeto gerenciável</h2>
      <p class="text-gray-500 mt-1">Clique aqui para começar a organizar suas finanças.</p>
    </button>
  `;
}