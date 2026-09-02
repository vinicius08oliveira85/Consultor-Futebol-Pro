// ========== BEST BET COMBINATIONS ==========
// Generates up to 3 recommended combos of 2-3 matches each, with combined odd > 2.00
// and the highest available probability. For matches without analysis, derives
// a recent-form (last 5-10 games) score from teamStats to enrich the recommendation.

(function () {
  var STRATEGY_FNS = {
    probability: function (combo) { return combo.probability; },
    value: function (combo) { return combo.probability * combo.odds; },
    balanced: function (combo) {
      // reward combos whose combined odd is near 2.5 and probability is high
      var oddScore = 1 - Math.min(1, Math.abs(Math.log(combo.odds / 2.5)));
      return combo.probability * 0.7 + oddScore * 0.3;
    }
  };

  function getRecentForm(teamStats) {
    if (!teamStats) return { formScore: 50, last5Goals: 1.0, last5Conceded: 1.2, note: 'Forma recente indisponível' };
    var played = Math.max(teamStats.played || 5, 1);
    var winPct = (teamStats.wins || 0) / played;
    var goalsFor = teamStats.goalsFor || 0;
    var goalsAgainst = teamStats.goalsAgainst || 0;
    var last5Goals = teamStats.avgGoals || +(goalsFor / played).toFixed(2);
    var last5Conceded = teamStats.avgConceded || +(goalsAgainst / played).toFixed(2);
    // Composite form score: weights wins (40%), goals scored (30%), goals conceded inverse (20%), btts (10%)
    var bttsScore = (teamStats.bttsPct || 50) / 100;
    var overScore = (teamStats.over25Pct || 50) / 100;
    var formScore = Math.round(
      winPct * 100 * 0.40 +
      Math.min(40, last5Goals * 12) * 0.30 +
      Math.max(0, 40 - last5Conceded * 10) * 0.20 +
      bttsScore * 10
    );
    return {
      formScore: Math.max(20, Math.min(95, formScore)),
      last5Goals: last5Goals,
      last5Conceded: last5Conceded,
      overScore: overScore,
      note: 'Forma recente (últimos ' + played + ' jogos): ' + Math.round(winPct * 100) + '% vitórias, ' + last5Goals + ' gols/jogo.'
    };
  }

  function deriveProbability(match, fallbackForm) {
    // Use match.confidence (the main bet's probability). If missing, derive from 1X2 homeProb (mandante) or
    // the home team's recent form when available.
    if (typeof match.confidence === 'number' && match.confidence > 0) return match.confidence;
    if (match.homeProb && match.bet && match.bet.toLowerCase().indexOf(match.homeShort.toLowerCase()) >= 0) return match.homeProb;
    if (match.awayProb && match.bet && match.bet.toLowerCase().indexOf(match.awayShort.toLowerCase()) >= 0) return match.awayProb;
    return fallbackForm.formScore;
  }

  function deriveAnalysis(match) {
    if (Array.isArray(match.analysis) && match.analysis.length) return match.analysis;
    var home = getRecentForm(match.teamStats && match.teamStats.home);
    var away = getRecentForm(match.teamStats && match.teamStats.away);
    return [
      'Análise gerada automaticamente a partir de estatísticas recentes (sem texto editorial).',
      'Forma ' + match.home + ': ' + home.note,
      'Forma ' + match.away + ': ' + away.note,
      'Média combinada de gols esperada: ' + (home.last5Goals + away.last5Goals).toFixed(2) + ' por jogo.',
      'BTTS estimado: ' + Math.round(((home.overScore + away.overScore) / 2) * 100) + '%.',
      'Recomendação: ' + match.bet
    ];
  }

  function combosOf(arr, k) {
    if (k === 1) return arr.map(function (x) { return [x]; });
    var out = [];
    for (var i = 0; i <= arr.length - k; i++) {
      var head = arr[i];
      var rest = combosOf(arr.slice(i + 1), k - 1);
      rest.forEach(function (c) { out.push([head].concat(c)); });
    }
    return out;
  }

  function bestCombinations(matches, options) {
    options = options || {};
    var minOdd = options.minOdd || 2.0;
    var maxPicks = options.maxPicks || 3;
    var strategy = options.strategy || 'probability';
    if (!matches || !matches.length) return [];

    // Enrich each match with derived form + probability
    var enriched = matches.map(function (m) {
      var home = getRecentForm(m.teamStats && m.teamStats.home);
      var away = getRecentForm(m.teamStats && m.teamStats.away);
      return {
        teams: m.teams,
        league: m.leagueLabel || m.league,
        bet: m.bet,
        odd: Number(m.odds) || 0,
        probability: deriveProbability(m, home),
        time: m.time,
        match: m,
        homeForm: home,
        awayForm: away,
        analysis: deriveAnalysis(m)
      };
    }).filter(function (m) { return m.odd >= 1.05 && m.probability > 0; });

    if (enriched.length < 2) return [];

    var candidates = [];
    for (var k = 2; k <= Math.min(maxPicks, enriched.length); k++) {
      combosOf(enriched, k).forEach(function (group) {
        var odd = group.reduce(function (acc, x) { return acc * x.odd; }, 1);
        if (odd < minOdd) return;
        // combined probability assuming independence
        var prob = group.reduce(function (acc, x) { return acc * (x.probability / 100); }, 1) * 100;
        candidates.push({
          picks: group,
          odds: odd,
          probability: prob,
          size: group.length
        });
      });
    }

    var scoreFn = STRATEGY_FNS[strategy] || STRATEGY_FNS.probability;
    candidates.sort(function (a, b) { return scoreFn(b) - scoreFn(a); });

    // Pick up to 3 distinct, non-overlapping combos
    var picked = [];
    var used = {};
    for (var i = 0; i < candidates.length && picked.length < 3; i++) {
      var c = candidates[i];
      var overlap = c.picks.some(function (p) { return used[p.teams]; });
      if (overlap) continue;
      picked.push(c);
      c.picks.forEach(function (p) { used[p.teams] = true; }
      );
    }
    return picked;
  }

  function renderBest(container, combos, options) {
    if (!container) return;
    if (!combos.length) {
      container.innerHTML = '';
      var empty = document.getElementById('best-empty');
      if (empty) empty.style.display = 'block';
      return;
    }
    var empty = document.getElementById('best-empty');
    if (empty) empty.style.display = 'none';
    var html = combos.map(function (combo, idx) {
      var medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
      var picks = combo.picks.map(function (p) {
        var hasAnalysis = Array.isArray(p.match.analysis) && p.match.analysis.length;
        var enriched = !hasAnalysis;
        return '<li class="best-pick">' +
          '<div class="best-pick-head"><span class="best-pick-league">' + escapeHtml(p.league) + '</span><span class="best-pick-time">' + escapeHtml(p.time) + ' BRT</span></div>' +
          '<div class="best-pick-teams">' + escapeHtml(p.teams) + '</div>' +
          '<div class="best-pick-bet"><span class="best-bet-label">' + escapeHtml(p.bet) + '</span><span class="best-bet-odd">@ ' + p.odd.toFixed(2) + '</span><span class="best-bet-prob">' + p.probability.toFixed(0) + '%</span></div>' +
          (enriched ? '<details class="best-pick-analysis"><summary>📊 Análise derivada da forma recente</summary><ul>' + p.analysis.map(function (l) { return '<li>' + escapeHtml(l) + '</li>'; }).join('') + '</ul></details>' : '') +
          '</li>';
      }).join('');
      return '<article class="best-combo ' + (idx === 0 ? 'best-combo-top' : '') + '">' +
        '<header class="best-combo-header">' +
        '<span class="best-combo-medal">' + medal + '</span>' +
        '<span class="best-combo-title">Combinação ' + (idx + 1) + ' — ' + combo.size + ' seleções</span>' +
        '<span class="best-combo-odd">Odd ' + combo.odds.toFixed(2) + '</span>' +
        '</header>' +
        '<ul class="best-picks">' + picks + '</ul>' +
        '<footer class="best-combo-footer">' +
        '<span>Probabilidade combinada: <strong>' + combo.probability.toFixed(1) + '%</strong></span>' +
        '<span>Retorno R$100 → <strong>R$ ' + (combo.odds * 100).toFixed(2) + '</strong></span>' +
        '<span>Valor: <strong>' + (combo.probability * combo.odds / 100).toFixed(2) + '</strong></span>' +
        '<button class="best-add" data-combo="' + idx + '">+ Múltipla</button>' +
        '</footer>' +
        '</article>';
    }).join('');
    container.innerHTML = html;
  }

  function initBestBet(data) {
    if (!data || !data.matches) return;
    var container = document.getElementById('best-container');
    var refresh = document.getElementById('best-refresh');
    if (!container) return;

    function compute() {
      var minOdd = parseFloat(document.getElementById('best-min-odd').value) || 2.0;
      var maxPicks = parseInt(document.getElementById('best-max-picks').value, 10) || 3;
      var strategy = document.getElementById('best-strategy').value;
      var combos = bestCombinations(data.matches, { minOdd: minOdd, maxPicks: maxPicks, strategy: strategy });
      renderBest(container, combos);
      window.BEST_COMBOS = combos;
    }

    if (refresh) refresh.addEventListener('click', compute);
    ['best-min-odd', 'best-max-picks', 'best-strategy'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', compute);
    });
    container.addEventListener('click', function (e) {
      var addBtn = e.target.closest('.best-add');
      if (!addBtn) return;
      var idx = parseInt(addBtn.dataset.combo, 10);
      var combo = (window.BEST_COMBOS || [])[idx];
      if (!combo) return;
      var added = 0;
      combo.picks.forEach(function (p) {
        if (window.multiSelections && window.multiSelections.some(function (x) { return x.teams === p.teams; })) return;
        if (typeof window.multiSelections !== 'undefined' && window.multiSelections) {
          window.multiSelections.push({ teams: p.teams, odd: p.odd, bet: p.bet });
          added++;
        }
      });
      if (added && typeof window.showToast === 'function') {
        window.showToast('🎰 ' + added + ' jogo(s) adicionado(s) à múltipla', 'success');
      }
      if (typeof window.updateMultiBet === 'function') window.updateMultiBet();
    });
    compute();
  }

  window.initBestBet = initBestBet;
  window.bestCombinations = bestCombinations;
})();
