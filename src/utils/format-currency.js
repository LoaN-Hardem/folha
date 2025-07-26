export const formatCurrency = (value) => {
    if (typeof value !== 'number') {
        value = 0;
    }
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};