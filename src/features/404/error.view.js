export function renderErrorView() {
  const app = document.getElementById('app');


  const container = document.createElement('div');
  container.className = 'error_container p-4 text-center';

  container.innerHTML = `
    <h1 class="text-5xl font-bold mb-4">Infelizmente algo deu errado😢</h1>
    <p>A página que você tentou acessar não foi encontrada</p>
    <p class="mb-4">Tente novamente mais tarde</p>
    <div class="flex justify-center gap-4">
      <button 
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" 
      onclick="location.hash = '#/login'"
    >
      Voltar para login
    </button>
    <button 
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" 
      onclick="location.hash = '#/'"
    >
      Voltar para home
    </button>
    </div>
    

  `;

  app.appendChild(container);
}
