export function renderHomepageView() {
  const app = document.getElementById('app');

  // Limpa o conteúdo anterior da div #app
  app.innerHTML = '';

  const container = document.createElement('div');
  // Usando classes do Tailwind para centralizar e estilizar
  container.className = 'flex flex-col items-center justify-center h-screen text-center';

  container.innerHTML = `
    <div class="bg-white w-full h-full flex flex-col font-sans">

        <header class="w-full bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
          <div class=" px-8 sm:px-12 lg:px-28">
            <div class="flex items-center justify-between h-16">
              <div class="flex-shrink-0">
                <a href="#/" class="text-2xl font-bold text-gray-800 flex items-center">
                  Folha
                  <span class="text-green-600 ml-2">🍃</span>
                </a>
              </div>
              
              <div class="flex items-center">
                <a href="#/login" class="text-sm md:text-xl font-semibold text-white transition-colors duration-300 sm:text-base bg-green-600 hover:bg-green-700 py-2 px-8 rounded-full">
                  Entrar
                </a>
              </div>
            </div>
          </div>
        </header>

        <main class="flex-grow flex items-center">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tighter mb-6">
              Organize suas finanças com <span class="text-green-600">simplicidade</span> e clareza.
            </h1>
            <p class="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-10">
              O Folha é a ferramenta que você precisa para tomar o controle do seu dinheiro. Sem complexidade, com foco total no que realmente importa.
            </p>
            <a href="#/login" class="inline-block bg-green-600 text-white font-bold text-lg rounded-full px-8 py-4 shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
              Começar gratuitamente
            </a>
          </div>
        </main>

        <footer class="w-full border-t border-gray-200 py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-500 text-sm">
              &copy; 2025 Folha. Todos os direitos reservados.
            </p>
          </div>
        </footer>

    </div>
  `;

  app.appendChild(container);
}