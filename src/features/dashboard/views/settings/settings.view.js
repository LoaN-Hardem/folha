// Em: src/features/dashboard/views/settings/settings.view.js

export function renderSettingsView() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;

    // Reseta a cor de fundo para o padrão
    dashboardContent.style.backgroundColor = '';

    dashboardContent.innerHTML = `
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="sm:flex sm:items-center sm:justify-between mb-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Configurações</h2>
      </div>

      <div class="bg-white p-8 rounded-2xl shadow-md text-center">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <h3 class="mt-4 text-xl font-bold text-gray-800">Página em Construção</h3>
        <p class="mt-2 text-gray-500">
          Funcionalidades avançadas como exportação de dados, troca de senha e mais estarão disponíveis aqui em breve.
        </p>
      </div>
    </div>
  `;
}