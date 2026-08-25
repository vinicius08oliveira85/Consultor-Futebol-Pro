// ========== MATCH HISTORY DATA ==========
var pastMatchesData = [
  {
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    status: 'finished',
    matches: [
      { home: 'Flamengo', away: 'Palmeiras', homeScore: 2, awayScore: 1, league: 'Brasileirão', time: '21:00', bet: 'Flamengo vence', result: 'won', confidence: 72 }
    ]
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 1000),
    status: 'finished',
    matches: [
      { home: 'Barcelona', away: 'Real Madrid', homeScore: 3, awayScore: 2, league: 'La Liga', time: '16:00', bet: 'Gol de Benzema', result: 'won', confidence: 65 },
      { home: 'Liverpool', away: 'Chelsea', homeScore: 1, awayScore: 1, league: 'Premier League', time: '13:30', bet: 'Empate', result: 'lost', confidence: 45 }
    ]
  },
  {
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    status: 'in_progress',
    matches: [
      { home: 'Juventus', away: 'Inter Milan', homeScore: 1, awayScore: 0, league: 'Serie A', time: '20:45', bet: 'Juventus vence', result: 'pending', confidence: 58 }
    ]
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'scheduled',
    matches: [
      { home: 'Bayern Munich', away: 'Dortmund', homeScore: null, awayScore: null, league: 'Champions League', time: '21:00', bet: 'Mais de 2.5 gols', result: 'pending', confidence: 78 },
      { home: 'Atletico Madrid', away: 'Sevilla', homeScore: null, awayScore: null, league: 'La Liga', time: '18:30', bet: 'BTTS Sim', result: 'pending', confidence: 62 }
    ]
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'scheduled',
    matches: [
      { home: 'Paris SG', away: 'Lyon', homeScore: null, awayScore: null, league: 'Ligue 1', time: '21:00', bet: 'Paris vence', result: 'pending', confidence: 70 }
    ]
  },
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'scheduled',
    matches: [
      { home: 'Arsenal', away: 'Man City', homeScore: null, awayScore: null, league: 'Premier League', time: '17:30', bet: 'Under 2.5', result: 'pending', confidence: 55 }
    ]
  },
  {
    date: new Date(),
    status: 'today',
    matches: [
      { home: 'Nottm Forest', away: 'Leeds', homeScore: null, awayScore: null, league: 'EFL Cup', time: '16:00', bet: 'Under 2.5', result: 'pending', confidence: 62 },
      { home: 'Al Nassr', away: 'Al Ittifaq', homeScore: null, awayScore: null, league: 'Saudi Pro', time: '15:00', bet: 'Al Nassr vence', result: 'pending', confidence: 78 }
    ]
  }
];

var futureMatchesData = [
  {
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    status: 'tomorrow',
    matches: [
      { home: 'AC Milan', away: 'Roma', homeScore: null, awayScore: null, league: 'Serie A', time: '20:45', bet: 'Milan vence', confidence: 65 },
      { home: 'Atletico Madrid', away: 'Real Betis', homeScore: null, awayScore: null, league: 'La Liga', time: '18:30', bet: 'BTTS Yes', confidence: 58 }
    ]
  },
  {
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    matches: [
      { home: 'Chelsea', away: 'Arsenal', homeScore: null, awayScore: null, league: 'Premier League', time: '17:30', bet: 'Draw or Chelsea', confidence: 55 },
      { home: 'Inter Milan', away: 'Juventus', homeScore: null, awayScore: null, league: 'Serie A', time: '20:45', bet: 'Under 2.5', confidence: 60 }
    ]
  },
  {
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    matches: [
      { home: 'Barcelona', away: 'Atletico Madrid', homeScore: null, awayScore: null, league: 'La Liga', time: '21:00', bet: 'BTTS Yes', confidence: 68 }
    ]
  },
  {
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    matches: [
      { home: 'Man City', away: 'Liverpool', homeScore: null, awayScore: null, league: 'Premier League', time: '17:30', bet: 'Man City vence', confidence: 52 },
      { home: 'Bayern', away: 'Dortmund', homeScore: null, awayScore: null, league: 'Bundesliga', time: '20:30', bet: 'Over 3.5', confidence: 65 }
    ]
  },
  {
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    matches: [
      { home: 'Napoli', away: 'Milan', homeScore: null, awayScore: null, league: 'Serie A', time: '20:45', bet: 'Napoli or Draw', confidence: 60 }
    ]
  },
  {
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    matches: [
      { home: 'PSG', away: 'Lyon', homeScore: null, awayScore: null, league: 'Ligue 1', time: '21:00', bet: 'PSG -1.5', confidence: 55 },
      { home: 'Real Madrid', away: 'Sevilla', homeScore: null, awayScore: null, league: 'La Liga', time: '21:00', bet: 'Real Madrid -1', confidence: 62 }
    ]
  },
  {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    matches: [
      { home: 'Arsenal', away: 'Chelsea', homeScore: null, awayScore: null, league: 'Premier League', time: '17:30', bet: 'BTTS Yes', confidence: 65 }
    ]
  }
];

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
  return '<div class="hist-match league-' + leagueClass + '"><div class="hist-match-header"><span class="hist-match-league">' + match.league + '</span><span class="hist-match-time">\u23f0 ' + match.time + '</span></div>' + scoreHtml + '<div class="hist-bet-info"><span class="hist-bet-label">Aposta: ' + escapeHtml(match.bet) + '</span><span class="hist-bet-result ' + statusClass + '">' + statusText + '</span></div></div>';
}

function populateHistoryTab(tabType) {
  var data = tabType === 'past' ? pastMatchesData : futureMatchesData;
  var prefix = tabType === 'past' ? 'past' : 'future';
  for (var i = 1; i <= 7; i++) {
    var container = document.getElementById(prefix + '-matches-day' + i);
    var dateEl = document.getElementById(prefix + '-date-' + i);
    if (container) container.innerHTML = '';
    if (dateEl) dateEl.textContent = formatDateShortFuture(data[i-1].date);
  }
  data.forEach(function(dayData, index) {
    var container = document.getElementById(prefix + '-matches-day' + (index + 1));
    if (!container) return;
    if (dayData.matches.length === 0) {
      container.innerHTML = '<div class="hist-empty"><div class="hist-empty-icon">\ud83d\udcc5</div><div>Nenhum jogo ' + (tabType === 'past' ? 'finalizado' : 'agendado') + ' para este dia</div></div>';
      return;
    }
    var html = '';
    dayData.matches.forEach(function(match) {
      var showScore = dayData.status === 'finished' || dayData.status === 'in_progress';
      html += createHistMatchHTML(match, showScore);
    });
    container.innerHTML = html;
  });
}

function updateHistoryStats() {
  var totalGames = 0, wins = 0, totalProfit = 0;
  pastMatchesData.forEach(function(day) {
    day.matches.forEach(function(match) {
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
  pastMatchesData.forEach(function(day) {
    var wins = 0, losses = 0;
    day.matches.forEach(function(m) {
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
    if (wins > 0) {
      var winBar = document.createElement('div');
      winBar.className = 'hist-perf-bar won';
      winBar.style.height = ((wins / total) * maxHeight) + '%';
      winBar.style.position = 'relative';
      winBar.innerHTML = '<div class="tooltip">' + dayStr + ': ' + wins + 'W ' + losses + 'L</div>';
      barContainer.appendChild(winBar);
    }
    if (losses > 0 && wins === 0) {
      var lossBar = document.createElement('div');
      lossBar.className = 'hist-perf-bar lost';
      lossBar.style.height = ((losses / total) * maxHeight) + '%';
      lossBar.style.position = 'relative';
      lossBar.innerHTML = '<div class="tooltip">' + dayStr + ': ' + wins + 'W ' + losses + 'L</div>';
      barContainer.appendChild(lossBar);
    }
    barsContainer.appendChild(barContainer);
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
  insightsEl.innerHTML = insights.map(function(item) {
    return '<div class="hist-insight-item"><span class="hist-insight-icon">' + item.icon + '</span><span class="hist-insight-text">' + item.text + '</span></div>';
  }).join('');
}

// ========== HISTORY TAB SWITCHER ==========
window.switchHistTab = function switchHistTab(tabType) {
  var tabs = document.querySelectorAll('.hist-tab');
  var panels = document.querySelectorAll('.hist-panel');
  tabs.forEach(function(tab) {
    tab.classList.remove('hist-tab-active');
    tab.classList.remove('active');
  });
  panels.forEach(function(panel) {
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
}

// ========== INIT HISTORICAL DATA ==========
function initHistoricalData() {
  populateHistoryTab('past');
  populateHistoryTab('future');
  updateHistoryStats();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initHistoricalData, 200);
  });
} else {
  setTimeout(initHistoricalData, 200);
}
