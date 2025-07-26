// Importações
import { initHomepage } from '../features/homepage/homepage.controller.js';
import { initLogin } from '../features/login/login.controller.js';
import { initDashboard } from '../features/dashboard/controllers/dashboard.controller.js';
import { initError } from '../features/404/error.controller.js';

// Mapa de rotas que o roteador vai usar
const routes = {
  '/': initHomepage,
  '/login': initLogin,
  '/dashboard': initDashboard,
  // Rota para as "views" do dashboard (ex: /dashboard/objetos)
  '/dashboard/:view': initDashboard,
  // Rota para uma view específica com um ID (ex: /dashboard/objetos/obj_123)
  '/dashboard/:view/:id': initDashboard,
  '/error': initError,
};

/**
 * Encontra a rota correspondente na lista e extrai os parâmetros da URL.
 * @param {string} path - O caminho da URL atual.
 * @returns {{ matchedController: Function|null, params: Object }}
 */
function findMatchingRoute(path) {
  for (const routePattern in routes) {
    const routeParts = routePattern.split('/').filter(p => p);
    const pathParts = path.split('/').filter(p => p);

    if (routeParts.length !== pathParts.length) {
      continue;
    }

    const params = {};
    const isMatch = routeParts.every((part, i) => {
      if (part.startsWith(':')) {
        params[part.substring(1)] = pathParts[i];
        return true;
      }
      return part === pathParts[i];
    });

    if (isMatch) {
      return { matchedController: routes[routePattern], params };
    }
  }
  return { matchedController: null, params: {} };
}

/**
 * Ponto de entrada principal do roteador.
 */
export function loadRoute() {
  const path = location.hash.slice(1) || '/';
  const { matchedController, params } = findMatchingRoute(path);

  if (matchedController) {
    // Chama o controlador encontrado, passando os parâmetros da URL
    matchedController({ path, ...params });
  } else {
    // Se nenhuma rota corresponder, vai para a página de erro
    routes['/error']();
  }
}