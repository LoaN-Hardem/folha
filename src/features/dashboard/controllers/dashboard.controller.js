import { renderDashboardView } from '../dashboard.view.js';
import { renderDashboardHomeView } from '../views/home/home.view.js';
import { initObjetos } from '../controllers/objetos.controller.js';
import { initGerenciarObjeto } from '../controllers/gerenciar-objeto.controller.js';
import { initAccounts } from '../controllers/accounts.controller.js';
import { initGerenciarConta } from '../controllers/gerenciar-conta.controller.js';
import { initSettings } from '../controllers/settings.controller.js';
import { showModal } from '../../../components/modal/modal.js';
import { getUser, saveUser } from '../../../app/storage/user.storage.js';
import { compressImage } from './objetos.controller.js';

function addDashboardLogic() {
  // Carrega os dados do usuário e atualiza a navbar
  const user = getUser();
  document.getElementById('navbar-user-name').textContent = `Olá, ${user.nome}`;
  document.getElementById('navbar-user-avatar').src = user.fotoUrl;

  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const menuToggleButton = document.getElementById('menu-toggle-btn');
  const menuToggleButtonDesktop = document.getElementById('menu-toggle-btn-desktop');

  const closeMobileMenu = () => {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  };

  // Botão de menu mobile
  menuToggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    backdrop.classList.toggle('hidden');
  });

  // Botão de menu desktop (para colapsar/expandir)
  menuToggleButtonDesktop.addEventListener('click', () => {
    sidebar.classList.toggle('w-20');
    sidebar.classList.toggle('w-64');
    document.querySelectorAll('.sidebar-text').forEach(text => {
      text.classList.toggle('opacity-0');
      setTimeout(() => text.classList.toggle('invisible'), 150);
    });
  });

  backdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMobileMenu();
    });
  });

  // --- LÓGICA DO DROPDOWN DE CONFIGURAÇÕES ---
  const settingsBtn = document.getElementById('settings-btn');
  const settingsDropdown = document.getElementById('settings-dropdown');

  settingsBtn.addEventListener('click', () => {
    settingsDropdown.classList.toggle('hidden');
  });

  // Fecha o dropdown se clicar fora
  window.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
      settingsDropdown.classList.add('hidden');
    }
  });

  // Ação para o botão "Editar Perfil"
  document.getElementById('edit-profile-btn').addEventListener('click', (e) => {
    e.preventDefault();
    settingsDropdown.classList.add('hidden');
    showProfileSettingsModal();
  });

  // Lógica de Logout (agora também no dropdown)
  const logoutBtn = document.getElementById('logout-btn');
  const logoutBtnDropdown = document.getElementById('logout-btn-dropdown');

  const showLogoutConfirm = (e) => {
    e.preventDefault();
    // 1. Capturamos a instância do modal quando o criamos
    const modal = showModal({
      title: 'Confirmar Saída',
      content: '<p>Você tem certeza que deseja encerrar a sessão?</p>',
      actions: [
        { id: 'cancel-logout', text: 'Cancelar', type: 'secondary' },
        {
          id: 'confirm-logout',
          text: 'Sair',
          type: 'danger',
          onClick: () => {
            // 2. Agora, chamamos a função para fechar o modal ANTES de navegar
            modal.closeModal();
            location.hash = '#/login';
          }
        }
      ]
    });
  };

  logoutBtn.addEventListener('click', showLogoutConfirm);
  logoutBtnDropdown.addEventListener('click', showLogoutConfirm);
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
  } else if (view === 'settings') {
    initSettings();
    currentView = 'settings';
  } else {
    renderDashboardHomeView();
    currentView = 'home';
  }

  updateActiveNavLink(currentView);
}

// Adicione estas duas funções no final de dashboard.controller.js
function showProfileSettingsModal() {
  const user = getUser();
  const contentHtml = `
        <div class="space-y-4 text-left">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                <div class="flex items-center gap-4">
                    <img id="profile-photo-preview" class="w-16 h-16 rounded-full object-cover" src="${user.fotoUrl}" alt="Preview"/>
                    <label for="profile-photo-input" class="cursor-pointer text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        Trocar foto
                    </label>
                    <input type="file" id="profile-photo-input" class="hidden" accept="image/*"/>
                </div>
            </div>
            <div>
                <label for="profile-name-input" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input type="text" id="profile-name-input" class="w-full px-4 py-3 border border-gray-300 rounded-lg" value="${user.nome}" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" class="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg" value="usuario@email.com" disabled>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg">
                    <option>Português (Brasil)</option>
                    <option disabled>English (em breve)</option>
                </select>
            </div>
        </div>
    `;

  const modal = showModal({
    title: 'Editar Perfil',
    content: contentHtml,
    actions: [
      { id: 'cancel-profile-edit', text: 'Cancelar', type: 'secondary' },
      {
        id: 'save-profile-edit', text: 'Salvar Alterações', type: 'primary',
        onClick: () => {
          handleUpdateProfile();
          modal.closeModal();
        }
      }
    ]
  });

  // Lógica de preview da foto
  const photoInput = document.getElementById('profile-photo-input');
  photoInput?.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('profile-photo-preview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

async function handleUpdateProfile() {
  const nome = document.getElementById('profile-name-input').value;
  const photoFile = document.getElementById('profile-photo-input').files[0];
  let fotoUrl = null;

  if (photoFile) {
    try {
      fotoUrl = await compressImage(photoFile);
    } catch (error) {
      console.error("Erro ao comprimir imagem de perfil:", error);
      showToast("Erro ao processar imagem.", "error");
    }
  }

  const userDataToSave = { nome };
  if (fotoUrl) {
    userDataToSave.fotoUrl = fotoUrl;
  }

  saveUser(userDataToSave);

  // Atualiza a navbar dinamicamente
  const updatedUser = getUser();
  document.getElementById('navbar-user-name').textContent = `Olá, ${updatedUser.nome}`;
  document.getElementById('navbar-user-avatar').src = updatedUser.fotoUrl;

  showToast("Perfil atualizado com sucesso!");
}