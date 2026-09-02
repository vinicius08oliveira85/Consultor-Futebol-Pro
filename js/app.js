// ========== THEME TOGGLE ==========
var themeToggle = document.getElementById('theme-toggle');
var SAVED_THEME = localStorage.getItem('theme');
var currentTheme = SAVED_THEME || 'dark';
function applyTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
  document.body.classList.toggle('light', t === 'light');
  themeToggle.textContent = t === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  themeToggle.setAttribute('aria-label', t === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
  localStorage.setItem('theme', t);
}
applyTheme(currentTheme);
themeToggle.addEventListener('click', function () {
  applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
});

// ========== DYNAMIC DATE & STATS ==========
var MATCH_DATA = { totalGames: 0, resolvedGames: 0, wins: 0, roi: 0 };
document.getElementById('date-badge').textContent = '\uD83D\uDCC5 ' + formatDatePTBR() + ' \u2022 Hor\u00E1rio de Bras\u00EDlia (BRT)';
document.getElementById('footer-date').textContent = formatDateTimePTBR();
function updateStats() {
  document.getElementById('stat-total').textContent = MATCH_DATA.totalGames;
  document.getElementById('stat-resolved').textContent = MATCH_DATA.resolvedGames;
  document.getElementById('stat-winrate').textContent = MATCH_DATA.resolvedGames > 0 ? Math.round((MATCH_DATA.wins / MATCH_DATA.resolvedGames) * 100) + '%' : '0%';
  document.getElementById('stat-roi').textContent = '+' + MATCH_DATA.roi.toFixed(2);
}

function updateLeagueCounts() {
  var counts = { all: 0 };
  document.querySelectorAll('.mc').forEach(function (c) {
    var k = c.dataset.league;
    counts.all++;
    counts[k] = (counts[k] || 0) + 1;
  });
  Object.keys(counts).forEach(function (k) {
    var e = document.getElementById('count-' + k);
    if (e) e.textContent = counts[k];
  });
}

function showToast(m, t) {
  t = t || 'success';
  var c = document.getElementById('toast-container');
  var x = document.createElement('div');
  x.className = 'toast ' + t;
  x.textContent = m;
  c.appendChild(x);
  requestAnimationFrame(function () { x.classList.add('show'); });
  setTimeout(function () {
    x.classList.remove('show');
    setTimeout(function () { if (x.parentNode) x.parentNode.removeChild(x); }, 300);
  }, 2200);
}

// ========== TABS ==========
var tabBtns = document.querySelectorAll('.tbtn');
var tabPanels = document.querySelectorAll('.tc');
function switchTab(t) {
  tabBtns.forEach(function (b) {
    b.classList.remove('act');
    b.setAttribute('aria-selected', 'false');
    b.setAttribute('tabindex', '-1');
  });
  tabPanels.forEach(function (c) { c.classList.remove('act'); });
  t.classList.add('act');
  t.setAttribute('aria-selected', 'true');
  t.setAttribute('tabindex', '0');
  t.focus();
  var p = document.getElementById('tab-' + t.dataset.tab);
  if (p) p.classList.add('act');
  animVis();
  if (t.dataset.tab === 'stats') updateStatsTab();
}
tabBtns.forEach(function (b) {
  b.addEventListener('click', function () { switchTab(this); });
  b.addEventListener('keydown', function (e) {
    var a = Array.from(tabBtns), i = a.indexOf(this), n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); n = (i + 1) % a.length; }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); n = (i - 1 + a.length) % a.length; }
    else if (e.key === 'Home') { e.preventDefault(); n = 0; }
    else if (e.key === 'End') { e.preventDefault(); n = a.length - 1; }
    if (n >= 0) switchTab(a[n]);
  });
});

// ========== SEARCH & FILTERS ==========
var searchInput = document.getElementById('search-input');
var searchClear = document.getElementById('search-clear');
var filterResults = document.getElementById('filter-results');
searchInput.addEventListener('input', function () {
  applyFilters();
  searchClear.classList.toggle('visible', this.value.length > 0);
});
searchClear.addEventListener('click', function () {
  searchInput.value = '';
  applyFilters();
  this.classList.remove('visible');
});
function applyFilters() {
  var activeFilter = document.querySelector('.filter-btn.active');
  if (!activeFilter) return;
  var lg = activeFilter.dataset.league;
  var q = searchInput.value.toLowerCase().trim();
  var vc = 0;
  document.querySelectorAll('.mc').forEach(function (c) {
    var ml = lg === 'all' || c.dataset.league === lg;
    var ms = !q || c.dataset.teams.toLowerCase().indexOf(q) >= 0 || c.dataset.bet.toLowerCase().indexOf(q) >= 0;
    if (ml && ms) { c.classList.remove('hid'); vc++; }
    else { c.classList.add('hid'); }
  });
  filterResults.textContent = vc + ' jogo' + (vc !== 1 ? 's' : '') + ' encontrado' + (vc !== 1 ? 's' : '');
  animVis();
}
function bindFilterEvents() {
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (x) {
        x.classList.remove('active');
        x.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      applyFilters();
    });
  });
}

document.getElementById('sort-select').addEventListener('change', function () { sortMatches(this.value); });
function sortMatches(c) {
  var container = document.getElementById('matches-container');
  if (!container) return;
  var cards = Array.from(container.querySelectorAll('.mc'));
  cards.sort(function (a, b) {
    switch (c) {
      case 'confidence': return (parseInt(b.dataset.confidence) || 0) - (parseInt(a.dataset.confidence) || 0);
      case 'odds-asc': return (parseFloat(a.dataset.odds) || 0) - (parseFloat(b.dataset.odds) || 0);
      case 'odds-desc': return (parseFloat(b.dataset.odds) || 0) - (parseFloat(a.dataset.odds) || 0);
      case 'league': return (a.dataset.league || '').localeCompare(b.dataset.league || '');
      default: return (parseInt(a.dataset.sortPriority) || 99) - (parseInt(b.dataset.sortPriority) || 99);
    }
  });
  cards.forEach(function (card) { container.appendChild(card); });
  animVis();
}

function updateCountdowns() {
  document.querySelectorAll('.countdown[data-kickoff]').forEach(function (el) {
    var diff = new Date(el.dataset.kickoff) - new Date();
    if (diff <= 0) {
      el.textContent = '\u23F3 Em andamento';
      el.style.color = 'var(--color-orange)';
      el.style.background = 'rgba(249,115,22,.08)';
      return;
    }
    var h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
    el.textContent = '\u23F1 ' + (h > 0 ? h + 'h ' : '') + m + 'm ' + s + 's';
  });
}

// ========== NOTIFICATIONS ==========
var notifBanner = document.getElementById('notif-banner');
var notifText = document.getElementById('notif-text');
function checkNotifications() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default' && !localStorage.getItem('notifAsked')) {
    notifText.textContent = 'Ative notifica\u00e7\u00f5es para alertas de jogos!';
    notifBanner.classList.add('show');
    localStorage.setItem('notifAsked', '1');
  }
}
document.getElementById('notif-enable').addEventListener('click', function () {
  Notification.requestPermission().then(function (p) {
    notifBanner.classList.remove('show');
    if (p === 'granted') showToast('\uD83D\uDD14 Notifica\u00e7\u00f5es ativadas!', 'success');
  });
});
document.getElementById('notif-dismiss').addEventListener('click', function () { notifBanner.classList.remove('show'); });

var backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', function () { backToTop.classList.toggle('visible', window.scrollY > 300); });
backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

// ========== MATCH DETAIL MODAL ==========
var modal = document.getElementById('match-modal');
var modalBody = document.getElementById('modal-body');
document.getElementById('modal-close').addEventListener('click', function () { modal.classList.remove('open'); });
modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('open'); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('open'); });

function renderTeamStatsBlock(extra) {
  if (!extra.teamStats) return '';
  var hs = extra.teamStats.home;
  var as = extra.teamStats.away;
  var hn = extra.homeShort || extra.home;
  var an = extra.awayShort || extra.away;
  function row(label, hv, av) {
    return '<div class="mst-row"><span class="mst-label">' + label + '</span><span>' + hv + '</span><span>' + av + '</span></div>';
  }
  return '<div class="modal-stats-block"><div class="modal-section-title">Stats dos times</div><div class="modal-stats-table">' +
    '<div class="mst-row mst-head"><span></span><span>' + escapeHtml(hn) + '</span><span>' + escapeHtml(an) + '</span></div>' +
    row('Gols/jogo', hs.avgGoals, as.avgGoals) +
    row('Sofridos/jogo', hs.avgConceded, as.avgConceded) +
    row('BTTS %', hs.bttsPct + '%', as.bttsPct + '%') +
    row('Over 2.5 %', hs.over25Pct + '%', as.over25Pct + '%') +
    row('Cart\u00f5es/jogo', hs.avgCards, as.avgCards) +
    row('Escanteios/jogo', hs.avgCorners, as.avgCorners) +
    '</div></div>';
}

function renderH2hBlock(extra) {
  if (!extra.h2hSummary && !(extra.h2h && extra.h2h.length)) return '';
  var html = '<div class="modal-h2h"><div class="modal-section-title">H2H</div>';
  if (extra.h2hSummary) {
    var s = extra.h2hSummary;
    html += '<div class="modal-h2h-summary">' +
      '<span>' + s.total + ' jogos</span>' +
      '<span>' + s.homeWins + 'V ' + s.draws + 'E ' + s.awayWins + 'D</span>' +
      '<span>M\u00e9dia ' + s.avgGoals + ' gols</span>' +
      '<span>BTTS ' + s.bttsPct + '%</span>' +
      (s.notes ? '<span class="modal-h2h-note">' + escapeHtml(s.notes) + '</span>' : '') +
      '</div>';
  }
  if (extra.h2h && extra.h2h.length) {
    html += '<ul class="modal-h2h-list">' + extra.h2h.map(function (line) { return '<li>' + escapeHtml(line) + '</li>'; }).join('') + '</ul>';
  }
  html += '</div>';
  return html;
}

function renderContextBlock(extra) {
  if (!extra.context) return '';
  var c = extra.context;
  var parts = [];
  if (c.stakes) parts.push('<div class="modal-ctx-row"><strong>Press\u00e3o:</strong> ' + escapeHtml(c.stakes) + '</div>');
  if (c.rotation) parts.push('<div class="modal-ctx-row"><strong>Rota\u00e7\u00e3o:</strong> ' + escapeHtml(c.rotation) + '</div>');
  if (c.injuries && c.injuries.length) {
    parts.push('<div class="modal-ctx-row"><strong>Contexto:</strong><ul class="modal-ctx-list">' +
      c.injuries.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') + '</ul></div>');
  }
  if (c.referee) parts.push('<div class="modal-ctx-row"><strong>\u00c1rbitro:</strong> ' + escapeHtml(c.referee) + '</div>');
  if (!parts.length) return '';
  return '<div class="modal-context"><div class="modal-section-title">Contexto</div>' + parts.join('') + '</div>';
}

function renderSourcesBlock(extra) {
  if (!extra.sources || !extra.sources.length) return '';
  return '<div class="modal-sources"><span class="modal-sources-label">Fontes:</span> ' +
    extra.sources.map(function (s) { return '<span class="modal-source-tag">' + escapeHtml(s) + '</span>'; }).join(' ') + '</div>';
}

window.openMatchDetail = function (card) {
  var h = card.dataset.home || '';
  var a = card.dataset.away || '';
  var teams = card.dataset.teams || '';
  var extra = (window.APP_MATCHES && window.APP_MATCHES[teams]) || {};
  var l = card.querySelector('.lb').textContent;
  var time = card.querySelector('.mt').textContent;
  var conf = card.dataset.confidence;
  var bet = card.dataset.bet;
  var odds = card.dataset.odds;
  var ho = card.dataset.homeOdd || '-';
  var doo = card.dataset.drawOdd || '-';
  var ao = card.dataset.awayOdd || '-';
  var hp = card.dataset.homeProb || '-';
  var dp = card.dataset.drawProb || '-';
  var ap = card.dataset.awayProb || '-';
  var analysis = card.querySelector('.ap');
  var analysisHtml = analysis ? analysis.innerHTML : '';
  var metaHtml = '';
  if (extra.venue) metaHtml += '<div class="modal-meta-row"><span class="modal-meta-label">Est\u00e1dio</span><span>' + escapeHtml(extra.venue) + '</span></div>';
  if (extra.round) metaHtml += '<div class="modal-meta-row"><span class="modal-meta-label">Fase</span><span>' + escapeHtml(extra.round) + '</span></div>';
  if (extra.aggregate) metaHtml += '<div class="modal-meta-row"><span class="modal-meta-label">Agregado</span><span>' + escapeHtml(extra.aggregate) + '</span></div>';
  if (extra.form) {
    metaHtml += '<div class="modal-meta-row"><span class="modal-meta-label">Forma</span><span>' + escapeHtml(extra.home) + ': ' + escapeHtml(extra.form.home) + ' \u2022 ' + escapeHtml(extra.away) + ': ' + escapeHtml(extra.form.away) + '</span></div>';
  }
  if (extra.keyStats && extra.keyStats.length) {
    metaHtml += '<div class="modal-meta-stats"><div class="modal-meta-label" style="margin-bottom:4px">\uD83D\uDCCA Destaques</div><ul class="modal-stats-list">' +
      extra.keyStats.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</ul></div>';
  }
  var topPicksHtml = '';
  if (extra.topPicks && extra.topPicks.length) {
    var ranks = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
    topPicksHtml = '<div class="modal-recommend"><div class="modal-section-title">\uD83C\uDFC6 Top 3 mercados</div>' +
      extra.topPicks.map(function (p, i) {
        var valBadge = p.valueEdge >= 5 ? ' <span class="mm-value">VALOR +' + p.valueEdge + 'pp</span>' : '';
        var rat = p.rationale ? '<div class="mm-rationale">' + escapeHtml(p.rationale) + '</div>' : '';
        return '<div class="modal-pick-row">' +
          '<div class="modal-market-row"><span>' + (ranks[i] || p.rank) + ' <strong>' + escapeHtml(p.market) + '</strong> \u2014 ' + escapeHtml(p.label) + valBadge + '</span><span class="mm-odd">@ ' + p.odd + '</span><span class="mm-conf">' + p.confidence + '%</span></div>' +
          rat + '</div>';
      }).join('') + '</div>';
  }
  var marketsHtml = '';
  if (extra.markets) {
    var mLabels = { resultado: 'Resultado', gols: 'Gols', cartoes: 'Cart\u00f5es', escanteios: 'Escanteios', especiais: 'Especiais', combo: 'Combo' };
    marketsHtml = '<div class="modal-markets"><div class="modal-section-title">\uD83D\uDCCA Todos os mercados</div>';
    Object.keys(extra.markets).forEach(function (key) {
      var rows = extra.markets[key];
      if (!rows || !rows.length) return;
      marketsHtml += '<div class="modal-market-group"><div class="modal-market-name">' + (mLabels[key] || key) + '</div><div class="modal-market-rows">';
      rows.forEach(function (r) {
        var rat = r.rationale ? '<div class="mm-rationale">' + escapeHtml(r.rationale) + '</div>' : '';
        marketsHtml += '<div class="modal-pick-row"><div class="modal-market-row"><span>' + escapeHtml(r.label) + '</span><span class="mm-odd">@ ' + r.odd + '</span><span class="mm-conf">' + r.confidence + '%</span></div>' + rat + '</div>';
      });
      marketsHtml += '</div></div>';
    });
    marketsHtml += '</div>';
  }
  modalBody.innerHTML =
    '<div class="modal-teams"><span class="home">' + escapeHtml(h) + '</span> vs <span class="away">' + escapeHtml(a) + '</span></div>' +
    '<div class="modal-subhead"><span class="lb ' + card.dataset.league + '">' + l + '</span><span class="mt">' + time + '</span></div>' +
    (metaHtml ? '<div class="modal-meta">' + metaHtml + '</div>' : '') +
    renderTeamStatsBlock(extra) +
    renderH2hBlock(extra) +
    renderContextBlock(extra) +
    '<div class="modal-details">' +
    '<div class="modal-detail-item"><div class="mdi-label">Odd Casa</div><div class="mdi-value" style="color:var(--color-accent)">' + ho + '</div><div style="font-size:.6rem;color:var(--text-muted)">' + hp + '%</div></div>' +
    '<div class="modal-detail-item"><div class="mdi-label">Odd Empate</div><div class="mdi-value">' + doo + '</div><div style="font-size:.6rem;color:var(--text-muted)">' + dp + '%</div></div>' +
    '<div class="modal-detail-item"><div class="mdi-label">Odd Fora</div><div class="mdi-value" style="color:var(--color-blue)">' + ao + '</div><div style="font-size:.6rem;color:var(--text-muted)">' + ap + '%</div></div>' +
    '<div class="modal-detail-item"><div class="mdi-label">Confian\u00e7a</div><div class="mdi-value" style="color:var(--color-gold)">' + conf + '%</div></div>' +
    '</div>' +
    topPicksHtml +
    '<div class="modal-recommend">' +
    '<div class="modal-section-title">\uD83C\uDFAF Recomenda\u00e7\u00e3o</div>' +
    '<div class="modal-recommend-text">' + escapeHtml(bet) + ' <span class="modal-recommend-odd">@ ' + odds + '</span></div></div>' +
    marketsHtml +
    (analysisHtml ? '<div class="modal-analysis"><div class="modal-section-title">\uD83D\uDCCB An\u00e1lise T\u00e1tica</div><ul class="modal-ap">' + analysisHtml + '</ul></div>' : '') +
    renderSourcesBlock(extra);
  modal.classList.add('open');
};

// ========== BET RESULT TRACKING ==========
var betResults = JSON.parse(localStorage.getItem('betResults') || '{}');
window.toggleBetResult = function (btn) {
  var teams = btn.dataset.teams;
  var current = btn.dataset.result;
  var next = current === 'pending' ? 'won' : current === 'won' ? 'lost' : 'pending';
  var labels = { pending: '\u23F3 Pendente', won: '\u2705 Ganhou', lost: '\u274C Perdeu' };
  btn.dataset.result = next;
  btn.textContent = labels[next];
  btn.className = 'result-btn ' + next;
  betResults[teams] = next;
  localStorage.setItem('betResults', JSON.stringify(betResults));
  updateStatsTab();
  showToast(labels[next] + ' \u2014 ' + teams, 'info');
};
function initBetResults() {
  document.querySelectorAll('.result-btn').forEach(function (btn) {
    var r = betResults[btn.dataset.teams];
    if (r) {
      var labels = { pending: '\u23F3 Pendente', won: '\u2705 Ganhou', lost: '\u274C Perdeu' };
      btn.dataset.result = r;
      btn.textContent = labels[r];
      btn.className = 'result-btn ' + r;
    }
  });
}

function updateStatsTab() {
  var won = 0, lost = 0, total = 0;
  document.querySelectorAll('.result-btn').forEach(function (b) {
    var r = b.dataset.result;
    if (r === 'won') won++;
    else if (r === 'lost') lost++;
    total++;
  });
  document.getElementById('st-total-bets').textContent = total;
  document.getElementById('st-won').textContent = won;
  document.getElementById('st-lost').textContent = lost;
  var roi = won > 0 ? ((won * 1.5 - lost * 1) / (total || 1) * 100).toFixed(1) : '0.0';
  document.getElementById('st-roi-total').textContent = (roi >= 0 ? '+' : '') + roi + '%';
  var streak = 0, streakType = '';
  document.querySelectorAll('.result-btn').forEach(function (b) {
    var r = b.dataset.result;
    if (r === 'pending') return;
    if (!streakType) { streakType = r; streak = 1; }
    else if (r === streakType) streak++;
    else { streakType = r; streak = 1; }
  });
  var streakEl = document.getElementById('streak-display');
  if (streakType === 'won') streakEl.innerHTML = '<span style="color:var(--color-accent)">\uD83D\uDD25 ' + streak + ' vit\u00f3ria' + (streak > 1 ? 's' : '') + ' seguidas!</span>';
  else if (streakType === 'lost') streakEl.innerHTML = '<span style="color:var(--color-destructive)">\uD83D\uDC94 ' + streak + ' derrota' + (streak > 1 ? 's' : '') + ' seguida' + (streak > 1 ? 's' : '') + '</span>';
  else streakEl.innerHTML = '<span style="color:var(--text-muted)">Aguardando resultados...</span>';
  var leagues = { ec: { w: 0, t: 0 }, cl: { w: 0, t: 0 }, ll: { w: 0, t: 0 }, sp: { w: 0, t: 0 } };
  document.querySelectorAll('.result-btn').forEach(function (b) {
    var r = b.dataset.result;
    if (r === 'pending') return;
    var card = document.querySelector('.mc[data-teams="' + b.dataset.teams + '"]');
    if (!card) return;
    var lg = card.dataset.league;
    if (leagues[lg]) { leagues[lg].t++; if (r === 'won') leagues[lg].w++; }
  });
  var lbEl = document.getElementById('league-breakdown');
  lbEl.innerHTML = '';
  var lNames = { ec: 'EFL Cup', cl: 'Champions League', ll: 'La Liga', sp: 'Saudi Pro' };
  var lColors = { ec: '#EC4899', cl: '#3B82F6', ll: 'var(--color-gold)', sp: 'var(--color-purple)' };
  Object.keys(leagues).forEach(function (k) {
    var lg = leagues[k];
    if (lg.t === 0) return;
    var pct = Math.round(lg.w / lg.t * 100);
    lbEl.innerHTML += '<div class="league-row"><span class="lr-name">' + lNames[k] + '</span><div class="lr-bar"><div class="lr-fill" style="width:' + pct + '%;background:' + lColors[k] + '"></div></div><span class="lr-pct" style="color:' + lColors[k] + '">' + pct + '%</span></div>';
  });
  if (lbEl.innerHTML === '') lbEl.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:.75rem;padding:var(--space-sm)">Nenhum resultado registrado ainda</div>';
  var barsEl = document.getElementById('perf-bars');
  var labelsEl = document.getElementById('perf-labels');
  barsEl.innerHTML = '';
  labelsEl.innerHTML = '';
  for (var i = 6; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var dayStr = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
    var dayWon = 0;
    document.querySelectorAll('.result-btn[data-result="won"]').forEach(function () { dayWon++; });
    var height = Math.max(5, dayWon * 20);
    barsEl.innerHTML += '<div class="chart-bar" style="height:' + height + '%;background:var(--color-accent)"><div class="chart-tooltip">' + dayStr + ': ' + dayWon + ' ganhou</div></div>';
    labelsEl.innerHTML += '<span>' + dayStr + '</span>';
  }
}

// ========== ODDS COMPARATOR ==========
var allCards = [];
function initComparatorSelects() {
  var left = document.getElementById('comp-left');
  var right = document.getElementById('comp-right');
  if (!left || !right) return;
  allCards = Array.from(document.querySelectorAll('.mc'));
  var opts = '<option value="">Selecione...</option>';
  allCards.forEach(function (c, i) { opts += '<option value="' + i + '">' + escapeHtml(c.dataset.teams) + '</option>'; });
  left.innerHTML = opts;
  right.innerHTML = opts;
}
document.getElementById('comp-left').addEventListener('change', updateComparator);
document.getElementById('comp-right').addEventListener('change', updateComparator);
function updateComparator() {
  var li = parseInt(document.getElementById('comp-left').value);
  var ri = parseInt(document.getElementById('comp-right').value);
  var resultEl = document.getElementById('comp-result');
  if (isNaN(li) || isNaN(ri)) { resultEl.style.display = 'none'; return; }
  var lCard = allCards[li], rCard = allCards[ri];
  if (!lCard || !rCard) { resultEl.style.display = 'none'; return; }
  function sideHtml(card) {
    return '<div class="comp-side"><h5>' + escapeHtml(card.dataset.teams) + '</h5>' +
      '<div class="comp-odd-row"><span class="cor-label">Casa</span><span class="cor-value">' + (card.dataset.homeOdd || '-') + '</span></div>' +
      '<div class="comp-odd-row"><span class="cor-label">Empate</span><span class="cor-value">' + (card.dataset.drawOdd || '-') + '</span></div>' +
      '<div class="comp-odd-row"><span class="cor-label">Fora</span><span class="cor-value">' + (card.dataset.awayOdd || '-') + '</span></div>' +
      '<div class="comp-odd-row"><span class="cor-label">Confian\u00e7a</span><span class="cor-value" style="color:var(--color-accent)">' + card.dataset.confidence + '%</span></div>' +
      '<div class="comp-odd-row"><span class="cor-label">Recomenda\u00e7\u00e3o</span><span class="cor-value" style="font-size:.65rem">' + escapeHtml(card.dataset.bet) + '</span></div></div>';
  }
  var lConf = parseInt(lCard.dataset.confidence) || 0;
  var rConf = parseInt(rCard.dataset.confidence) || 0;
  resultEl.innerHTML = sideHtml(lCard) + '<div style="text-align:center;font-size:.7rem;color:var(--text-muted);align-self:center">\u2694\uFE0F</div>' + sideHtml(rCard);
  var sides = resultEl.querySelectorAll('.comp-side');
  if (lConf > rConf && sides[0]) sides[0].classList.add('comp-winner');
  else if (rConf > lConf && sides[1]) sides[1].classList.add('comp-winner');
  resultEl.style.display = 'grid';
}

function getSaved() { try { return JSON.parse(localStorage.getItem('savedBets') || '[]'); } catch (e) { return []; } }
function saveSaved(a) { localStorage.setItem('savedBets', JSON.stringify(a)); }

function getCardEditorValues(card) {
  var oddInput = card.querySelector('.bet-odd-input');
  var betInput = card.querySelector('.bet-pick-input');
  var bet = betInput ? betInput.value.trim() : (card.dataset.bet || '');
  var odd = oddInput ? parseFloat(oddInput.value) : parseFloat(card.dataset.odds);
  return { bet: bet, odd: odd };
}

function updateCardFromEditor(card) {
  var vals = getCardEditorValues(card);
  if (vals.bet) card.dataset.bet = vals.bet;
  if (vals.odd && !isNaN(vals.odd)) card.dataset.odds = vals.odd;
  var share = card.querySelector('.share-btn');
  if (share) {
    share.dataset.bet = vals.bet;
    share.dataset.odd = vals.odd;
  }
  var multi = card.querySelector('.add-to-multi');
  if (multi) {
    multi.dataset.bet = vals.bet;
    multi.dataset.odd = vals.odd;
  }
}

function selectCardMarket(card, oi) {
  card.querySelectorAll('.oi').forEach(function (el) { el.classList.remove('selected'); });
  oi.classList.add('selected');
  var betInput = card.querySelector('.bet-pick-input');
  var oddInput = card.querySelector('.bet-odd-input');
  if (betInput) betInput.value = oi.dataset.betLabel;
  if (oddInput) oddInput.value = oi.dataset.odd;
  card.dataset.selectedMarket = oi.dataset.market;
  updateCardFromEditor(card);
}

function selectCardPick(card, pickEl) {
  card.querySelectorAll('.top-pick').forEach(function (el) { el.classList.remove('selected'); });
  card.querySelectorAll('.oi').forEach(function (el) { el.classList.remove('selected'); });
  pickEl.classList.add('selected');
  var betInput = card.querySelector('.bet-pick-input');
  var oddInput = card.querySelector('.bet-odd-input');
  if (betInput) betInput.value = pickEl.dataset.betLabel;
  if (oddInput) oddInput.value = pickEl.dataset.odd;
  card.dataset.selectedMarket = 'top-pick';
  updateCardFromEditor(card);
}

function useSuggestedBet(card) {
  var m = window.APP_MATCHES && window.APP_MATCHES[card.dataset.teams];
  if (!m) return;
  card.querySelectorAll('.oi, .top-pick').forEach(function (el) { el.classList.remove('selected'); });
  var betInput = card.querySelector('.bet-pick-input');
  var oddInput = card.querySelector('.bet-odd-input');
  if (m.topPicks && m.topPicks.length) {
    if (betInput) betInput.value = m.topPicks[0].label;
    if (oddInput) oddInput.value = m.topPicks[0].odd;
    var firstPick = card.querySelector('.top-pick');
    if (firstPick) firstPick.classList.add('selected');
  } else {
    if (betInput) betInput.value = m.bet;
    if (oddInput) oddInput.value = m.odds;
  }
  card.dataset.selectedMarket = 'suggested';
  updateCardFromEditor(card);
}

function saveCardBet(card, source) {
  var t = card.dataset.teams;
  var vals = getCardEditorValues(card);
  if (!vals.bet) { showToast('Selecione uma aposta', 'warn'); return; }
  if (!vals.odd || vals.odd <= 1 || isNaN(vals.odd)) { showToast('Odd inv\u00e1lida (m\u00edn. 1.01)', 'warn'); return; }
  updateCardFromEditor(card);
  var s = getSaved();
  var i = s.findIndex(function (x) { return x.teams === t; });
  if (i >= 0) {
    s[i] = { teams: t, bet: vals.bet, odd: vals.odd, date: formatDatePTBR() };
    showToast('\u2605 ' + t + ' atualizada!', 'success');
  } else {
    s.push({ teams: t, bet: vals.bet, odd: vals.odd, date: formatDatePTBR() });
    showToast('\u2605 ' + t + ' salva!', 'success');
  }
  saveSaved(s);
  syncStars();
  updateSavedPanel();
}

function removeCardBet(card) {
  var t = card.dataset.teams;
  var s = getSaved();
  var i = s.findIndex(function (x) { return x.teams === t; });
  if (i < 0) return;
  s.splice(i, 1);
  saveSaved(s);
  syncStars();
  updateSavedPanel();
  showToast('\u2715 ' + t + ' removida', 'warn');
}

function restoreCardEditor(card) {
  var saved = getSaved().find(function (x) { return x.teams === card.dataset.teams; });
  if (!saved) return;
  var betInput = card.querySelector('.bet-pick-input');
  var oddInput = card.querySelector('.bet-odd-input');
  if (betInput) betInput.value = saved.bet;
  if (oddInput) oddInput.value = saved.odd || card.dataset.odds;
  updateCardFromEditor(card);
}

function initCardEditors() {
  document.querySelectorAll('.mc').forEach(function (card) {
    restoreCardEditor(card);
  });
}

function updateSavedPanel() {
  var l = document.getElementById('saved-list');
  var s = getSaved();
  if (s.length === 0) { l.innerHTML = '<div class="empty">Nenhuma aposta salva ainda.</div>'; updateMyBetsSummary(); return; }
  l.innerHTML = '';
  l.className = '';
  s.forEach(function (b, i) {
    var d = document.createElement('div');
    d.className = 'saved-item';
    var r = betResults[b.teams];
    var badge = r && r !== 'pending' ? '<span class="bet-result-badge ' + r + '">' + (r === 'won' ? 'GANHOU' : 'PERDEU') + '</span>' : '';
    d.innerHTML = '<div class="si-info"><div class="si-teams">' + escapeHtml(b.teams) + badge + '</div><div class="si-bet">' + escapeHtml(b.bet) + (b.odd ? ' @ ' + b.odd : '') + '</div></div><button class="remove-btn" data-idx="' + i + '" aria-label="Remover">\u2715</button>';
    l.appendChild(d);
  });
  l.querySelectorAll('.remove-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = parseInt(this.dataset.idx);
      var saved = getSaved();
      var removed = saved.splice(i, 1)[0];
      saveSaved(saved);
      updateSavedPanel();
      syncStars();
      showToast('\u2715 ' + removed.teams + ' removida', 'warn');
    });
  });
  updateMyBetsSummary();
}
function syncStars() {
  var s = getSaved();
  document.querySelectorAll('.mc').forEach(function (c) {
    var b = c.querySelector('.save-btn');
    var saveBtn = c.querySelector('.bet-save-btn');
    var is = s.some(function (x) { return x.teams === c.dataset.teams; });
    if (b) {
      b.textContent = is ? '\u2605' : '\u2606';
      b.classList.toggle('saved', is);
      b.setAttribute('aria-pressed', is);
    }
    if (saveBtn) {
      saveBtn.textContent = is ? '\u2605 Aposta salva' : '\u2605 Salvar aposta';
      saveBtn.classList.toggle('saved', is);
    }
  });
}

var multiSelections = [];
window.multiSelections = multiSelections;
window.showToast = showToast;
window.updateMultiBet = updateMultiBet;
function updateMultiBet() {
  var el = document.getElementById('multi-selections');
  var emptyEl = document.getElementById('multi-empty');
  var resultEl = document.getElementById('multi-result');
  if (multiSelections.length === 0) {
    el.innerHTML = '';
    emptyEl.style.display = '';
    resultEl.style.display = 'none';
    return;
  }
  emptyEl.style.display = 'none';
  resultEl.style.display = 'flex';
  el.innerHTML = '';
  var co = 1;
  multiSelections.forEach(function (s, i) {
    co *= s.odd;
    var item = document.createElement('div');
    item.className = 'multi-bet-item';
    item.innerHTML = '<span class="mbi-teams">' + escapeHtml(s.teams) + '</span><span class="mbi-odd">' + s.odd.toFixed(2) + '</span><button class="mbi-remove" data-idx="' + i + '">\u2715</button>';
    el.appendChild(item);
  });
  el.querySelectorAll('.mbi-remove').forEach(function (b) {
    b.addEventListener('click', function () {
      multiSelections.splice(parseInt(this.dataset.idx), 1);
      updateMultiBet();
    });
  });
  document.getElementById('mb-combined-odd').textContent = co.toFixed(2);
  document.getElementById('mb-combined-return').textContent = 'R$ ' + (50 * co).toFixed(2).replace('.', ',');
}
function updateMyBetsSummary() {
  var s = getSaved();
  document.getElementById('mb-count').textContent = s.length;
  if (s.length === 0) {
    document.getElementById('mb-avg-odd').textContent = '-';
    document.getElementById('mb-potential').textContent = '-';
    return;
  }
  var totalOdd = 0, count = 0;
  s.forEach(function (b) {
    var odd = parseFloat(b.odd);
    if (odd && !isNaN(odd)) { totalOdd += odd; count++; }
    else {
      var card = document.querySelector('.mc[data-teams="' + b.teams + '"]');
      if (card) {
        odd = parseFloat(card.dataset.odds);
        if (odd) { totalOdd += odd; count++; }
      }
    }
  });
  document.getElementById('mb-avg-odd').textContent = count > 0 ? (totalOdd / count).toFixed(2) : '-';
  document.getElementById('mb-potential').textContent = count > 0 ? 'R$ ' + (50 * totalOdd / count).toFixed(0) : '-';
}

var exportBtnEl = document.getElementById('export-btn');
if (exportBtnEl) exportBtnEl.addEventListener('click', function () {
  var s = getSaved();
  if (s.length === 0) { showToast('Nada para exportar', 'warn'); return; }
  var b = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
  var u = URL.createObjectURL(b);
  var a = document.createElement('a');
  a.href = u;
  a.download = 'apostas-' + formatDatePTBR().replace(/\//g, '-') + '.json';
  a.click();
  URL.revokeObjectURL(u);
  showToast('\uD83D\uDCE4 Exportado!', 'info');
});
var _ib = document.getElementById('import-btn');
var _if = document.getElementById('import-file');
if (_ib && _if) _ib.addEventListener('click', function () { _if.click(); });
if (_if) _if.addEventListener('change', function (e) {
  var f = e.target.files[0];
  if (!f) return;
  var r = new FileReader();
  r.onload = function (ev) {
    try {
      var imp = JSON.parse(ev.target.result);
      if (!Array.isArray(imp)) throw 0;
      var ex = getSaved();
      var ts = new Set(ex.map(function (x) { return x.teams; }));
      var added = 0;
      imp.forEach(function (b) {
        if (b.teams && b.bet && !ts.has(b.teams)) { ex.push(b); added++; }
      });
      saveSaved(ex);
      syncStars();
      initCardEditors();
      updateSavedPanel();
      showToast('\uD83D\uDCE5 ' + added + ' importada' + (added !== 1 ? 's' : ''), 'info');
    } catch (err) { showToast('Erro ao importar', 'warn'); }
  };
  r.readAsText(f);
  this.value = '';
});

function bindMatchEvents() {
  document.querySelectorAll('.as-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var content = this.nextElementSibling;
      var isOpen = content.classList.contains('open');
      content.classList.toggle('open');
      this.classList.toggle('open');
      this.setAttribute('aria-expanded', !isOpen);
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });
  });

  var container = document.getElementById('matches-container');
  if (container && !container.dataset.eventsBound) {
    container.dataset.eventsBound = '1';
    container.addEventListener('click', function (e) {
      var oi = e.target.closest('.oi');
      if (oi && container.contains(oi)) {
        e.preventDefault();
        var card = oi.closest('.mc');
        card.querySelectorAll('.top-pick').forEach(function (el) { el.classList.remove('selected'); });
        selectCardMarket(card, oi);
        showToast('\uD83C\uDFAF ' + oi.dataset.betLabel + ' @ ' + oi.dataset.odd, 'info');
        return;
      }
      var topPick = e.target.closest('.top-pick');
      if (topPick && container.contains(topPick)) {
        e.preventDefault();
        var pickCard = topPick.closest('.mc');
        selectCardPick(pickCard, topPick);
        showToast('\uD83C\uDFC6 ' + topPick.dataset.betLabel + ' @ ' + topPick.dataset.odd, 'info');
        return;
      }
      var saveBtn = e.target.closest('.bet-save-btn');
      if (saveBtn) {
        e.preventDefault();
        saveCardBet(saveBtn.closest('.mc'));
        return;
      }
      var star = e.target.closest('.save-btn');
      if (star) {
        e.preventDefault();
        saveCardBet(star.closest('.mc'));
        return;
      }
      var suggestedBtn = e.target.closest('.bet-use-suggested');
      if (suggestedBtn) {
        e.preventDefault();
        useSuggestedBet(suggestedBtn.closest('.mc'));
        showToast('\u21A9 Aposta sugerida aplicada', 'info');
        return;
      }
      var multiBtn = e.target.closest('.add-to-multi');
      if (multiBtn) {
        e.preventDefault();
        var c = multiBtn.closest('.mc');
        var vals = getCardEditorValues(c);
        var t = multiBtn.dataset.teams;
        if (multiSelections.some(function (x) { return x.teams === t; })) { showToast('J\u00e1 na m\u00faltipla', 'warn'); return; }
        if (!vals.odd || vals.odd <= 1) { showToast('Odd inv\u00e1lida', 'warn'); return; }
        multiSelections.push({ teams: t, odd: vals.odd, bet: vals.bet });
        updateMultiBet();
        showToast('\uD83C\uDFB0 ' + t + ' adicionada!', 'success');
        return;
      }
      var shareBtn = e.target.closest('.share-btn');
      if (shareBtn) {
        e.stopPropagation();
        var sc = shareBtn.closest('.mc');
        var sv = getCardEditorValues(sc);
        var text = '\u26BD Consultor Futebol Pro\n\n' + shareBtn.dataset.teams + '\nAposta: ' + sv.bet + '\nOdd: ' + sv.odd;
        if (navigator.share) navigator.share({ title: 'Consultor Futebol Pro', text: text }).catch(function () {});
        else if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { showToast('\uD83D\uDCCB Copiado!', 'info'); });
      }
    });
    container.addEventListener('keydown', function (e) {
      var topPick = e.target.closest('.top-pick');
      if (topPick && (e.key === 'Enter' || e.key === ' ') && container.contains(topPick)) {
        e.preventDefault();
        selectCardPick(topPick.closest('.mc'), topPick);
        showToast('\uD83C\uDFC6 ' + topPick.dataset.betLabel + ' @ ' + topPick.dataset.odd, 'info');
        return;
      }
      var oi = e.target.closest('.oi');
      if (oi && (e.key === 'Enter' || e.key === ' ') && container.contains(oi)) {
        e.preventDefault();
        var card = oi.closest('.mc');
        card.querySelectorAll('.top-pick').forEach(function (el) { el.classList.remove('selected'); });
        selectCardMarket(card, oi);
        showToast('\uD83C\uDFAF ' + oi.dataset.betLabel + ' @ ' + oi.dataset.odd, 'info');
      }
    });
    container.addEventListener('input', function (e) {
      if (e.target.matches('.bet-odd-input, .bet-pick-input')) {
        updateCardFromEditor(e.target.closest('.mc'));
      }
    });
  }
}

function animVis() {
  if (typeof gsap === 'undefined') return;
  var vc = document.querySelectorAll('.mc:not(.hid)');
  if (vc.length > 0) gsap.from(vc, { opacity: 0, y: 12, duration: 0.35, stagger: { each: 0.05, from: 'start' }, ease: 'power1.out', clearProps: 'all' });
  var vo = document.querySelectorAll('.mc:not(.hid) .oi');
  if (vo.length > 0) gsap.from(vo, { opacity: 0, scale: 0.92, duration: 0.35, stagger: { each: 0.04, from: 'start' }, ease: 'back.out(1.4)', clearProps: 'all', delay: 0.15 });
  var t3 = document.getElementById('tab-top3');
  if (t3 && t3.classList.contains('act')) gsap.from('.t3c', { opacity: 0, y: 16, scale: 0.92, duration: 0.4, stagger: { each: 0.1, from: 'start' }, ease: 'back.out(1.4)', clearProps: 'all' });
  gsap.from('.sc', { opacity: 0, scale: 0.85, duration: 0.3, stagger: { each: 0.06, from: 'start' }, ease: 'back.out(1.4)', clearProps: 'all' });
}

function initApp(data) {
  MATCH_DATA = data.meta.stats;
  window.APP_MATCHES = {};
  data.matches.forEach(function (m) { window.APP_MATCHES[m.teams] = m; });
  renderAll(data);
  bindFilterEvents();
  bindMatchEvents();
  initCardEditors();
  updateStats();
  updateLeagueCounts();
  initComparatorSelects();
  syncStars();
  updateSavedPanel();
  updateCountdowns();
  updateQuickCombos();
  updateMultiBet();
  initBetResults();
  if (typeof initBestBet === 'function') initBestBet(data);
  checkNotifications();
  animVis();
  setInterval(updateCountdowns, 1000);
}

function loadAppData() {
  fetch('data/matches.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(initApp)
    .catch(function () {
      showToast('Erro ao carregar jogos do dia', 'warn');
    });
}

document.addEventListener('DOMContentLoaded', loadAppData);

var _origSwitchTab = switchTab;
switchTab = function (t) {
  _origSwitchTab(t);
  if (t.dataset && t.dataset.tab === 'history' && typeof updateHistoryStats === 'function') {
    setTimeout(updateHistoryStats, 100);
  }
};
