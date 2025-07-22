const STORAGE_KEY = 'folha_objetos';

/**
 * Retorna todos os objetos gerenciáveis do LocalStorage.
 * @returns {Array<Object>} Uma lista de objetos ou uma lista vazia.
 */
export function getObjetos() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Salva um novo objeto gerenciável no LocalStorage.
 * @param {string} nome - O nome do objeto a ser criado.
 * @param {string|null} fotoUrl - A URL da foto em Base64, ou null.
 */
export function saveObjeto(nome, fotoUrl = null) {
    const objetos = getObjetos();

    const novoObjeto = {
        id: `obj_${new Date().getTime()}`,
        nome: nome,
        fotoUrl: fotoUrl, // Salva a URL da foto
        contas: [],
        criadoEm: new Date().toISOString()
    };

    objetos.push(novoObjeto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objetos));
}

/**
 * Exclui um objeto gerenciável do LocalStorage pelo seu ID.
 * @param {string} objetoId - O ID do objeto a ser excluído.
 */
export function deleteObjeto(objetoId) {
    let objetos = getObjetos();
    objetos = objetos.filter(objeto => objeto.id !== objetoId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objetos));
}