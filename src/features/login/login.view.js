export function renderLoginView() {
  const app = document.getElementById('app');

  const container = document.createElement('div');
  container.className = 'p-4 text-center';

  container.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">Bem-vindo ao Verdale</h1>
    <p class="mb-4">Faça login para continuar</p>
    <button 
      class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
      onclick="location.hash = '#/dashboard'"
    >
      Entrar
    </button>
  `;

  app.appendChild(container);
}
