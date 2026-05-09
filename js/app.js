document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ano').textContent = new Date().getFullYear();

  const form = document.getElementById('calcForm');
  const mensagensErro = document.getElementById('mensagensErro');

  const campos = {
    bolsa: document.getElementById('bolsa'),
    meses: document.getElementById('meses'),
    diasUltimo: document.getElementById('diasUltimo'),
    recessoGo: document.getElementById('recessoGo')
  };

  function limparErrosVisuais() {
    mensagensErro.innerHTML = '';
    mensagensErro.classList.remove('show');

    Object.values(campos).forEach((campo) => {
      campo.classList.remove('input-erro');
    });
  }

  function mostrarErros(erros) {
    mensagensErro.innerHTML = `
      <strong>Corrija os campos abaixo:</strong>
      <ul>
        ${erros.map((erro) => `<li>${erro}</li>`).join('')}
      </ul>
    `;
    mensagensErro.classList.add('show');
    mensagensErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    limparErrosVisuais();

    const bolsa = parseFloat(campos.bolsa.value);
    const meses = parseInt(campos.meses.value, 10);
    const diasUltimo = parseInt(campos.diasUltimo.value, 10);
    const recessoGo = parseFloat(campos.recessoGo.value) || 0;

    const erros = [];

    if (isNaN(bolsa) || bolsa <= 0) {
      erros.push('Informe um valor de bolsa-auxílio válido maior que zero.');
      campos.bolsa.classList.add('input-erro');
    }

    if (isNaN(meses) || meses <= 0) {
      erros.push('Informe o total de meses trabalhados com valor maior que zero.');
      campos.meses.classList.add('input-erro');
    }

    if (isNaN(diasUltimo) || diasUltimo < 1 || diasUltimo > 30) {
      erros.push('Informe os dias trabalhados no último mês com valor entre 1 e 30.');
      campos.diasUltimo.classList.add('input-erro');
    }

    if (isNaN(recessoGo) || recessoGo < 0) {
      erros.push('Informe o recesso gozado com valor igual ou maior que zero.');
      campos.recessoGo.classList.add('input-erro');
    }

    const mesesParaRecesso = !isNaN(meses) && !isNaN(diasUltimo)
      ? (diasUltimo >= 15 ? meses : Math.max(0, meses - 1))
      : 0;

    const diasRecessoTotal = mesesParaRecesso * 2.5;

    if (!isNaN(recessoGo) && recessoGo > diasRecessoTotal) {
      erros.push(`O recesso gozado não pode ser maior que o recesso devido (${diasRecessoTotal.toFixed(1)} dias).`);
      campos.recessoGo.classList.add('input-erro');
    }

    if (erros.length > 0) {
      mostrarErros(erros);
      return;
    }

    const valorDiario = bolsa / 30;
    const bolsaProp = valorDiario * diasUltimo;
    const diasRecessoDevidos = Math.max(0, diasRecessoTotal - recessoGo);
    const valorRecesso = diasRecessoDevidos * valorDiario;
    const total = bolsaProp + valorRecesso;

    const brl = (v) => v.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const html = `
      <div class="result-row">
        <span class="result-label">Valor Diário (Bolsa ÷ 30)</span>
        <span class="result-value">${brl(valorDiario)}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Bolsa Proporcional (${diasUltimo} dias)</span>
        <span class="result-value">${brl(bolsaProp)}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Recesso Devido (${mesesParaRecesso} meses × 2,5 dias)</span>
        <span class="result-value">${diasRecessoTotal.toFixed(1)} dias</span>
      </div>
      ${recessoGo > 0 ? `
      <div class="result-row">
        <span class="result-label">(-) Recesso Gozado</span>
        <span class="result-value">- ${recessoGo} dias</span>
      </div>` : ''}
      <div class="result-row">
        <span class="result-label">Recesso Remunerado a Pagar (${diasRecessoDevidos.toFixed(1)} dias)</span>
        <span class="result-value">${brl(valorRecesso)}</span>
      </div>
    `;

    document.getElementById('detalhes').innerHTML = html;
    document.getElementById('totalFinal').textContent = brl(total);
    document.getElementById('resultados').classList.add('show');
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
  });

  window.limpar = function () {
    form.reset();
    limparErrosVisuais();
    document.getElementById('detalhes').innerHTML = '';
    document.getElementById('totalFinal').textContent = 'R$ 0,00';
    document.getElementById('resultados').classList.remove('show');
    campos.bolsa.focus();
  };
});