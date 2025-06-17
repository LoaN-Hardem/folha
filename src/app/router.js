import { initLogin } from '../features/login/login.controller.js';
import { initError } from '../features/404/error.controller.js';
// futuramente: import { initDashboard } from './features/dashboard/dashboard.controller.js';

export function loadRoute() {
  const hash = window.location.hash || '#/';

  const app = document.getElementById('app');
  app.innerHTML = '';

  switch (hash) {
    case '#/':
    case '#/login':
      initLogin();
      break;

    // case '#/dashboard':
    //   initDashboard();
    //   break;

    default:
      initError();

  }
}
