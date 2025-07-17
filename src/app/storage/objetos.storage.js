/**
 * Onde os objetos gerenciáveis são armazenados no LocalStorage.
 * @type {string}
 */
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
 */
export function saveObjeto(nome) {
    const objetos = getObjetos();

    const novoObjeto = {
        id: `obj_${new Date().getTime()}`, // Gera um ID único baseado no timestamp
        nome: nome,
        contas: [], // Lista de contas começa vazia
        criadoEm: new Date().toISOString()
    };

    objetos.push(novoObjeto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objetos));
}