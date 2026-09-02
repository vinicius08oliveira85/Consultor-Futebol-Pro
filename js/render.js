/* eslint-disable no-unused-vars */
function confLevel(c) { return c >= 70 ? 'high' : c >= 55 ? 'medium' : 'low'; }

function confBadge(c) { return c === 'h' ? 'ALTA' : c === 'm' ? 'MÉDIA' : 'BAIXA'; }

function renderFilters(leagues, total) {
  var bar = document.getElementById('filter-bar');
  if (!bar) return;
  var html = '<button class="filter-btn active" data-league="all" aria-pressed="true">Todos<span class="filter-count" id="count-all">' + total + '</span></button>';
  leagues.forEach(function (lg) {
    html += '<button class="filter-btn" data-league="' + lg.id + '" aria-pressed="false">' + escapeHtml(lg.name) + '<span class="filter-count" id="count-' + lg.id + '">0</span></button>';
  });
  bar.innerHTML = html;
}

function renderTopPicks(m) {
  if (!m.topPicks || !m.topPicks.length) return '';
  var ranks = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
  var picksHtml = m.topPicks.map(function (p, i) {
    var cls = confLevel(p.confidence);
    var valueBadge = p.valueEdge >= 5 ? '<span class="tp-value">VALOR</span>' : '';
    var title = escapeHtml(p.market + ' — ' + (p.rationale || p.label));
    return '<button type="button" class="top-pick" data-bet-label="' + escapeHtml(p.label) + '" data-odd="' + p.odd + '" title="' + title + '">' +
      '<span class="tp-rank">' + (ranks[i] || p.rank) + '</span>' +
      '<span class="tp-body">' +
      '<span class="tp-market">' + escapeHtml(p.market) + valueBadge + '</span>' +
      '<span class="tp-label">' + escapeHtml(p.label) + '</span>' +
      (p.rationale ? '<span class="tp-rationale">' + escapeHtml(p.rationale) + '</span>' : '') +
      '</span>' +
      '<span class="tp-meta"><span class="tp-odd">@ ' + p.odd + '</span><span class="tp-conf ' + cls + '">' + p.confidence + '%</span></span>' +
      '</button>';
  }).join('');
  return '<div class="top-picks" aria-label="Top 3 apostas do jogo"><div class="top-picks-title">Top 3 mercados</div>' + picksHtml + '</div>';
}

function renderMatchCard(m) {
  var cls = confLevel(m.confidence);
  var extra = (m.imminent ? ' imminent' : '');
  var odds = [
    { key: 'home', label: m.homeShort, odd: m.homeOdd, prob: m.homeProb },
    { key: 'draw', label: 'Empate', odd: m.drawOdd, prob: m.drawProb },
    { key: 'away', label: m.awayShort, odd: m.awayOdd, prob: m.awayProb }
  ];
  var oddsHtml = odds.map(function (o) {
    var best = m.bestOdd === o.key ? ' best' : '';
    var betLabel = o.key === 'draw' ? 'Empate' : o.label + ' vence';
    return '<div class="oi' + best + '" tabindex="0" role="button" data-market="' + o.key + '" data-bet-label="' + escapeHtml(betLabel) + '" data-odd="' + o.odd + '"><div class="ol">' + escapeHtml(o.label) + '</div><div class="ov">' + o.odd + '</div><div class="op">' + o.prob + '%</div></div>';
  }).join('');
  var analysisHtml = m.analysis.map(function (line) {
    if (line.indexOf('Recomendação:') === 0) return '<li><strong>Recomendação:</strong> ' + escapeHtml(line.replace('Recomendação: ', '')) + '</li>';
    return '<li>' + escapeHtml(line) + '</li>';
  }).join('');
  return '<article class="mc ' + m.league + extra + '" data-league="' + m.league + '" data-teams="' + escapeHtml(m.teams) + '" data-bet="' + escapeHtml(m.bet) + '" data-confidence="' + m.confidence + '" data-odds="' + m.odds + '" data-time="' + m.time + '" data-sort-priority="' + m.sortPriority + '" data-home="' + escapeHtml(m.home) + '" data-away="' + escapeHtml(m.away) + '" data-home-odd="' + m.homeOdd + '" data-draw-odd="' + m.drawOdd + '" data-away-odd="' + m.awayOdd + '" data-home-prob="' + m.homeProb + '" data-draw-prob="' + m.drawProb + '" data-away-prob="' + m.awayProb + '">' +
    '<button class="save-btn" aria-label="Salvar aposta ' + escapeHtml(m.teams) + '" aria-pressed="false" title="Salvar aposta">\u2606</button>' +
    '<button class="share-btn" aria-label="Compartilhar" data-teams="' + escapeHtml(m.teams) + '" data-bet="' + escapeHtml(m.bet) + '" data-odd="' + m.odds + '">\uD83D\uDCE4</button>' +
    '<div class="mh"><span class="lb ' + m.league + '">' + escapeHtml(m.leagueLabel) + '</span><span class="mt">\uD83D\uDD50 ' + m.time + ' BRT</span><span class="countdown" data-kickoff="' + m.kickoff + '"></span></div>' +
    '<div class="mteams"><span class="th">' + escapeHtml(m.home) + '</span><div class="vs" aria-hidden="true">VS</div><span class="ta">' + escapeHtml(m.away) + '</span></div>' +
    '<div class="mc-bet"><span class="mc-bet-label">' + escapeHtml(m.bet) + '</span><span class="mc-bet-odd">@ ' + m.odds + '</span><span class="mc-bet-conf">' + m.confidence + '%</span></div>' +
    '<div class="og" role="group" aria-label="Odds do jogo">' + oddsHtml + '</div>' +
    renderTopPicks(m) +
    '<div class="bet-editor" aria-label="Minha aposta">' +
    '<div class="bet-editor-head"><span class="bet-pick-label">Minha aposta</span><button type="button" class="bet-use-suggested" aria-label="Usar aposta sugerida">\u21A9 Sugerida</button></div>' +
    '<div class="bet-editor-row">' +
    '<input type="text" class="bet-pick-input" value="' + escapeHtml(m.bet) + '" aria-label="Descri\u00e7\u00e3o da aposta">' +
    '<label class="bet-odd-wrap"><span class="bet-odd-prefix">@</span><input type="number" class="bet-odd-input" step="0.01" min="1.01" value="' + m.odds + '" aria-label="Odd da aposta"></label>' +
    '</div>' +
    '<button type="button" class="bet-save-btn">\u2605 Salvar aposta</button>' +
    '</div>' +
    '<div class="confidence-bar"><div class="confidence-fill ' + cls + '" style="width:' + m.confidence + '%"></div></div>' +
    '<div class="confidence-label"><span class="cl-text">Confian\u00e7a</span><span class="cl-value ' + cls + '">' + m.confidence + '%</span></div>' +
    '<div class="mc-actions">' +
    '<button class="add-to-multi" data-teams="' + escapeHtml(m.teams) + '" data-odd="' + m.odds + '" data-bet="' + escapeHtml(m.multiBetShort) + '">+ M\u00faltipla</button>' +
    '<button class="result-btn pending" data-teams="' + escapeHtml(m.teams) + '" data-result="pending" onclick="toggleBetResult(this)">\u23F3 Pendente</button>' +
    '<button class="detail-btn" onclick="openMatchDetail(this.closest(\'.mc\'))">\uD83D\uDCCB Detalhes</button>' +
    '</div>' +
    '<div class="as"><div class="as-toggle" role="button" tabindex="0" aria-expanded="false"><span class="arrow">\u25B6</span> \uD83D\uDCCA An\u00e1lise</div><div class="as-content"><ul class="ap">' + analysisHtml + '</ul></div></div>' +
    '</article>';
}

function renderMatches(matches) {
  var container = document.getElementById('matches-container');
  if (!container) return;
  container.innerHTML = matches.map(renderMatchCard).join('');
}

function renderTop3(items) {
  var container = document.getElementById('top3-container');
  if (!container) return;
  var rankColors = { g: 'var(--color-gold)', s: '#94A3B8', b: 'var(--color-orange)' };
  container.innerHTML = items.map(function (t) {
    var color = rankColors[t.rank] || 'var(--color-accent)';
    return '<div class="t3c ' + t.rank + '"><div class="rk" style="color:' + color + ';border-color:' + color + '">' + t.icon + '</div><h3>' + escapeHtml(t.teams) + '</h3><div class="pk">' + escapeHtml(t.pick) + '</div><div class="od">' + t.odd + '</div><div class="pd">Probabilidade: ' + t.prob + '%</div><div class="jst">' + escapeHtml(t.justify) + '</div></div>';
  }).join('');
}

function renderCombos(combos) {
  var container = document.getElementById('combos-tables');
  if (!container) return;
  container.innerHTML = combos.map(function (c) {
    var rows = c.rows.map(function (r) {
      return '<tr><td>' + escapeHtml(r.combo) + '</td><td class="co">' + r.odd + '</td><td class="cp">' + r.prob + '</td><td><span class="cb ' + r.conf + '">' + confBadge(r.conf) + '</span></td></tr>';
    }).join('');
    return '<h3 style="color:' + c.color + ';font-family:\'Segoe UI\',\'Inter\',sans-serif;font-size:.85rem;margin:var(--space-md) 0 var(--space-sm)">' + c.flag + ' ' + escapeHtml(c.teams) + '</h3>' +
      '<table class="ctbl"><thead><tr><th>Combina\u00e7\u00e3o</th><th>Odd</th><th>Prob.</th><th>Confian\u00e7a</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }).join('');
}

function renderCalcOptions(matches, quickPicks) {
  var sel = document.getElementById('calc-odds');
  if (sel) {
    var opts = '<option value="">Selecione...</option>';
    matches.forEach(function (m) {
      opts += '<option value="' + m.odds + '">' + m.odds + ' \u2014 ' + escapeHtml(m.bet.length > 30 ? m.bet.substring(0, 28) + '\u2026' : m.bet) + '</option>';
    });
    opts += '<option value="custom">Odd personalizada</option>';
    sel.innerHTML = opts;
  }
  var tbody = document.querySelector('#quick-combos-table tbody');
  if (tbody && quickPicks) {
    tbody.innerHTML = quickPicks.map(function (p) {
      return '<tr><td>' + escapeHtml(p.label) + '</td><td class="co">' + p.odd + '</td><td>R$ 0,00</td><td>R$ 0,00</td></tr>';
    }).join('');
  }
}

function renderAll(data) {
  renderFilters(data.leagues, data.matches.length);
  renderMatches(data.matches);
  renderTop3(data.top3);
  renderCombos(data.combos);
  renderCalcOptions(data.matches, data.quickPicks);
}
