import { loadRoute } from './router.js';

window.addEventListener('DOMContentLoaded', loadRoute); // inicial
window.addEventListener('hashchange', loadRoute);       // navegação dinâmica
