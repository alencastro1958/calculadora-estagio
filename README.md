# Calculadora de Rescisão de Estágio

Aplicação web estática para calcular verbas rescisórias de estágio com base na Lei nº 11.788/2008. O projeto é composto apenas por arquivos HTML, CSS e JavaScript, sem dependências de build.

## Funcionalidades

- Cálculo de bolsa proporcional no último mês.
- Cálculo de recesso devido com base nos meses trabalhados.
- Desconto de recesso já gozado.
- Exibição do total líquido a receber.
- Validação visual dos campos obrigatórios.
- Mensagens de erro exibidas na própria interface.
- Destaque visual para campos inválidos.
- Impressão e exportação em PDF pelo navegador.
- Publicação automática no GitHub Pages.

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
- `css/style.css`: estilos da página, responsividade e feedback visual de erros.
- `js/app.js`: regras de cálculo, validação dos campos e interação do formulário.
- `.github/workflows/deploy-pages.yml`: fluxo de publicação automática no GitHub Pages.

## Regras de validação implementadas

O formulário valida os seguintes pontos antes de executar o cálculo:

- **Valor da bolsa-auxílio** deve ser maior que zero.
- **Total de meses trabalhados** deve ser maior que zero.
- **Dias trabalhados no último mês** deve estar entre 1 e 30.
- **Recesso gozado** não pode ser negativo.
- **Recesso gozado** não pode ser maior que o recesso devido.

Quando houver erro:

- a calculadora não executa o cálculo;
- os problemas são listados em uma caixa de mensagem no formulário;
- os campos inválidos recebem destaque visual.

## Lógica resumida do cálculo

A calculadora segue esta lógica principal:

- **Valor diário** = bolsa ÷ 30
- **Bolsa proporcional** = valor diário × dias trabalhados no último mês
- **Meses para recesso**:
  - conta o mês atual se houver fração igual ou superior a 15 dias;
  - caso contrário, considera um mês a menos
- **Recesso total devido** = meses considerados × 2,5 dias
- **Recesso a pagar** = recesso devido - recesso já gozado
- **Total líquido** = bolsa proporcional + valor do recesso a pagar

## Publicação automática com GitHub Pages

O repositório está preparado para publicar o site usando o fluxo recomendado do GitHub Pages com GitHub Actions.

### Como funciona o deploy

- O workflow `.github/workflows/deploy-pages.yml` é executado a cada push na branch `main`.
- O job configura o GitHub Pages, empacota o conteúdo estático do repositório e faz o deploy automaticamente.
- Também é possível disparar o workflow manualmente via **Actions**.

### Configuração necessária no GitHub

No repositório, confirme em **Settings > Pages** que a fonte de publicação está configurada para **GitHub Actions**.

Depois disso, cada novo push na `main` atualiza o site publicado automaticamente.

## Conteúdo publicado

Como este projeto é um site estático simples, o deploy envia os arquivos atuais do repositório (HTML, CSS e JavaScript) sem etapa de build adicional.

## Site publicado

Acesse a versão publicada em:

`https://alencastro1958.github.io/calculadora-estagio/`

## Observação jurídica

Esta ferramenta tem finalidade de apoio operacional e educacional.

Ela **não substitui**:
- consultoria jurídica;
- análise contábil;
- verificação de políticas internas da instituição;
- interpretação especializada de convenções ou regras específicas.

Sempre revise os resultados em contexto real de uso.
