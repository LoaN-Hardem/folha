// Importe o novo controller da homepage
import { initHomepage } from '../features/homepage/homepage.controller.js';
import { initLogin } from '../features/login/login.controller.js';
import { initDashboard } from '../features/dashboard/dashboard.controller.js';
import { initError } from '../features/404/error.controller.js';
// futuramente: import { initDashboard } from './features/dashboard/dashboard.controller.js';

export function loadRoute() {
  const hash = window.location.hash || '#/';

  const app = document.getElementById('app');
  app.innerHTML = '';

  switch (hash) {
    // A rota raiz agora carrega a homepage
    case '#/':
      initHomepage();
      break;

    // A rota de login permanece a mesma
    case '#/login':
      initLogin();
      break;

    case '#/dashboard':
      initDashboard();
      break;

    default:
      initError();
  }
}
