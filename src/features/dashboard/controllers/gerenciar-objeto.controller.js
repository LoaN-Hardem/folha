// Em: src/features/dashboard/controllers/gerenciar-objeto.controller.js

import { renderGerenciarObjetoView } from '../views/objetos/gerenciar-objeto.view.js';
import { getObjetos, updateObject } from '../../../app/storage/objetos.storage.js';
import { showAddAccountModal } from './accounts.controller.js';
import { compressImage } from './objetos.controller.js';
import { showToast } from '../../../components/toast/toast.js';

// Variáveis de estado
let currentObjeto;

// Cores pré-definidas para o tema
const themeColors = [
    { name: 'Padrão', color: '#F9FAFB' },
    { name: 'Azul Gelo', color: '#EFF6FF' },
    { name: 'Verde Menta', color: '#F0FDF4' },
    { name: 'Pêssego', color: '#FFF7ED' },
    { name: 'Lavanda', color: '#F5F3FF' },
];

export function initGerenciarObjeto(params) {
    const objetoId = params.id;
    const objetos = getObjetos();
    currentObjeto = objetos.find(obj => obj.id === objetoId);

    if (!currentObjeto) {
        renderGerenciarObjetoView(null, 0);
        return;
    }

    // Simula dados se necessário (seu código original)
    if (!currentObjeto.contas) currentObjeto.contas = [];

    const saldoTotal = currentObjeto.contas.reduce((acc, conta) => acc + conta.saldo, 0);
    renderGerenciarObjetoView(currentObjeto, saldoTotal);
    addEventListeners();
}

function addEventListeners() {
    // Listeners antigos
    const addAccountBtn = document.querySelector('.lg\\:col-span-1 button');
    addAccountBtn?.addEventListener('click', () => showAddAccountModal(currentObjeto));

    // Listeners para o painel de configurações
    const settingsPanel = document.getElementById('settings-panel');
    document.getElementById('open-settings-panel-btn')?.addEventListener('click', () => {
        populateSettingsPanel();
        settingsPanel.classList.remove('translate-x-full');
    });
    document.getElementById('close-settings-panel-btn')?.addEventListener('click', () => {
        settingsPanel.classList.add('translate-x-full');
    });
    document.getElementById('save-settings-btn')?.addEventListener('click', handleUpdateObjectSettings);
}

function populateSettingsPanel() {
    // Lógica de preview da foto
    document.getElementById('settings-photo-input')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('settings-photo-preview').src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Popula as amostras de cores
    const swatchesContainer = document.getElementById('color-swatches');
    swatchesContainer.innerHTML = themeColors.map(theme => `
        <button data-color="${theme.color}" title="${theme.name}" class="w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${currentObjeto.themeColor === theme.color ? 'ring-2 ring-offset-2 ring-indigo-500' : 'border-gray-200'}" style="background-color: ${theme.color};"></button>
    `).join('');

    // Adiciona listeners para a seleção de cor
    swatchesContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove anel de seleção de todos
            swatchesContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('ring-2', 'ring-offset-2', 'ring-indigo-500'));
            // Adiciona anel no clicado
            e.currentTarget.classList.add('ring-2', 'ring-offset-2', 'ring-indigo-500');
        });
    });
}

async function handleUpdateObjectSettings() {
    const newName = document.getElementById('settings-name-input').value;
    const photoFile = document.getElementById('settings-photo-input').files[0];
    const selectedColorEl = document.querySelector('#color-swatches button.ring-2');
    const newColor = selectedColorEl ? selectedColorEl.dataset.color : currentObjeto.themeColor;

    // Atualiza o objeto
    currentObjeto.nome = newName;
    currentObjeto.themeColor = newColor;

    if (photoFile) {
        try {
            const fotoUrl = await compressImage(photoFile);
            currentObjeto.fotoUrl = fotoUrl;
        } catch (error) {
            console.error("Erro ao comprimir imagem:", error);
            showToast("Erro ao processar imagem.", "error");
        }
    }

    updateObject(currentObjeto.id, currentObjeto);

    // Atualiza a UI dinamicamente
    document.getElementById('objeto-name-header').textContent = currentObjeto.nome;
    document.getElementById('dashboard-content').style.backgroundColor = currentObjeto.themeColor;
    const avatarContainer = document.getElementById('objeto-avatar-container');
    avatarContainer.innerHTML = currentObjeto.fotoUrl
        ? `<img src="${currentObjeto.fotoUrl}" class="w-16 h-16 rounded-full object-cover">`
        : `<div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">${currentObjeto.nome.substring(0, 2).toUpperCase()}</div>`;

    // Fecha o painel e mostra confirmação
    document.getElementById('settings-panel').classList.add('translate-x-full');
    showToast("Objeto atualizado com sucesso!");
}