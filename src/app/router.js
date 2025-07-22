// Importações
import { initLogin } from '../features/login/login.controller.js';
import { initDashboard } from '../features/dashboard/dashboard.controller.js';
import { initError } from '../features/404/error.controller.js';
import { initHomepage } from '../features/homepage/homepage.controller.js';
// (Não precisamos mais importar os sub-controladores aqui)

// Mapa de rotas estáticas e dinâmicas
const routes = {
  '/': initHomepage,
  '/login': initLogin,
  '/dashboard': initDashboard,
  // Rota dinâmica para sub-páginas do dashboard
  '/dashboard/:view': initDashboard,
  '/dashboard/:view/:id': initDashboard,
  '/error': initError,
};

/**
 * Encontra a rota correspondente e extrai os parâmetros.
 * @param {string} path - O caminho da URL atual (ex: '/dashboard/objetos/obj_123').
 * @returns {{ matchedRoute: Function|null, params: Object }}
 */
function findRoute(path) {
  for (const route in routes) {
    const routeParts = route.split('/').filter(p => p);
    const pathParts = path.split('/').filter(p => p);

    if (routeParts.length !== pathParts.length) continue;

    const params = {};
    const isMatch = routeParts.every((part, i) => {
      if (part.startsWith(':')) {
        params[part.substring(1)] = pathParts[i];
        return true;
      }
      return part === pathParts[i];
    });

    if (isMatch) {
      return { matchedRoute: routes[route], params };
    }
  }
  return { matchedRoute: null, params: {} };
}

/**
 * Ponto de entrada do roteador. É chamado no carregamento da página e na mudança de hash.
 */
export function loadRoute() {
  const path = location.hash.slice(1) || '/';
  const { matchedRoute, params } = findRoute(path);

  if (matchedRoute) {
    // Passa o caminho completo e os parâmetros para a função controladora
    matchedRoute({ path, ...params });
  } else {
    // Se nenhuma rota corresponder, vai para a página de erro
    routes['/error']();
  }
}