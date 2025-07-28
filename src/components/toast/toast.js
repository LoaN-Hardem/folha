// Em: src/components/toast/toast.js

/**
 * Exibe uma notificação toast na tela.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} [type='success'] - O tipo de toast ('success' ou 'error').
 */
export function showToast(message, type = 'success') {
    // Define as cores com base no tipo
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';
    const icon = isSuccess
        ? `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
        : `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

    // Cria o elemento do toast
    const toastElement = document.createElement('div');
    toastElement.className = `fixed bottom-5 right-5 flex items-center p-4 rounded-lg text-white shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 ease-out z-50 ${bgColor}`;
    toastElement.innerHTML = `
    <div class="mr-3">${icon}</div>
    <p class="font-semibold">${message}</p>
  `;

    // Adiciona o toast ao corpo do documento
    document.body.appendChild(toastElement);

    // Animação de entrada
    setTimeout(() => {
        toastElement.classList.remove('translate-y-20', 'opacity-0');
        toastElement.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    // Animação de saída e remoção do elemento
    setTimeout(() => {
        toastElement.classList.remove('translate-y-0', 'opacity-100');
        toastElement.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => {
            document.body.removeChild(toastElement);
        }, 300);
    }, 3000); // O toast fica visível por 3 segundos
}