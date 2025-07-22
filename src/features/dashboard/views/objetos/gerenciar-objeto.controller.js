import { renderGerenciarObjetoView } from '../objetos/gerenciar-objeto.view.js';
import { getObjetos } from '../../../../app/storage/objetos.storage.js';

/**
 * Inicializa a página de gerenciamento de um objeto específico.
 * @param {Object} params - Parâmetros da rota, injetados pelo roteador.
 */
export function initGerenciarObjeto(params) {
    // O roteador nos dará o ID do objeto através do parâmetro 'id'
    const objetoId = params.id;

    // Busca todos os objetos e encontra o que corresponde ao ID
    const objetos = getObjetos();
    const objetoAtual = objetos.find(obj => obj.id === objetoId);

    // Renderiza a view, passando o objeto encontrado (ou null se não encontrar)
    renderGerenciarObjetoView(objetoAtual);
}