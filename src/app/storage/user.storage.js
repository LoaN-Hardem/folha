// Em: src/app/storage/user.storage.js

const USER_KEY = 'folha_user';

/**
 * Retorna os dados do usuário do LocalStorage.
 * @returns {Object} Um objeto de usuário ou um objeto padrão.
 */
export function getUser() {
    const data = localStorage.getItem(USER_KEY);
    // Retorna dados padrão se nenhum usuário for encontrado
    return data ? JSON.parse(data) : {
        nome: 'Usuário',
        fotoUrl: `https://ui-avatars.com/api/?name=Usuario&background=10B981&color=fff`
    };
}

/**
 * Salva (ou atualiza) os dados do usuário no LocalStorage.
 * @param {Object} userData - O objeto com os novos dados do usuário.
 */
export function saveUser(userData) {
    const currentUser = getUser();
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
}