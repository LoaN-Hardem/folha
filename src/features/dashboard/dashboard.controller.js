// Arquivo: src/features/dashboard/dashboard.controller.js

import { renderDashboardView } from './dashboard.view.js';
import { renderDashboardHomeView } from './views/home/home.view.js';
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
      const objects = document.getElementById('dashboard-content');
      objects.innerHTML = '<h1 class="text-2xl font-bold">Página de Objetos (Em Construção)</h1>';
      break;
    default:
      renderDashboardHomeView();
  }
}

/**
 * Adiciona toda a lógica de interatividade ao dashboard após a renderização.
 */
function addDashboardLogic() {
  // --- LÓGICA PARA RETRAIR O MENU LATERAL ---
  const sidebar = document.getElementById('sidebar');
  const menuToggleButton = document.getElementById('menu-toggle-btn');
  const sidebarTexts = document.querySelectorAll('.sidebar-text');

  menuToggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-20');
    sidebarTexts.forEach(text => { text.classList.toggle('hidden'); });
  });

  if (window.innerWidth < 768) {
    menuToggleButton.click();
  }

  // --- LÓGICA PARA NAVEGAÇÃO INTERNA DO DASHBOARD ---
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = link.getAttribute('data-view');
      loadDashboardContent(viewName);
    });
  });

  // --- LÓGICA DO POP-UP DE CONFIRMAÇÃO DE SAÍDA ---
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