import { getObjetos, addConta } from '../../../app/storage/objetos.storage.js';
import { renderAccountsView } from '../views/accounts/accounts.view.js';
import { getBancos } from '../../../app/services/bank.service.js';
import { showModal } from '../../../components/Modal/Modal.js';
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
    const objetosOptions = objetos.map(obj => `<option value="${obj.id}">${obj.nome}</option>`).join('');
    objetoSelectorHtml = `
            <div>
                <label for="objeto-select" class="block text-sm font-medium text-gray-700 mb-1">Objeto Gerenciável</label>
                <select id="objeto-select" class="w-full px-4 py-3 border border-gray-300 rounded-lg">${objetosOptions}</select>
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
          let objetoId;
          const objetoSelect = document.getElementById('objeto-select');
          if (objetoSelect) {
            objetoId = objetoSelect.value;
          } else {
            const objetoStatic = document.querySelector('[data-objeto-id]');
            objetoId = objetoStatic.dataset.objetoId;
          }

          const dadosConta = {
            instituicao: document.getElementById('instituicao-filtro').value,
            agencia: document.getElementById('agencia-input').value.trim(),
            numero: document.getElementById('conta-numero-input').value.trim(),
            saldo: parseFloat(document.getElementById('saldo-inicial-input').value) || 0,
            tipo: document.getElementById('tipo-conta-select').value,
          };

          if (!dadosConta.instituicao || !dadosConta.numero) {
            alert('Por favor, selecione uma Instituição e preencha o Número da Conta.');
            return;
          }

          addConta(objetoId, dadosConta);
          modal.closeModal();

          if (location.hash.includes('/objetos/')) {
            initGerenciarObjeto({ id: objetoId });
          } else {
            initAccounts();
          }
        }
      }
    ]
  });

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
      dropdown.classList.add('hidden');
    }
  }, { capture: true });
}