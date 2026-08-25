/* Gera data/matches-2026-08-27.draft.json — node scripts/build-matches-2026-08-27.js */
var fs = require('fs');
var path = require('path');

var DATE = '2026-08-27';
var OUT = path.join(__dirname, '..', 'data', 'matches-' + DATE + '.draft.json');

function kickoff(time) { return DATE + 'T' + time + ':00-03:00'; }

function stats(p, w, gf, ga, btts, o25, cards, corners) {
  return {
    played: p, wins: w, goalsFor: gf, goalsAgainst: ga,
    avgGoals: +(gf / p).toFixed(2), avgConceded: +(ga / p).toFixed(2),
    bttsPct: btts, over25Pct: o25, avgCards: cards, avgCorners: corners
  };
}

function pick(r, market, label, odd, confidence, rationale, valueEdge) {
  return { rank: r, market: market, label: label, odd: odd, confidence: confidence, rationale: rationale, valueEdge: valueEdge || 0 };
}

function mkt(label, odd, confidence, rationale) {
  return { label: label, odd: odd, confidence: confidence, rationale: rationale };
}

function mkMarkets(resultado, gols, cartoes, escanteios) {
  return { resultado: resultado, gols: gols, cartoes: cartoes, escanteios: escanteios };
}

function buildMatch(cfg) {
  return Object.assign({}, cfg, {
    kickoff: kickoff(cfg.time),
    topPicks: cfg.topPicks,
    markets: cfg.markets
  });
}

var matches = [
  buildMatch({
    league: 'el', leagueLabel: 'Europa League', sortPriority: 1,
    teams: 'Thun x Lech Poznan', home: 'Thun', away: 'Lech Poznan',
    homeShort: 'Thun', awayShort: 'Lech',
    bet: 'Lech avança', confidence: 78, odds: 1.35, multiBetShort: 'Lech avança',
    time: '16:00',
    homeOdd: '4.80', drawOdd: '4.20', awayOdd: '1.55',
    homeProb: 20, drawProb: 24, awayProb: 56, bestOdd: 'away',
    venue: 'Stockhorn Arena, Thun', round: 'Play-off — 2º jogo',
    firstLeg: { home: 0, away: 7 },
    aggregate: '0-7 (1º jogo em Poznan)',
    form: { home: 'L-L-W-D-L', away: 'W-W-W-W-D' },
    h2h: ['20/08/2026: Lech 7-0 Thun (Poznan)'],
    keyStats: ['Lech venceu 7-0 no 1º jogo', 'Thun precisaria 8 gols de diferença', 'Lech pode administrar resultado'],
    sources: ['uefa.com', 'skysports.com'],
    analysis: [
      'Europa League play-off — 2º jogo em Thun',
      '1º jogo: Lech Poznan 7-0 Thun (20/08, Poznan)',
      'Vantagem esmagadora polonesa no agregado',
      'Thun joga por honra; Lech pode rotacionar e controlar ritmo',
      'Recomendação: Lech avança (~1.35)'
    ],
    teamStats: { home: stats(5, 1, 4, 12, 40, 35, 3.4, 4.2), away: stats(5, 4, 16, 3, 45, 70, 2.8, 6.0) },
    h2hSummary: { total: 1, homeWins: 0, draws: 0, awayWins: 1, avgGoals: 7.0, bttsPct: 0, notes: '7-0 no 1º jogo; classificação quase certa' },
    context: { stakes: '2º jogo UEL — Lech lidera 7-0', rotation: 'Lech pode poupar titulares', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Classificação', 'Lech avança', 1.35, 78, '7-0 no agregado; Thun sem margem real.', 6),
      pick(2, 'Gols', 'Menos de 2.5 gols', 1.82, 58, 'Lech administra; Thun sem pressão de classificação.', 0),
      pick(3, 'Resultado', 'Lech vence', 1.55, 56, 'Visitante superior mesmo rotacionando.', 0)
    ],
    markets: mkMarkets(
      [mkt('Lech avança', 1.35, 78, 'Classificação'), mkt('Lech vence', 1.55, 56, '90 min'), mkt('Thun vence', 4.80, 20, 'Impossível no agregado')],
      [mkt('Menos de 2.5 gols', 1.82, 58, 'Jogo administrado'), mkt('Lech vence + U2.5', 2.40, 45, 'Combo'), mkt('Mais de 2.5 gols', 1.95, 42, 'Thun ataca por orgulho')],
      [mkt('Mais de 3.5 cartões', 1.78, 50, 'Jogo mais solto'), mkt('Thun + cartões', 1.92, 46, 'Frustração mandante')],
      [mkt('Mais de 9.5 escanteios', 1.88, 48, 'Thun pressiona'), mkt('Lech + escanteios', 1.95, 44, 'Contra-ataques')]
    )
  }),
  buildMatch({
    league: 'el', leagueLabel: 'Europa League', sortPriority: 1,
    teams: 'Sion x Ajax', home: 'Sion', away: 'Ajax',
    homeShort: 'Sion', awayShort: 'Ajax',
    bet: 'Ajax avança', confidence: 75, odds: 1.40, multiBetShort: 'Ajax avança',
    time: '16:00',
    homeOdd: '3.40', drawOdd: '3.80', awayOdd: '1.95',
    homeProb: 28, drawProb: 26, awayProb: 46, bestOdd: 'away',
    venue: 'Stade de Tourbillon, Sion', round: 'Play-off — 2º jogo',
    firstLeg: { home: 2, away: 4 },
    aggregate: '2-4 (1º jogo em Amsterdã)',
    form: { home: 'W-L-D-W-L', away: 'W-W-D-W-W' },
    h2h: ['20/08/2026: Ajax 4-2 Sion (Amsterdam)'],
    keyStats: ['Ajax venceu 4-2 fora de casa no 1º jogo', 'Sion precisa vencer por 2+ gols', 'Ajax marcou 4 gols na Johan Cruijff Arena'],
    sources: ['uefa.com', 'ajax.nl'],
    analysis: [
      'Europa League play-off — 2º jogo em Sion',
      '1º jogo: Ajax 4-2 Sion (20/08, Amsterdam)',
      'Ajax leva vantagem de 2 gols no agregado',
      'Sion ataca em casa, mas elenco holandês tem qualidade superior',
      'Recomendação: Ajax avança (~1.40)'
    ],
    teamStats: { home: stats(5, 2, 8, 9, 55, 60, 3.2, 5.0), away: stats(5, 4, 14, 6, 60, 75, 2.6, 6.5) },
    h2hSummary: { total: 1, homeWins: 0, draws: 0, awayWins: 1, avgGoals: 6.0, bttsPct: 100, notes: '4-2 no 1º jogo; Sion marcou 2 gols' },
    context: { stakes: '2º jogo UEL — Ajax lidera 4-2', rotation: 'Ajax pode gerenciar vantagem', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Classificação', 'Ajax avança', 1.40, 75, 'Vantagem de 2 gols; Sion precisa goleada.', 5),
      pick(2, 'Gols', 'Ambos marcam', 1.68, 60, 'Sion marcou 2 no 1º jogo; jogo aberto esperado.', 0),
      pick(3, 'Gols', 'Mais de 2.5 gols', 1.72, 58, 'Sion precisa atacar; Ajax responde.', 0)
    ],
    markets: mkMarkets(
      [mkt('Ajax avança', 1.40, 75, 'Classificação'), mkt('Ajax vence', 1.95, 46, '90 min'), mkt('Sion vence', 3.40, 28, 'Precisa 3+ gols')],
      [mkt('Ambos marcam', 1.68, 60, 'Sion ataca em casa'), mkt('Mais de 2.5 gols', 1.72, 58, 'Jogo aberto'), mkt('Ajax vence + BTTS', 2.85, 44, 'Combo')],
      [mkt('Mais de 4.5 cartões', 1.85, 52, 'Sion pressiona'), mkt('Sion + cartões', 1.88, 50, 'Mandante intenso')],
      [mkt('Mais de 9.5 escanteios', 1.82, 52, 'Sion domina posse'), mkt('Ajax + escanteios', 1.90, 48, 'Contra-ataques')]
    )
  }),
  buildMatch({
    league: 'cf', leagueLabel: 'Conference League', sortPriority: 2,
    teams: 'Austria Vienna x Braga', home: 'Austria Vienna', away: 'Braga',
    homeShort: 'Austria', awayShort: 'Braga',
    bet: 'Braga avança', confidence: 65, odds: 1.60, multiBetShort: 'Braga avança',
    time: '16:00',
    homeOdd: '2.60', drawOdd: '3.30', awayOdd: '2.55',
    homeProb: 36, drawProb: 28, awayProb: 36, bestOdd: 'none',
    venue: 'Generali Arena, Vienna', round: 'Play-off — 2º jogo',
    firstLeg: { home: 0, away: 2 },
    aggregate: '0-2 (1º jogo em Braga)',
    form: { home: 'W-D-L-W-D', away: 'W-W-D-W-L' },
    h2h: ['21/08/2026: Braga 2-0 Austria Vienna (Braga)'],
    keyStats: ['Braga venceu 2-0 no 1º jogo', 'Austria precisa marcar 2+ gols em casa', 'Braga defendeu bem em Portugal'],
    sources: ['uefa.com', 'scbraga.pt'],
    analysis: [
      'Conference League play-off — 2º jogo em Viena',
      '1º jogo: Braga 2-0 Austria Vienna (21/08, Braga)',
      'Braga leva 2 gols de vantagem no agregado',
      'Austria joga em casa com torcida, mas precisa abrir o placar cedo',
      'Recomendação: Braga avança (~1.60)'
    ],
    teamStats: { home: stats(5, 2, 7, 8, 50, 45, 3.4, 5.2), away: stats(5, 3, 10, 5, 45, 50, 3.0, 5.5) },
    h2hSummary: { total: 1, homeWins: 0, draws: 0, awayWins: 1, avgGoals: 2.0, bttsPct: 0, notes: '2-0 Braga no 1º jogo; Austria zerado fora' },
    context: { stakes: '2º jogo UECL — Braga lidera 2-0', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Classificação', 'Braga avança', 1.60, 65, '2-0 no agregado; Braga pode administrar.', 4),
      pick(2, 'Gols', 'Menos de 2.5 gols', 1.88, 54, 'Braga fecha espaços com vantagem.', 0),
      pick(3, 'Resultado', 'Empate', 3.30, 28, '0-0 ou 1-1 classifica Braga.', 0)
    ],
    markets: mkMarkets(
      [mkt('Braga avança', 1.60, 65, 'Classificação'), mkt('Braga vence', 2.55, 36, 'Administra fora'), mkt('Austria vence', 2.60, 36, 'Precisa reverter')],
      [mkt('Menos de 2.5 gols', 1.88, 54, 'Braga defende vantagem'), mkt('Ambos marcam Não', 1.82, 52, 'Austria zerada fora'), mkt('Mais de 2.5 gols', 1.92, 48, 'Austria pressiona')],
      [mkt('Mais de 4.5 cartões', 1.90, 50, 'Jogo tenso'), mkt('Austria + cartões', 1.88, 50, 'Mandante frustra')],
      [mkt('Mais de 9.5 escanteios', 1.85, 50, 'Austria ataca'), mkt('Braga + escanteios', 1.92, 46, 'Contra-ataques')]
    )
  })
];

var leagues = [
  { id: 'el', name: 'Europa League' },
  { id: 'cf', name: 'Conference League' }
];

var top3 = [
  { rank: 'g', icon: '🥇', teams: 'Thun x Lech Poznan', pick: 'Lech avança', odd: '1.35', prob: 78, justify: '7-0 no agregado; classificação quase certa para o Lech.' },
  { rank: 's', icon: '🥈', teams: 'Sion x Ajax', pick: 'Ajax avança', odd: '1.40', prob: 75, justify: 'Ajax venceu 4-2 no 1º jogo; Sion precisa de goleada.' },
  { rank: 'b', icon: '🥉', teams: 'Austria Vienna x Braga', pick: 'Braga avança', odd: '1.60', prob: 65, justify: 'Braga lidera 2-0 no agregado após vitória em Portugal.' }
];

var combos = [
  { teams: 'Thun x Lech Poznan', flag: '🇨🇭', color: 'var(--color-orange)', rows: [
    { combo: 'Lech avança + U2.5', odd: '1.95', prob: '55%', conf: 'h' },
    { combo: 'Lech vence + BTTS Não', odd: '2.10', prob: '50%', conf: 'h' },
    { combo: 'Empate + U2.5', odd: '3.80', prob: '28%', conf: 'm' }
  ]},
  { teams: 'Sion x Ajax', flag: '🇨🇭', color: 'var(--color-gold)', rows: [
    { combo: 'Ajax avança + BTTS', odd: '2.05', prob: '52%', conf: 'h' },
    { combo: 'Ajax avança + M2.5', odd: '1.95', prob: '54%', conf: 'h' },
    { combo: 'Sion vence + M2.5', odd: '4.50', prob: '22%', conf: 'l' }
  ]},
  { teams: 'Austria Vienna x Braga', flag: '🇦🇹', color: 'var(--color-purple)', rows: [
    { combo: 'Braga avança + U2.5', odd: '2.40', prob: '45%', conf: 'm' },
    { combo: 'Empate + U2.5', odd: '3.60', prob: '30%', conf: 'm' },
    { combo: 'Braga vence + BTTS Não', odd: '3.20', prob: '35%', conf: 'm' }
  ]}
];

var quickPicks = [
  { label: 'Lech avança', odd: '1.35' },
  { label: 'Ajax avança', odd: '1.40' },
  { label: 'Braga avança', odd: '1.60' }
];

var out = {
  meta: { date: DATE, stats: { totalGames: matches.length, resolvedGames: 0, wins: 0, roi: 0 } },
  leagues: leagues,
  matches: matches,
  top3: top3,
  combos: combos,
  quickPicks: quickPicks
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log('Wrote draft:', OUT, '(' + matches.length + ' matches)');
