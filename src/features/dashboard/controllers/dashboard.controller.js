import { renderDashboardView } from '../dashboard.view.js';
import { renderDashboardHomeView } from '../views/home/home.view.js';
import { initObjetos } from '../controllers/objetos.controller.js';
import { initGerenciarObjeto } from '../controllers/gerenciar-objeto.controller.js';
import { initAccounts } from '../controllers/accounts.controller.js';
import { initGerenciarConta } from '../controllers/gerenciar-conta.controller.js';

/**
 * Adiciona a lógica de interatividade do menu, popups, etc.
 * Esta função não precisa ser alterada, pode manter a sua versão mais recente.
 */
function addDashboardLogic() {
  // MANTENHA A SUA VERSÃO MAIS RECENTE DESTA FUNÇÃO AQUI
  // (Com a lógica do menu abrindo e fechando, backdrop, etc.)
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const menuToggleButton = document.getElementById('menu-toggle-btn');

  const closeMobileMenu = () => {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  };

  menuToggleButton.addEventListener('click', () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.toggle('w-20');
      sidebar.classList.toggle('w-64');
      document.querySelectorAll('.sidebar-text').forEach(text => {
        text.classList.toggle('opacity-0');
        text.classList.toggle('w-0');
        text.classList.toggle('ml-0');
        setTimeout(() => {
          text.classList.toggle('invisible');
        }, 150);
      });
    } else {
      sidebar.classList.toggle('-translate-x-full');
      backdrop.classList.toggle('hidden');
    }
  });

  backdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMobileMenu();
      }
    });
  });

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
 * Atualiza qual link do menu lateral está ativo.
 * @param {string} currentView - A view atual (ex: 'home', 'objetos').
 */
function updateActiveNavLink(currentView) {
  // Primeiro, remove o estado ativo de todos os links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('bg-indigo-50', 'text-indigo-600', 'font-semibold');
  });

  // Em seguida, aplica as novas classes ao link ativo
  const activeLink = document.querySelector(`.nav-link[data-view="${currentView}"]`);
  if (activeLink) {
    activeLink.classList.add('bg-indigo-50', 'text-indigo-600', 'font-semibold');
  }
}

/**
 * Inicializa a feature do Dashboard e atua como um sub-roteador.
 * @param {Object} routeParams - Parâmetros da rota vindos do router.js.
 */
export function initDashboard(routeParams = {}) {
  // Renderiza a "casca" do dashboard (menu, header) apenas se ela não existir ainda
  if (!document.getElementById('sidebar')) {
    renderDashboardView();
    addDashboardLogic();
  }

  // Decide qual sub-view carregar com base nos parâmetros da rota
  const { view, id } = routeParams;
  let currentView = 'home'; // Padrão é a home


  // ADICIONE ESTA NOVA CONDIÇÃO AQUI
  if (view === 'contas' && id) {
    initGerenciarConta({ id });
    currentView = 'accounts'; // Mantém o menu "Contas" ativo
  } else if (view === 'objetos' && id) {
    initGerenciarObjeto({ id });
    currentView = 'objetos';
  } else if (view === 'objetos') {
    initObjetos();
    currentView = 'objetos';
  } else if (view === 'accounts') {
    initAccounts();
    currentView = 'accounts';
  } else {
    renderDashboardHomeView();
    currentView = 'home';
  }

  updateActiveNavLink(currentView);
}