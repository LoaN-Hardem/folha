/**
 * Renderiza o conteúdo da tela inicial do dashboard com métricas financeiras.
 */
export function renderDashboardHomeView() {
  const dashboardContent = document.getElementById('dashboard-content');
  if (!dashboardContent) return;

  // --- Lógica para buscar os dados (simulação) ---
  // Substitua esta parte pela sua lógica real de busca no LocalStorage
  const totalReceitas = "R$ 1.850,50";
  const totalDespesas = "R$ 480,00";
  const saldoAtual = "R$ 770,50";
  const ultimaContaGerenciada = "Isadora: Nubank / Ag. 0001";
  const ultimasTransacoes = [
    { tipo: 'receita', descricao: 'Salário', valor: 'R$ 1.600,00' },
    { tipo: 'despesa', descricao: 'Almoço', valor: 'R$ 30,50' },
    { tipo: 'despesa', descricao: 'Transporte', valor: 'R$ 50,00' },
  ];

  // const { totalReceitas, totalDespesas, saldoAtual, ultimasTransacoes } = calcularMetricas();
  // const ultimaContaGerenciada = getUltimaConta();
  // --- Fim da lógica de simulação ---

  dashboardContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center">
        <div class="bg-green-100 rounded-full p-3 mr-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 0V4m0 4h.01"></path></svg>
        </div>
        <div>
          <p class="text-sm text-gray-500">Receita Total</p>
          <p class="text-2xl font-bold text-gray-800">${totalReceitas}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center">
        <div class="bg-red-100 rounded-full p-3 mr-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 0V4m0 4h.01"></path></svg>
        </div>
        <div>
          <p class="text-sm text-gray-500">Despesa Total</p>
          <p class="text-2xl font-bold text-gray-800">${totalDespesas}</p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center">
        <div class="bg-blue-100 rounded-full p-3 mr-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a2 2 0 002 2h14a2 2 0 002-2L18 7l-3-1m-6 0l6 0"></path></svg>
        </div>
        <div>
          <p class="text-sm text-gray-500">Saldo Atual</p>
          <p class="text-2xl font-bold text-gray-800">${saldoAtual}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center">
        <div class="bg-yellow-100 rounded-full p-3 mr-4">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h2"></path></svg>
        </div>
        <div>
          <p class="text-sm text-gray-500">Última Conta</p>
          <p class="text-lg font-semibold text-gray-800">${ultimaContaGerenciada}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
        <div class="space-y-4">
          <button class="w-full flex items-center justify-center text-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all group">
            <div class="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mr-4 group-hover:bg-green-200 transition-colors">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-gray-700">Nova Receita</h4>
              <p class="text-sm text-gray-500">Adicionar um novo ganho</p>
            </div>
          </button>
          <button class="w-full flex items-center justify-center text-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:bg-red-50 hover:border-red-400 transition-all group">
            <div class="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mr-4 group-hover:bg-red-200 transition-colors">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-gray-700">Nova Despesa</h4>
              <p class="text-sm text-gray-500">Adicionar um novo gasto</p>
            </div>
          </button>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Últimas Transações</h3>
        <ul class="space-y-4">
          ${ultimasTransacoes.map(t => `
            <li class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div class="flex items-center">
                <div class="p-2 rounded-full ${t.tipo === 'receita' ? 'bg-green-100' : 'bg-red-100'}">
                  <svg class="w-5 h-5 ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${t.tipo === 'receita' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path>'}
                  </svg>
                </div>
                <span class="ml-4 font-semibold text-gray-700">${t.descricao}</span>
              </div>
              <span class="font-bold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">${t.valor}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}