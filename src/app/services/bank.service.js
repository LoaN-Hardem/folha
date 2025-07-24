// URLs para nossas fontes de dados
const BRASIL_API_URL = 'https://brasilapi.com.br/api/banks/v1';
const LOCAL_LOGOS_URL = '../../../public/api/logo.json'; // O caminho para o nosso arquivo na pasta 'public'


/**
 * Busca a lista de bancos da API real e a enriquece com as logos locais.
 * @returns {Promise<Array<Object>>} Uma Promise que resolve com a lista de bancos enriquecida.
 */
export async function getBancos() {
    try {
        // 1. Faz as duas requisições em paralelo para ganhar tempo
        const [bancosResponse, logosResponse] = await Promise.all([
            fetch(BRASIL_API_URL),
            fetch(LOCAL_LOGOS_URL)
        ]);

        // Verifica se ambas as requisições foram bem-sucedidas
        if (!bancosResponse.ok || !logosResponse.ok) {
            throw new Error('Falha ao buscar dados dos bancos ou das logos.');
        }

        // Extrai os dados JSON das respostas
        const todosOsBancos = await bancosResponse.json();
        const logosMap = await logosResponse.json();

        // 2. Filtra a lista gigante da API para incluir apenas os bancos para os quais temos uma logo
        // Isso torna a lista de seleção no formulário muito mais limpa e relevante
        const bancosComLogo = todosOsBancos.filter(banco => logosMap[banco.code]);

        // 3. Enriquecimento: Adiciona a propriedade 'logo' a cada banco filtrado
        const bancosEnriquecidos = bancosComLogo.map(banco => ({
            ...banco, // Mantém todos os dados originais da API (nome, code, ispb, etc.)
            logo: logosMap[banco.code] // Adiciona a logo do nosso mapa local
        }));

        // Ordena os bancos por nome para uma melhor experiência de usuário
        bancosEnriquecidos.sort((a, b) => a.name.localeCompare(b.name));

        return bancosEnriquecidos;

    } catch (error) {
        console.error("Não foi possível buscar e processar a lista de bancos:", error);
        return []; // Retorna uma lista vazia em caso de erro para não quebrar a aplicação
    }
}