# Folha 🍃: Plataforma de Finanças

![Badge de Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellowgreen)
![Badge de Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)

## Sobre o Projeto

**Folha** é uma plataforma de finanças desenvolvida como um projeto de portfólio, com o objetivo de aplicar e testar conceitos modernos de desenvolvimento web. A aplicação foi criada para servir como uma base sólida e escalável para futuras aplicações completas, demonstrando performance, modularidade e uma experiência de usuário dinâmica.

Construída com as tecnologias mais atuais do front-end, a plataforma foi projetada com foco em **rapidez**, **organização modular** e **dinamismo**. Toda a navegação é gerenciada por um sistema de rotas customizado (`router.js`), permitindo uma experiência de Single-Page Application (SPA) fluida e sem recarregamentos de página.

Um dos diferenciais do projeto é a sua independência de um back-end. Todos os dados do usuário — como transações, saldos e configurações — são armazenados de forma segura e persistente no **LocalStorage** do navegador. Isso garante que as informações permaneçam salvas mesmo após o fechamento da aba ou do navegador, tornando a plataforma leve, funcional e ideal para simular o uso real de uma ferramenta de controle financeiro.

A ideia principal por trás do **Folha** é unir performance com simplicidade, em uma interface amigável que representa bem os fundamentos de uma aplicação de finanças moderna.

## ✨ Funcionalidades Principais

* **Dashboard Intuitivo:** Visualização clara do saldo atual, receitas e despesas.
* **Gerenciamento de Transações:** Adicione, edite ou remova transações de entrada e saída com facilidade.
* **Persistência de Dados:** Suas informações financeiras são salvas localmente no navegador, garantindo que você não perca seus dados.
* **Navegação Rápida (SPA):** Transições de página instantâneas graças ao roteador customizado, que carrega o conteúdo dinamicamente sem a necessidade de atualizar a página.
* **Design Responsivo:** Interface adaptada para uma experiência de uso agradável tanto em desktops quanto em dispositivos móveis.
* **Leve e Performático:** Construído para ser rápido, sem a necessidade de um servidor ou banco de dados externo.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

* **HTML5:** Para a estruturação semântica do conteúdo.
* **CSS3:** Para a estilização. O projeto utiliza CSS puro com uma organização modular, incluindo variáveis e estilos globais.
* **JavaScript (ES6+):** Para toda a lógica da aplicação, manipulação do DOM e interatividade.
* **Vite:** Como *bundler* de desenvolvimento. O Vite oferece um ambiente de desenvolvimento extremamente rápido com *Hot Module Replacement (HMR)*, otimizando o fluxo de trabalho.
* **LocalStorage API:** Para o armazenamento local dos dados do usuário, simulando um banco de dados no lado do cliente.
* **Roteador Customizado (router.js):** Um sistema de roteamento próprio, desenvolvido em JavaScript puro, para gerenciar as "páginas" da aplicação de forma dinâmica e eficiente.

## 📂 Estrutura do Projeto

O projeto é organizado de forma modular, separando a lógica da aplicação (`app`), as funcionalidades de cada página (`features`) e os estilos (`styles`), facilitando a manutenção e escalabilidade.

```
/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── app.js             # Lógica central da aplicação
│   │   ├── main.js            # Ponto de entrada do JS
│   │   └── router.js          # Sistema de roteamento
│   ├── features/              # Módulos de cada página (MVC-like)
│   │   ├── 404/
│   │   │   ├── error.controller.js
│   │   │   └── error.view.js
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.js
│   │   │   └── dashboard.view.js
│   │   ├── homepage/
│   │   └── login/
│   │       ├── login.controller.js
│   │       └── login.view.js
│   ├── img/                   # Assets de imagem
│   │   ├── icons/
│   │   ├── image/
│   │   └── logos/
│   └── styles/                # Arquivos de estilização
│       ├── modules-css/
│       ├── global.css
│       └── variable.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── vite.config.ts             # Configuração do Vite
```

## ⚙️ Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

**1. Clone o repositório:**
```bash
git clone [https://github.com/seu-usuario/folha.git](https://github.com/seu-usuario/folha.git)
```

**2. Acesse a pasta do projeto:**
```bash
cd folha
```

**3. Instale as dependências:**
Utilizando `npm`:
```bash
npm install
```
Ou utilizando `yarn`:
```bash
yarn
```

**4. Execute o servidor de desenvolvimento:**
```bash
npm run dev
```
Ou
```bash
yarn dev
```

**5. Abra o navegador:**
Acesse `http://localhost:5173` (ou a porta indicada no terminal) para visualizar a aplicação.

## 🛠️ Comandos Disponíveis

* `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento com Vite.
* `npm run build` ou `yarn build`: Gera a versão de produção otimizada na pasta `dist/`.
* `npm run preview` ou `yarn preview`: Inicia um servidor local para visualizar a versão de produção.

---
Feito com ❤️ por [Seu Nome] 👋 [Link para seu LinkedIn ou outra rede social]