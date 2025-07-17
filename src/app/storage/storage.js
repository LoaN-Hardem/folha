// Exemplo em um novo arquivo: src/app/storage.js
export function getTransacoes() {
    // Retorna um array de transações ou um array vazio
    return JSON.parse(localStorage.getItem('transacoes')) || [];
}

export function getUltimaConta() {
    // Retorna a string da última conta ou um valor padrão
    return localStorage.getItem('ultimaConta') || 'Nenhuma conta gerenciada';
}


// Continuando em src/app/storage.js
export function calcularMetricas() {
    const transacoes = getTransacoes();

    const totalReceitas = transacoes
        .filter(t => t.tipo === 'receita')
        .reduce((acc, t) => acc + t.valor, 0);

    const totalDespesas = transacoes
        .filter(t => t.tipo === 'despesa')
        .reduce((acc, t) => acc + t.valor, 0);

    const saldoAtual = totalReceitas - totalDespesas;

    const ultimasTransacoes = transacoes.slice(-3).reverse(); // Pega as 3 últimas

    return {
        totalReceitas,
        totalDespesas,
        saldoAtual,
        ultimasTransacoes
    };
}