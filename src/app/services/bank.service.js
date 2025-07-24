const BRASIL_API_URL = 'https://brasilapi.com.br/api/banks/v1';
const LOCAL_LOGOS_URL = '/api/logo.json';

// --- NOSSA "LISTA VIP" DE BANCOS PRINCIPAIS ---
// Apenas os bancos cujos códigos estão nesta lista serão exibidos.
const BANCOS_PRINCIPAIS_CODES = [
    '001', // Banco do Brasil
    '033', // Santander
    '077', // Inter
    '102', // XP Investimentos
    '104', // Caixa Econômica Federal
    '208', // BTG Pactual
    '237', // Bradesco
    '260', // Nubank
    '290', // PagBank
    '336', // C6 Bank
    '341', // Itaú
    '422', // Safra
    '735', // Neon
    '746', // Modalmais
];

/**
 * Busca a lista de bancos da API, filtra para os mais relevantes e enriquece com logos.
 * @returns {Promise<Array<Object>>} Uma Promise que resolve com a lista de bancos curada.
 */
export async function getBancos() {
    try {
        const [bancosResponse, logosResponse] = await Promise.all([
            fetch(BRASIL_API_URL),
            fetch(LOCAL_LOGOS_URL)
        ]);

        if (!bancosResponse.ok || !logosResponse.ok) {
            throw new Error('Falha ao buscar dados dos bancos ou das logos.');
        }

        const todosOsBancos = await bancosResponse.json();
        const logosMap = await logosResponse.json();

        // --- NOVA LÓGICA DE CURADORIA ---
        // 1. Filtra a lista da API para manter apenas os bancos da nossa "lista VIP".
        const bancosPrincipais = todosOsBancos.filter(banco =>
            BANCOS_PRINCIPAIS_CODES.includes(banco.code)
        );

        // 2. Enriquecimento: Adiciona a propriedade 'logo' a cada banco da nossa lista.
        const bancosEnriquecidos = bancosPrincipais.map(banco => ({
            ...banco,
            logo: logosMap[banco.code] || null
        }));

        // 3. Ordena a lista final por nome.
        bancosEnriquecidos.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        return bancosEnriquecidos;

    } catch (error) {
        console.error("Não foi possível buscar e processar a lista de bancos:", error);
        return []; // Retorna uma lista vazia em caso de erro.
    }
}