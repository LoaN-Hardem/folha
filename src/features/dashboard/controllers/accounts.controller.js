import { getObjetos, addConta } from '../../../app/storage/objetos.storage.js';
import { renderAccountsView } from '../views/accounts/accounts.view.js';
import { getBancos } from '../../../app/services/bank.service.js'; // Importa nosso serviço de bancos
import { showModal } from '../../../components/Modal/Modal.js'; // Importa nosso modal reutilizável

/**
 * Inicializa a página de Contas.
 */
export function initAccounts() {
    const objetos = getObjetos();
    renderAccountsView(objetos);
    addEventListeners();
}

function addEventListeners() {
    document.getElementById('add-account-btn')?.addEventListener('click', showAddAccountModal);
}

/**
 * Busca os dados necessários e exibe o modal para adicionar uma nova conta.
 * @param {string|null} selectedObjetoId - O ID do objeto que deve vir pré-selecionado.
 */
export async function showAddAccountModal(selectedObjetoId = null) {
    // Busca os dados em paralelo para mais eficiência
    const [objetos, bancos] = await Promise.all([
        getObjetos(),
        getBancos()
    ]);

    if (objetos.length === 0) {
        showModal({ title: 'Aviso', content: '<p>Você precisa criar um Objeto Gerenciável antes de poder adicionar uma conta.</p>', actions: [{ id: 'ok-btn', text: 'Entendi', type: 'primary' }] });
        return;
    }

    // Gera as opções para os <select>s
    const objetosOptions = objetos.map(obj => `<option value="${obj.id}" ${obj.id === selectedObjetoId ? 'selected' : ''}>${obj.nome}</option>`).join('');
    const bancosOptions = bancos.map(banco => `<option value="${banco.name}">${banco.name}</option>`).join('');

    const contentHtml = `
    <div class="space-y-4 text-left">
      <div>
        <label for="objeto-select" class="block text-sm font-medium text-gray-700 mb-1">Objeto Gerenciável</label>
        <select id="objeto-select" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" ${selectedObjetoId ? 'disabled' : ''}>
          ${objetosOptions}
        </select>
      </div>

      <div>
        <label for="instituicao-select" class="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
        <select id="instituicao-select" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Selecione um banco...</option>
          ${bancosOptions}
        </select>
      </div>

      <div>
        <label for="conta-nome-input" class="block text-sm font-medium text-gray-700 mb-1">Nome da Conta</label>
        <input type="text" id="conta-nome-input" class="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Ex: Conta Corrente, Poupança">
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
    </div>
  `;

    const modal = showModal({
        title: 'Adicionar Nova Conta',
        content: contentHtml,
        actions: [
            { id: 'cancel-add-account', text: 'Cancelar', type: 'secondary' },
            {
                id: 'save-add-account', text: 'Salvar Conta', type: 'primary', onClick: () => {
                    // Coleta dos dados do formulário
                    const objetoId = document.getElementById('objeto-select').value;
                    const dadosConta = {
                        instituicao: document.getElementById('instituicao-select').value,
                        nome: document.getElementById('conta-nome-input').value.trim(),
                        saldo: parseFloat(document.getElementById('saldo-inicial-input').value) || 0,
                        tipo: document.getElementById('tipo-conta-select').value,
                    };

                    // Validação simples
                    if (!dadosConta.instituicao || !dadosConta.nome) {
                        alert('Por favor, preencha a Instituição e o Nome da Conta.');
                        return;
                    }

                    addConta(objetoId, dadosConta);
                    modal.closeModal();
                    initAccounts(); // Atualiza a lista de contas na tela
                }
            }
        ]
    });
}