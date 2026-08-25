(function () {
  var oddsSelect = document.getElementById('calc-odds');
  var customGroup = document.getElementById('custom-odds-group');
  var customInput = document.getElementById('calc-custom-odd');
  var amountInput = document.getElementById('calc-amount');
  var returnEl = document.getElementById('calc-return');
  var profitEl = document.getElementById('calc-profit');
  if (!oddsSelect || !customGroup || !customInput || !amountInput || !returnEl || !profitEl) return;

  window.calculate = function () {
    var a = parseFloat(amountInput.value);
    var o = oddsSelect.value === 'custom' ? parseFloat(customInput.value) : parseFloat(oddsSelect.value);
    if (!a || !o || a <= 0 || o <= 1) {
      returnEl.textContent = 'R$ 0,00';
      profitEl.textContent = 'Lucro: R$ 0,00';
      return;
    }
    var t = a * o;
    var p = t - a;
    returnEl.textContent = 'R$ ' + t.toFixed(2).replace('.', ',');
    profitEl.textContent = 'Lucro: R$ ' + p.toFixed(2).replace('.', ',');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(returnEl, { scale: 1.15 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      gsap.fromTo(profitEl, { scale: 1.1 }, { scale: 1, duration: 0.25, ease: 'back.out(2)', delay: 0.08 });
    }
  };

  oddsSelect.addEventListener('change', function () {
    if (this.value === 'custom') {
      customGroup.style.display = '';
      customInput.focus();
    } else {
      customGroup.style.display = 'none';
      if (this.value) calculate();
    }
  });
  var calcBtn = document.getElementById('calc-btn');
  if (calcBtn) calcBtn.addEventListener('click', calculate);
  amountInput.addEventListener('input', function () { calculate(); updateQuickCombos(); });
  customInput.addEventListener('input', calculate);
})();

function updateQuickCombos() {
  var amountInput = document.getElementById('calc-amount');
  var a = parseFloat(amountInput && amountInput.value) || 50;
  var h = document.querySelector('#quick-combos-table thead th:nth-child(3)');
  if (h) h.textContent = 'R$' + a + ' \u2192';
  document.querySelectorAll('#quick-combos-table tbody tr').forEach(function (r) {
    var oe = r.querySelector('.co');
    if (!oe) return;
    var o = parseFloat(oe.textContent);
    var tc = r.querySelector('td:nth-child(3)');
    var pc = r.querySelector('td:nth-child(4)');
    if (tc) tc.textContent = 'R$ ' + (a * o).toFixed(2).replace('.', ',');
    if (pc) pc.textContent = 'R$ ' + ((a * o) - a).toFixed(2).replace('.', ',');
  });
}
