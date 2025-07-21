// Arquivo: src/features/dashboard/dashboard.controller.js

import { renderDashboardView } from './dashboard.view.js';
import { renderDashboardHomeView } from './views/home/home.view.js';
import { initObjetos } from './views/objetos/objetos.controller.js';
// Futuramente: import { renderAccountsView } from './views/accounts/accounts.view.js';

/**
 * Carrega o conteúdo de uma sub-view específica dentro do layout do dashboard.
 * @param {string} viewName - O nome da view a ser carregada.
 */
function loadDashboardContent(viewName) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('bg-green-600/50');
  });

  const activeLink = document.querySelector(`.nav-link[data-view="${viewName}"]`);
  if (activeLink) {
    activeLink.classList.add('bg-green-600/50');
  }

  switch (viewName) {
    case 'home':
      renderDashboardHomeView();
      break;
    case 'accounts':
      const content = document.getElementById('dashboard-content');
      content.innerHTML = '<h1 class="text-2xl font-bold">Página de Contas (Em Construção)</h1>';
      break;
    case 'objects':
      initObjetos();
      break;
    default:
      renderDashboardHomeView();
  }
}

/**
 * Adiciona toda a lógica de interatividade ao dashboard após a renderização.
 */
// function addDashboardLogic() {
//   // --- LÓGICA PARA RETRAIR O MENU LATERAL ---
//   const sidebar = document.getElementById('sidebar');
//   const menuToggleButton = document.getElementById('menu-toggle-btn');
//   const sidebarTexts = document.querySelectorAll('.sidebar-text');

//   menuToggleButton.addEventListener('click', () => {
//     sidebar.classList.toggle('w-64');
//     sidebar.classList.toggle('w-20');
//     sidebarTexts.forEach(text => { text.classList.toggle('hidden'); });
//   });

//   if (window.innerWidth < 768) {
//     menuToggleButton.click();
//   }

//   // --- LÓGICA PARA NAVEGAÇÃO INTERNA DO DASHBOARD ---
//   const navLinks = document.querySelectorAll('.nav-link');
//   navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       const viewName = link.getAttribute('data-view');
//       loadDashboardContent(viewName);
//     });
//   });

//   // --- LÓGICA DO POP-UP DE CONFIRMAÇÃO DE SAÍDA ---
//   const logoutBtn = document.getElementById('logout-btn');
//   const logoutPopup = document.getElementById('logout-confirmation-popup');
//   const popupContent = logoutPopup.querySelector('div');
//   const cancelBtn = document.getElementById('cancel-logout-btn');
//   const confirmBtn = document.getElementById('confirm-logout-btn');

//   logoutBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     logoutPopup.classList.remove('hidden');
//     logoutPopup.classList.add('flex');
//     setTimeout(() => {
//       popupContent.classList.remove('scale-95', 'opacity-0');
//       popupContent.classList.add('scale-100', 'opacity-100');
//     }, 10);
//   });

//   cancelBtn.addEventListener('click', () => {
//     popupContent.classList.add('scale-95', 'opacity-0');
//     setTimeout(() => logoutPopup.classList.add('hidden'), 200);
//   });

//   confirmBtn.addEventListener('click', () => {
//     location.hash = '#/login';
//   });
// }


/**
 * Adiciona toda a lógica de interatividade ao dashboard após a renderização.
 */
function addDashboardLogic() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const menuToggleButton = document.getElementById('menu-toggle-btn');

  // Função para fechar o menu no mobile
  const closeMobileMenu = () => {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  };

  // Lógica do botão de toggle (agora mais inteligente)
  // Dentro da função addDashboardLogic, encontre o listener do menuToggleButton
  // e substitua por este:

  menuToggleButton.addEventListener('click', () => {
    // Em telas de desktop, ele encolhe/expande com animação suave
    if (window.innerWidth >= 768) {
      sidebar.classList.toggle('w-20');
      sidebar.classList.toggle('w-64');

      // Animação suave para os textos
      document.querySelectorAll('.sidebar-text').forEach(text => {
        // Adiciona/remove classes para um efeito de fade e encolhimento
        text.classList.toggle('opacity-0');
        text.classList.toggle('w-0');
        text.classList.toggle('ml-0');

        // O 'invisible' ajuda na acessibilidade e evita que o texto
        // que sumiu possa ser clicado ou selecionado.
        setTimeout(() => {
          text.classList.toggle('invisible');
        }, 150); // O delay deve ser metade da duração da transição
      });

    } else {
      // Em telas mobile, ele abre como overlay (comportamento mantido)
      sidebar.classList.toggle('-translate-x-full');
      backdrop.classList.toggle('hidden');
    }
  });
  // Fecha o menu mobile se o usuário clicar no backdrop
  backdrop.addEventListener('click', closeMobileMenu);

  // --- LÓGICA PARA NAVEGAÇÃO INTERNA DO DASHBOARD ---
  // Fecha o menu mobile após clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = link.getAttribute('data-view');
      loadDashboardContent(viewName);

      // Se estiver no mobile, fecha o menu
      if (window.innerWidth < 768) {
        closeMobileMenu();
      }
    });
  });

  // --- LÓGICA DO POP-UP DE CONFIRMAÇÃO DE SAÍDA (Sem alterações) ---
  const logoutBtn = document.getElementById('logout-btn');
  const logoutPopup = document.getElementById('logout-confirmation-popup');
  const popupContent = logoutPopup.querySelector('div');
  const cancelBtn = document.getElementById('cancel-logout-btn');
  const confirmBtn = document.getElementById('confirm-logout-btn');

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logoutPopup.classList.remove('hidden');
    logoutPopup.classList.add('flex');
    setTimeout(() => {
      popupContent.classList.remove('scale-95', 'opacity-0');
      popupContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  });

  cancelBtn.addEventListener('click', () => {
    popupContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => logoutPopup.classList.add('hidden'), 200);
  });

  confirmBtn.addEventListener('click', () => {
    location.hash = '#/login';
  });
}

/**
 * Inicializa a feature do Dashboard.
 */
export function initDashboard() {
  // 1. Renderiza a "casca" principal (layout)
  renderDashboardView();

  // 2. Carrega o conteúdo padrão (a home do dashboard)
  loadDashboardContent('home');

  // 3. Adiciona TODA a lógica de interatividade de uma só vez
  addDashboardLogic();
}