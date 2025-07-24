const BRASIL_API_URL = 'https://brasilapi.com.br/api/banks/v1';
const LOCAL_LOGOS_URL = '/api/logo.json';

// --- NOVA LÓGICA: LISTA DE EXCLUSÃO ---
// Instituições cujos nomes contêm estas palavras geralmente não são
// o que o usuário procura como "banco" principal.
const PALAVRAS_PARA_EXCLUIR = [
    'S.A. CFI', // S.A. Crédito, Financiamento e Investimento
    'S.A. SCFI',
    'DTVM',     // Distribuidora de Títulos e Valores Mobiliários
    'S.A. C.I.',
    'S.A. DE CREDITO',
    'SCC',      // Sociedade de Crédito ao Microempreendedor
    'SCD',      // Sociedade de Crédito Direto
    'SEFISA',
    'PAGAMENTO S.A',
    'FINANCEIRA'
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

        // --- NOVA LÓGICA DE FILTRAGEM ---
        const bancosFiltrados = todosOsBancos.filter(banco => {
            // Condição 1: O banco precisa ter um nome.
            if (!banco.name) {
                return false;
            }

            const nomeEmMaiusculo = banco.name.toUpperCase();

            // Condição 2: O nome do banco NÃO PODE conter nenhuma das palavras da nossa lista de exclusão.
            // O método .some() verifica se pelo menos um item na lista de exclusão satisfaz a condição.
            const contemPalavraExcluida = PALAVRAS_PARA_EXCLUIR.some(palavra => nomeEmMaiusculo.includes(palavra));

            return !contemPalavraExcluida; // Retorna true apenas se NÃO contiver nenhuma palavra proibida.
        });

        const bancosEnriquecidos = bancosFiltrados.map(banco => ({
            ...banco,
            logo: logosMap[banco.code] || null
        }));

        bancosEnriquecidos.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        return bancosEnriquecidos;

    } catch (error) {
        console.error("Não foi possível buscar e processar a lista de bancos:", error);
        return [];
    }
}