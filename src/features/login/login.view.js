// Em: src/features/login/login.view.js

export function renderLoginView() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpa a tela

  const container = document.createElement('div');
  container.className = 'bg-gray-50 min-h-screen flex items-center justify-center p-4';

  // HTML atualizado com o pop-up de sucesso (inicialmente oculto)
  container.innerHTML = `
    <div id="success-popup" class="hidden fixed inset-0 bg-black/60 items-center justify-center z-20">
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center transform transition-all scale-95 opacity-0">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Conta Criada!</h2>
        <p class="text-gray-600 mb-6">Seu cadastro foi realizado com sucesso. Bem-vindo(a) ao Folha!</p>
        <button id="go-to-dashboard-btn" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all cursor-pointer">
          Ir para o Dashboard
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden">
      <div class="hidden md:flex w-1/2 bg-green-600 p-12 flex-col justify-between">
        <div>
          <a href="#/" class="text-3xl font-bold text-white flex items-center">
            Folha <span class="opacity-75 ml-2">🍃</span>
          </a>
          <p class="text-white/80 mt-4 text-lg leading-relaxed">
            Sua jornada para uma vida financeira mais clara começa agora.
          </p>
        </div>
        <div class="text-white/60 text-sm">
          &copy; 2025 Folha. Design moderno e funcional.
        </div>
      </div>

      <div class="w-full md:w-1/2 p-8 sm:p-12">
        <div id="login-form">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Bem-vindo de volta!</h2>
          <p class="text-gray-600 mb-8">Insira seus dados para continuar.</p>
          <form id="form-login-element">
            <div class="mb-5">
              <label for="login-email" class="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="login-email" placeholder="seu@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" required>
            </div>
            <div class="mb-8">
              <label for="login-password" class="block text-gray-700 font-semibold mb-2">Senha</label>
              <input type="password" id="login-password" placeholder="••••••••" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" required>
            </div>
            <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:cursor-pointer shadow-lg">
              Entrar
            </button>
          </form>
          <p class="text-center text-gray-600 mt-8">
            Não tem uma conta? 
            <a href="#" id="show-register" class="text-green-600 font-semibold hover:underline">
              Registre-se
            </a>
          </p>
        </div>

        <div id="register-form" class="hidden">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Crie sua conta</h2>
          <p class="text-gray-600 mb-8">É rápido e fácil. Vamos começar.</p>
          <form id="form-register-element">
            <div class="mb-5">
              <label for="register-name" class="block text-gray-700 font-semibold mb-2">Nome</label>
              <input type="text" id="register-name" placeholder="Seu nome completo" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" required>
            </div>
            <div class="mb-5">
              <label for="register-email" class="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="register-email" placeholder="seu@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" required>
            </div>
            <div class="mb-6">
              <label for="register-password" class="block text-gray-700 font-semibold mb-2">Senha</f>
              <input type="password" id="register-password" placeholder="Crie uma senha forte" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" required>
            </div>
            <ul id="password-requirements" class="text-sm space-y-1 mb-8">
              <li id="req-length" class="text-gray-500 transition-colors duration-300">Mínimo de 8 caracteres</li>
              <li id="req-uppercase" class="text-gray-500 transition-colors duration-300">Uma letra maiúscula</li>
              <li id="req-number" class="text-gray-500 transition-colors duration-300">Um número</li>
              <li id="req-special" class="text-gray-500 transition-colors duration-300">Um caractere especial (!@#$%)</li>
            </ul>
            <button type="submit" id="register-button" class="w-full bg-gray-400 text-white font-bold py-3 rounded-lg transition-all duration-300 cursor-not-allowed" disabled>
              Criar Conta
            </button>
          </form>
          <p class="text-center text-gray-600 mt-8">
            Já tem uma conta? 
            <a href="#" id="show-login" class="text-green-600 font-semibold hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  `;
  app.appendChild(container);

  // Adiciona a lógica para alternar os formulários E a de validação
  addFormLogic();
}

// Função única para controlar a lógica da página
function addFormLogic() {
  // --- LÓGICA DE ALTERNÂNCIA DE FORMULÁRIO ---
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterBtn = document.getElementById('show-register');
  const showLoginBtn = document.getElementById('show-login');

  showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // --- LÓGICA DE VALIDAÇÃO EM TEMPO REAL ---
  const formRegister = document.getElementById('form-register-element');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const registerButton = document.getElementById('register-button');

  const requirements = [
    { regex: /.{8,}/, element: document.getElementById('req-length') },
    { regex: /[A-Z]/, element: document.getElementById('req-uppercase') },
    { regex: /[0-9]/, element: document.getElementById('req-number') },
    { regex: /[!@#$%^&*]/, element: document.getElementById('req-special') },
  ];
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function validateForm() {
    let isPasswordValid = true;
    const password = passwordInput.value;

    requirements.forEach(req => {
      const el = req.element;
      if (req.regex.test(password)) {
        el.classList.remove('text-gray-500');
        el.classList.add('text-green-600');
        if (!el.textContent.startsWith('✓')) {
          el.textContent = `✓ ${el.textContent}`;
        }
      } else {
        el.classList.remove('text-green-600');
        el.classList.add('text-gray-500');
        el.textContent = el.textContent.replace('✓ ', '');
        isPasswordValid = false;
      }
    });

    const isEmailValid = emailRegex.test(emailInput.value);

    if (isPasswordValid && isEmailValid) {
      registerButton.disabled = false;
      registerButton.classList.replace('bg-gray-400', 'bg-green-600');

      // A correção está aqui:
      registerButton.classList.remove('cursor-not-allowed');
      registerButton.classList.add('cursor-pointer', 'hover:bg-green-700');

    } else {
      registerButton.disabled = true;
      registerButton.classList.replace('bg-green-600', 'bg-gray-400');

      // E aqui, para desativar:
      registerButton.classList.remove('cursor-pointer', 'hover:bg-green-700');
      registerButton.classList.add('cursor-not-allowed');
    }
  }

  passwordInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);

  // --- LÓGICA DO POP-UP E SUBMIT ---
  const popup = document.getElementById('success-popup');
  const popupContent = popup.querySelector('div');

  function showPopup() {
    popup.classList.remove('hidden');
    popup.classList.add('flex');
    // Adiciona uma pequena animação de entrada
    setTimeout(() => {
      popupContent.classList.remove('scale-95', 'opacity-0');
      popupContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  document.getElementById('go-to-dashboard-btn').addEventListener('click', () => {
    location.hash = '#/dashboard';
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!registerButton.disabled) {
      showPopup();
    }
  });

  document.getElementById('form-login-element').addEventListener('submit', (e) => {
    e.preventDefault();
    location.hash = '#/dashboard';
  });
}