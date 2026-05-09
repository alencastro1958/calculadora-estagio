document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ano').textContent = new Date().getFullYear();

  document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const bolsa = parseFloat(document.getElementById('bolsa').value);
    const meses = Math.max(1, parseInt(document.getElementById('meses').value));
    const diasUltimo = parseInt(document.getElementById('diasUltimo').value);
    const recessoGo = parseInt(document.getElementById('recessoGo').value) || 0;

    if (isNaN(bolsa) || bolsa <= 0 || isNaN(meses) || meses <= 0 || isNaN(diasUltimo) || diasUltimo <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios com valores válidos.');
      return;
    }

    const valorDiario = bolsa / 30;
    const bolsaProp = valorDiario * diasUltimo;
    
    // Fração >= 15 dias conta como mês completo para recesso
    const mesesParaRecesso = diasUltimo >= 15 ? meses : Math.max(0, meses - 1);
    const diasRecessoTotal = mesesParaRecesso * 2.5;
    const diasRecessoDevidos = Math.max(0, diasRecessoTotal - recessoGo);
    const valorRecesso = diasRecessoDevidos * valorDiario;
    
    const total = bolsaProp + valorRecesso;

    const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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
      ${recessoGo > 0 ? `<div class="result-row"><span class="result-label">(-) Recesso Gozado</span><span class="result-value">- ${recessoGo} dias</span></div>` : ''}
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

  window.limpar = function() {
    document.getElementById('calcForm').reset();
    document.getElementById('resultados').classList.remove('show');
    document.getElementById('bolsa').focus();
  };
});