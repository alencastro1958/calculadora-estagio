# Calculadora de Rescisão de Estágio

Aplicação web estática para calcular verbas rescisórias de estágio com base na Lei nº 11.788/2008. O projeto é composto apenas por arquivos HTML, CSS e JavaScript, sem dependências de build.

## Como usar localmente

Como o projeto é estático, você pode:

1. Abrir o arquivo `index.html` diretamente no navegador; ou
2. Servir os arquivos com um servidor HTTP simples.

Exemplo com Python:

```bash
cd calculadora-estagio
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Estrutura do projeto

```text
.
├── .github/workflows/deploy-pages.yml
├── css/style.css
├── js/app.js
├── index.html
└── README.md
```

- `index.html`: interface principal da calculadora.
- `css/style.css`: estilos da página.
- `js/app.js`: regras de cálculo e interação do formulário.
- `.github/workflows/deploy-pages.yml`: fluxo de publicação automática no GitHub Pages.

## Publicação automática com GitHub Pages

O repositório está preparado para publicar o site usando o fluxo recomendado do GitHub Pages com GitHub Actions.

### Como funciona o deploy

- O workflow `.github/workflows/deploy-pages.yml` é executado a cada push na branch `main`.
- O job configura o GitHub Pages, empacota o conteúdo estático do repositório e faz o deploy automaticamente.
- Também é possível disparar o workflow manualmente via **Actions > Deploy static site to GitHub Pages**.

### Configuração necessária no GitHub

No repositório, confirme em **Settings > Pages** que a fonte de publicação está configurada para **GitHub Actions**.

Depois disso, cada novo push na `main` atualiza o site publicado automaticamente.

## Conteúdo publicado

Como este projeto é um site estático simples, o deploy envia os arquivos atuais do repositório (HTML, CSS e JavaScript) sem etapa de build adicional.
