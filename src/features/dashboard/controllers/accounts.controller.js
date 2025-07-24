import { getObjetos, addConta } from '../../../app/storage/objetos.storage.js';
import { renderAccountsView } from '../views/accounts/accounts.view.js';
import { getBancos } from '../../../app/services/bank.service.js';
import { showModal } from '../../../components/modal/modal.js';
import { initGerenciarObjeto } from './gerenciar-objeto.controller.js';

export function initAccounts() {
  const objetos = getObjetos();
  renderAccountsView(objetos);
  addEventListeners();
}

function addEventListeners() {
  document.getElementById('add-account-btn')?.addEventListener('click', () => showAddAccountModal(null));
}

export async function showAddAccountModal(selectedObjeto = null) {
  const [objetos, bancos] = await Promise.all([getObjetos(), getBancos()]);

  if (objetos.length === 0) {
    showModal({ title: 'Aviso', content: '<p>Você precisa criar um Objeto Gerenciável antes de poder adicionar uma conta.</p>', actions: [{ id: 'ok-btn', text: 'Entendi', type: 'primary' }] });
    return;
  }

  // Variável para armazenar o ID do objeto selecionado
  let selectedObjetoId = selectedObjeto ? selectedObjeto.id : null;

  let objetoSelectorHtml;
  if (selectedObjeto) {
    const avatar = selectedObjeto.fotoUrl
      ? `<img src="${selectedObjeto.fotoUrl}" class="w-10 h-10 rounded-full object-cover">`
      : `<div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">${selectedObjeto.nome.substring(0, 2).toUpperCase()}</div>`;
    objetoSelectorHtml = `
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Objeto Gerenciável</label>
                <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50" data-objeto-id="${selectedObjeto.id}">
                    ${avatar}
                    <span class="font-bold text-gray-800">${selectedObjeto.nome}</span>
                </div>
            </div>`;
  } else {
    objetoSelectorHtml = `
            <div class="relative">
                <label for="objeto-filtro" class="block text-sm font-medium text-gray-700 mb-1">Objeto Gerenciável</label>
                <input type="text" id="objeto-filtro" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Selecione ou digite para buscar..." autocomplete="off">
                <input type="hidden" id="objeto-id-hidden">
                <div id="objetos-dropdown" class="hidden absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"></div>
            </div>`;
  }

  const contentHtml = `
    <div class="space-y-4 text-left">
        ${objetoSelectorHtml}
        <div class="relative">
            <label for="instituicao-filtro" class="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
            <input type="text" id="instituicao-filtro" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Selecione ou digite para buscar...">
            <div id="bancos-dropdown" class="hidden absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"></div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="agencia-input" class="block text-sm font-medium text-gray-700 mb-1">Nº da Agência</label>
                <input type="text" id="agencia-input" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Ex: 0001">
            </div>
            <div>
                <label for="conta-numero-input" class="block text-sm font-medium text-gray-700 mb-1">Nº da Conta</label>
                <input type="text" id="conta-numero-input" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Ex: 12345-6">
            </div>
        </div>
        <div>
            <label for="saldo-inicial-input" class="block text-sm font-medium text-gray-700 mb-1">Saldo Inicial</label>
            <input type="number" id="saldo-inicial-input" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="R$ 0,00" value="0">
        </div>
        <div>
            <label for="tipo-conta-select" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Conta</label>
            <select id="tipo-conta-select" class="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="corrente">Conta Corrente</option>
                <option value="poupanca">Poupança</option>
                <option value="investimento">Investimento</option>
                <option value="cartao_credito">Cartão de Crédito</option>
            </select>
        </div>
    </div>`;

  const modal = showModal({
    title: 'Adicionar Nova Conta',
    content: contentHtml,
    actions: [
      { id: 'cancel-add-account', text: 'Cancelar', type: 'secondary' },
      {
        id: 'save-add-account', text: 'Salvar Conta', type: 'primary', onClick: () => {
          // Usamos a variável selectedObjetoId que está no escopo da função
          if (!selectedObjetoId) {
            // Tenta obter do campo oculto se ainda estiver disponível
            const objetoHiddenInput = document.getElementById('objeto-id-hidden');
            if (objetoHiddenInput && objetoHiddenInput.value) {
              selectedObjetoId = objetoHiddenInput.value;
            }
          }

          if (!selectedObjetoId) {
            alert('Por favor, selecione um Objeto Gerenciável.');
            return;
          }

          const dadosConta = {
            instituicao: document.getElementById('instituicao-filtro').value,
            agencia: document.getElementById('agencia-input').value.trim(),
            nome: document.getElementById('instituicao-filtro').value.trim() || 'Nova Conta',
            numero: document.getElementById('conta-numero-input').value.trim(),
            saldo: parseFloat(document.getElementById('saldo-inicial-input').value) || 0,
            tipo: document.getElementById('tipo-conta-select').value,
          };

          if (!dadosConta.instituicao || !dadosConta.numero) {
            alert('Por favor, selecione uma Instituição e preencha o Número da Conta.');
            return;
          }

          addConta(selectedObjetoId, dadosConta);
          modal.closeModal();

          if (location.hash.includes('/objetos/')) {
            initGerenciarObjeto({ id: selectedObjetoId });
          } else {
            initAccounts();
          }
        }
      }
    ]
  });

  // --- LÓGICA PARA DROPDOWNS ---
  const objetoFiltroInput = document.getElementById('objeto-filtro');
  const objetosDropdown = document.getElementById('objetos-dropdown');
  if (objetoFiltroInput && objetosDropdown) {
    const renderObjetoOptions = (listaObjetos) => {
      if (listaObjetos.length === 0) {
        objetosDropdown.innerHTML = `<div class="p-4 text-sm text-gray-500">Nenhum objeto encontrado.</div>`;
        return;
      }
      objetosDropdown.innerHTML = listaObjetos.map(obj => {
        const avatar = obj.fotoUrl
          ? `<img src="${obj.fotoUrl}" class="w-8 h-8 rounded-full object-cover">`
          : `<div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">${obj.nome.substring(0, 2).toUpperCase()}</div>`;
        return `<div class="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer" data-objeto-id="${obj.id}" data-objeto-name="${obj.nome}">${avatar}<span class="text-gray-700">${obj.nome}</span></div>`;
      }).join('');
    };

    objetoFiltroInput.addEventListener('focus', () => {
      renderObjetoOptions(objetos);
      objetosDropdown.classList.remove('hidden');
    });

    objetoFiltroInput.addEventListener('input', (e) => {
      const termo = e.target.value.toLowerCase();
      const objetosFiltrados = objetos.filter(obj => obj.nome.toLowerCase().includes(termo));
      renderObjetoOptions(objetosFiltrados);
    });

    objetosDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('[data-objeto-id]');
      if (item) {
        objetoFiltroInput.value = item.dataset.objetoName;
        document.getElementById('objeto-id-hidden').value = item.dataset.objetoId;

        // Atualiza a variável com o ID selecionado
        selectedObjetoId = item.dataset.objetoId;

        objetosDropdown.classList.add('hidden');
      }
    });
  }

  const filtroInput = document.getElementById('instituicao-filtro');
  const dropdown = document.getElementById('bancos-dropdown');

  const renderDropdownOptions = (listaBancos) => {
    if (listaBancos.length === 0) {
      dropdown.innerHTML = `<div class="p-4 text-sm text-gray-500">Nenhum banco encontrado.</div>`;
      return;
    }
    dropdown.innerHTML = listaBancos.map(banco => {
      const avatar = banco.logo
        ? `<img src="${banco.logo}" class="w-8 h-8 object-contain" alt="${banco.name}">`
        : `<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">${(banco.name || '').split(' ').map(n => n[0]).slice(0, 2).join('')}</div>`;
      return `<div class="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer" data-banco-name="${banco.name}">${avatar}<span class="text-gray-700">${banco.name}</span></div>`;
    }).join('');
  };

  filtroInput.addEventListener('focus', () => {
    renderDropdownOptions(bancos);
    dropdown.classList.remove('hidden');
  });

  filtroInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const bancosFiltrados = bancos.filter(banco => (banco.name || '').toLowerCase().includes(termo));
    renderDropdownOptions(bancosFiltrados);
  });

  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('[data-banco-name]');
    if (item) {
      filtroInput.value = item.dataset.bancoName;
      dropdown.classList.add('hidden');
    }
  });

  document.addEventListener('click', (e) => {
    const modalContent = document.querySelector('#reusable-modal > div');
    if (modalContent && !modalContent.contains(e.target)) {
      objetosDropdown?.classList.add('hidden');
      dropdown?.classList.add('hidden');
    }
  }, { capture: true });
}