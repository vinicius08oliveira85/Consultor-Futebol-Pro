// ========== MATCH HISTORY DATA ==========
var pastMatchesData = [];
var futureMatchesData = [];

function parseHistoryDate(iso) {
  var p = iso.split('-');
  return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
}

function matchToHistoryEntry(m) {
  return {
    home: m.home,
    away: m.away,
    homeScore: null,
    awayScore: null,
    league: m.leagueLabel,
    time: m.time,
    bet: m.bet,
    odd: String(m.odds),
    result: 'pending',
    confidence: m.confidence
  };
}

function buildHistoryDays(rawDays) {
  return rawDays.map(function (day) {
    return {
      date: parseHistoryDate(day.date),
      status: day.status,
      matches: day.matches.slice()
    };
  });
}

function syncTodayFromMatches(pastDays, matches) {
  if (!matches || !matches.length) return;
  var todayIdx = pastDays.length - 1;
  if (todayIdx < 0) return;
  pastDays[todayIdx].status = 'today';
  pastDays[todayIdx].matches = matches.map(matchToHistoryEntry);
}

function loadHistoryData() {
  return Promise.all([
    fetch('data/history.json').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }),
    fetch('data/matches.json').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
  ]).then(function (results) {
    var history = results[0];
    var matchesData = results[1];
    pastMatchesData = buildHistoryDays(history.past);
    futureMatchesData = buildHistoryDays(history.future);
    syncTodayFromMatches(pastMatchesData, matchesData.matches);
    initHistoricalData();
  }).catch(function () {
    pastMatchesData = [];
    futureMatchesData = [];
    initHistoricalData();
  });
}

function formatDateShort(date) {
  var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  var dayName = days[date.getDay()];
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0');
  return dayName + ' ' + day + '/' + month;
}

function formatDateShortFuture(date) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  var diffMs = targetDate - today;
  var diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanha';
  var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  var dayName = days[targetDate.getDay()];
  var day = String(targetDate.getDate()).padStart(2, '0');
  var month = String(targetDate.getMonth() + 1).padStart(2, '0');
  return dayName + ' ' + day + '/' + month;
}

function createHistMatchHTML(match, showScore) {
  var leagueClass = match.league.toLowerCase().replace(/ /g, '-').replace('e', 'e');
  var statusClass = match.result === 'won' ? 'win' : match.result === 'lost' ? 'loss' : 'pending';
  var statusText = match.result === 'won' ? '\u2705 GANHOU' : match.result === 'lost' ? '\u274c PERDEU' : '\u23f3 Pendente';
  var scoreHtml = '';
  if (showScore && match.homeScore !== null) {
    scoreHtml = '<div class="hist-match-score"><span class="hist-team-home">' + escapeHtml(match.home) + '</span><div class="hist-score-value">' + match.homeScore + ' - ' + match.awayScore + '</div><span class="hist-team-away">' + escapeHtml(match.away) + '</span></div>';
  } else {
    scoreHtml = '<div class="hist-match-score"><span class="hist-team-home">' + escapeHtml(match.home) + '</span><div class="hist-score-value">vs</div><span class="hist-team-away">' + escapeHtml(match.away) + '</span></div>';
  }
  var oddText = match.odd ? ' @ ' + match.odd : '';
  return '<div class="hist-match league-' + leagueClass + '"><div class="hist-match-header"><span class="hist-match-league">' + match.league + '</span><span class="hist-match-time">\u23f0 ' + match.time + '</span></div>' + scoreHtml + '<div class="hist-bet-info"><span class="hist-bet-label">Aposta: ' + escapeHtml(match.bet) + oddText + '</span><span class="hist-bet-result ' + statusClass + '">' + statusText + '</span></div></div>';
}

function populateHistoryTab(tabType) {
  var data = tabType === 'past' ? pastMatchesData : futureMatchesData;
  var prefix = tabType === 'past' ? 'past' : 'future';
  for (var i = 1; i <= 7; i++) {
    var container = document.getElementById(prefix + '-matches-day' + i);
    var dateEl = document.getElementById('hist-' + prefix + '-date-' + i);
    if (container) container.innerHTML = '';
    if (dateEl && data[i - 1]) dateEl.textContent = formatDateShortFuture(data[i - 1].date);
  }
  data.forEach(function (dayData, index) {
    var container = document.getElementById(prefix + '-matches-day' + (index + 1));
    if (!container) return;
    if (dayData.matches.length === 0) {
      container.innerHTML = '<div class="hist-empty"><div class="hist-empty-icon">\ud83d\udcc5</div><div>Nenhum jogo ' + (tabType === 'past' ? 'finalizado' : 'agendado') + ' para este dia</div></div>';
      return;
    }
    var html = '';
    dayData.matches.forEach(function (match) {
      var showScore = dayData.status === 'finished' || dayData.status === 'in_progress';
      html += createHistMatchHTML(match, showScore);
    });
    container.innerHTML = html;
  });
}

function updateHistoryStats() {
  var totalGames = 0, wins = 0, totalProfit = 0;
  pastMatchesData.forEach(function (day) {
    day.matches.forEach(function (match) {
      if (match.result === 'pending') return;
      totalGames++;
      if (match.result === 'won') { wins++; totalProfit += (match.confidence / 100) * 50; }
      else if (match.result === 'lost') { totalProfit -= 50 * 0.5; }
    });
  });
  var winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
  var ge = document.getElementById('hist-week-games');
  var we = document.getElementById('hist-week-wins');
  var wre = document.getElementById('hist-week-winrate');
  var pe = document.getElementById('hist-week-profit');
  if (ge) ge.textContent = totalGames;
  if (we) we.textContent = wins;
  if (wre) wre.textContent = winRate + '%';
  if (pe) pe.textContent = 'R$ ' + Math.abs(totalProfit).toFixed(2);
  updateHistoryChart();
  updateInsights(totalGames, wins, totalProfit);
}

function updateHistoryChart() {
  var barsContainer = document.getElementById('hist-perf-bars');
  var labelsContainer = document.getElementById('hist-perf-labels');
  if (!barsContainer || !labelsContainer) return;
  barsContainer.innerHTML = '';
  labelsContainer.innerHTML = '';
  pastMatchesData.forEach(function (day) {
    var wins = 0, losses = 0;
    day.matches.forEach(function (m) {
      if (m.result === 'won') wins++;
      else if (m.result === 'lost') losses++;
    });
    var total = wins + losses;
    var dayStr = formatDateShort(day.date).split(' ')[1];
    var maxHeight = 100;
    var barContainer = document.createElement('div');
    barContainer.className = 'hist-perf-bar';
    barContainer.style.background = 'transparent';
    barContainer.style.display = 'flex';
    barContainer.style.flexDirection = 'column';
    barContainer.style.alignItems = 'stretch';
    if (total === 0) {
      barContainer.style.minHeight = '4px';
      barsContainer.appendChild(barContainer);
    } else if (wins > 0) {
      var winBar = document.createElement('div');
      winBar.className = 'hist-perf-bar won';
      winBar.style.height = ((wins / total) * maxHeight) + '%';
      winBar.style.position = 'relative';
      winBar.innerHTML = '<div class="tooltip">' + dayStr + ': ' + wins + 'W ' + losses + 'L</div>';
      barContainer.appendChild(winBar);
      if (losses > 0) {
        var lossBar = document.createElement('div');
        lossBar.className = 'hist-perf-bar lost';
        lossBar.style.height = ((losses / total) * maxHeight) + '%';
        lossBar.style.position = 'relative';
        barContainer.appendChild(lossBar);
      }
      barsContainer.appendChild(barContainer);
    } else if (losses > 0) {
      var lossOnly = document.createElement('div');
      lossOnly.className = 'hist-perf-bar lost';
      lossOnly.style.height = maxHeight + '%';
      lossOnly.style.position = 'relative';
      lossOnly.innerHTML = '<div class="tooltip">' + dayStr + ': ' + wins + 'W ' + losses + 'L</div>';
      barContainer.appendChild(lossOnly);
      barsContainer.appendChild(barContainer);
    }
    var label = document.createElement('span');
    label.textContent = dayStr;
    labelsContainer.appendChild(label);
  });
}

function updateInsights(totalGames, wins, totalProfit) {
  var insightsEl = document.getElementById('hist-insights-content');
  if (!insightsEl) return;
  var winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
  var insights = [];
  if (totalGames === 0) {
    insights.push({ icon: '\ud83d\udcca', text: 'Comece a apostar para ver seus insights de desempenho aqui!' });
  } else if (winRate >= 70) {
    insights.push({ icon: '\ud83d\udd25', text: 'Excelente desempenho! Voce acertou <strong>' + winRate + '%</strong> dos palpites na ultima semana.' });
  } else if (winRate >= 50) {
    insights.push({ icon: '\ud83d\udc4d', text: 'Desempenho acima da media com <strong>' + winRate + '%</strong> de acertos. Continue assim!' });
  } else {
    insights.push({ icon: '\ud83d\udcaa', text: 'Desempenho de <strong>' + winRate + '%</strong> nos ultimos 7 dias. Reveja suas estrategias.' });
  }
  if (totalProfit > 0) {
    insights.push({ icon: '\ud83d\udcb0', text: 'Lucro acumulado de <strong>R$ ' + totalProfit.toFixed(2) + '</strong> na ultima semana.' });
  } else if (totalProfit < 0) {
    insights.push({ icon: '\ud83d\udcc9', text: 'Prejuizo de <strong>R$ ' + Math.abs(totalProfit).toFixed(2) + '</strong> nos ultimos 7 dias.' });
  }
  if (insights.length === 0) {
    insights.push({ icon: '\ud83d\udcca', text: 'Comece a apostar para ver seus insights de desempenho aqui!' });
  }
  insightsEl.innerHTML = insights.map(function (item) {
    return '<div class="hist-insight-item"><span class="hist-insight-icon">' + item.icon + '</span><span class="hist-insight-text">' + item.text + '</span></div>';
  }).join('');
}

window.switchHistTab = function switchHistTab(tabType) {
  var tabs = document.querySelectorAll('.hist-tab');
  var panels = document.querySelectorAll('.hist-panel');
  tabs.forEach(function (tab) {
    tab.classList.remove('hist-tab-active');
    tab.classList.remove('active');
  });
  panels.forEach(function (panel) {
    panel.style.display = 'none';
    panel.classList.remove('hist-panel-active');
  });
  var targetTab = document.querySelector('.hist-tab[data-hist="' + tabType + '"]');
  var targetPanel = document.getElementById('hist-' + tabType);
  if (targetTab) targetTab.classList.add('hist-tab-active');
  if (targetPanel) {
    targetPanel.style.display = 'block';
    targetPanel.classList.add('hist-panel-active');
  }
};

function initHistoricalData() {
  populateHistoryTab('past');
  populateHistoryTab('future');
  updateHistoryStats();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHistoryData);
} else {
  loadHistoryData();
}
