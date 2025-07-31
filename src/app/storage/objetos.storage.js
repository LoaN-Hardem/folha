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
        criadoEm: new Date().toISOString(),
        themeColor: '#F9FAFB'
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


/**
 * Adiciona uma nova conta a um objeto gerenciável específico.
 * @param {string} objetoId - O ID do objeto ao qual a conta será adicionada.
 * @param {Object} dadosConta - Os dados da nova conta.
 */
export function addConta(objetoId, dadosConta) {
    const objetos = getObjetos();
    const objetoIndex = objetos.findIndex(obj => obj.id === objetoId);

    if (objetoIndex === -1) {
        console.error("Objeto não encontrado para adicionar a conta.");
        return;
    }

    // Garante que o array de contas exista
    if (!objetos[objetoIndex].contas) {
        objetos[objetoIndex].contas = [];
    }

    // Cria a nova conta com um ID único
    const novaConta = {
        id: `cta_${new Date().getTime()}`,
        ...dadosConta
    };

    objetos[objetoIndex].contas.push(novaConta);
    localStorage.setItem('folha_objetos', JSON.stringify(objetos));
}

/**
 * Atualiza um objeto existente no LocalStorage.
 * @param {string} objetoId - O ID do objeto a ser atualizado.
 * @param {Object} objetoAtualizado - O objeto com os dados modificados.
 */
export function updateObject(objetoId, objetoAtualizado) {
    const objetos = getObjetos();
    const index = objetos.findIndex(obj => obj.id === objetoId);

    if (index !== -1) {
        objetos[index] = objetoAtualizado;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(objetos));
    } else {
        console.error("Objeto não encontrado para atualização.");
    }
}