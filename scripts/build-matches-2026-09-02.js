/* Gera data/matches.json para 2026-09-02 — node scripts/build-matches-2026-09-02.js */
var fs = require('fs');
var path = require('path');

function kickoff(time) { return '2026-09-02T' + time + ':00-03:00'; }

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

function mkMarkets(resultado, gols, cartoes, escanteios, extra) {
  var o = { resultado: resultado, gols: gols, cartoes: cartoes, escanteios: escanteios };
  if (extra) Object.assign(o, extra);
  return o;
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
    league: 'ci', leagueLabel: 'Coppa Italia', sortPriority: 3,
    teams: 'Udinese x Venezia', home: 'Udinese', away: 'Venezia',
    homeShort: 'Udinese', awayShort: 'Venezia',
    bet: 'Udinese vence', confidence: 70, odds: 1.55, multiBetShort: 'Udinese vence',
    time: '13:00',
    homeOdd: '1.55', drawOdd: '3.90', awayOdd: '5.80',
    homeProb: 62, drawProb: 24, awayProb: 14, bestOdd: 'home',
    venue: 'Bluenergy Stadium, Udine', round: '32-avos',
    form: { home: 'W-D-W-L-W', away: 'L-D-L-D-L' },
    h2h: ['Udinese venceu os últimos 3 confrontos em casa'],
    keyStats: ['Udinese Serie A, mandante forte', 'Venezia em dificuldade fora', 'Diferença de divisão favorável ao mandante'],
    sources: ['livescore.com', 'corrieredellosport.it'],
    analysis: [
      'Coppa Italia — 32-avos no Bluenergy Stadium',
      'Udinese: Serie A, elenco superior e apoio da torcida',
      'Venezia: visitante em má fase, vem de sequência negativa',
      'Histórico recente muito favorável ao mandante',
      'Recomendação: Udinese vence (~1.55)'
    ],
    teamStats: { home: stats(4, 3, 8, 4, 55, 50, 2.8, 5.5), away: stats(4, 0, 2, 8, 35, 25, 3.6, 3.8) },
    h2hSummary: { total: 3, homeWins: 3, draws: 0, awayWins: 0, avgGoals: 2.6, bttsPct: 33, notes: 'Udinese dominante em casa no histórico' },
    context: { stakes: 'Coppa Italia — Serie A vs visitante inferior', rotation: 'Udinese pode poupar alguns titulares', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Udinese vence', 1.55, 70, 'Serie A superior; Venezia em crise.', 6),
      pick(2, 'Gols', 'Menos de 3.5 gols', 1.45, 65, 'Mandante controla ritmo em casa.', 0),
      pick(3, 'Resultado', 'Udinese vence + U2.5', 2.30, 48, 'Combo seguro para jogo de Copa.', 0)
    ],
    markets: mkMarkets(
      [mkt('Udinese vence', 1.55, 62, 'Favorito claro'), mkt('Empate', 3.90, 24, 'Prorrogação possível'), mkt('Venezia vence', 5.80, 14, 'Azarão')],
      [mkt('Menos de 2.5 gols', 1.85, 58, 'Udinese controla'), mkt('Udinese vence + U2.5', 2.30, 48, 'Combo'), mkt('Ambos marcam Não', 1.72, 55, 'Venezia sem攻击力')],
      [mkt('Mais de 3.5 cartões', 1.80, 50, 'Jogo eliminatório'), mkt('Venezia + cartões', 2.05, 46, 'Visitante com faltas')],
      [mkt('Mais de 9.5 escanteios', 1.88, 50, 'Udinese pressiona'), mkt('Udinese + escanteios', 1.65, 58, 'Mandante domina')]
    )
  }),
  buildMatch({
    league: 'dfb', leagueLabel: 'DFB-Pokal', sortPriority: 1,
    teams: 'VfL Osnabrück x Bayern München', home: 'VfL Osnabrück', away: 'Bayern München',
    homeShort: 'Osnabrück', awayShort: 'Bayern',
    bet: 'Bayern vence + Mais de 2.5', confidence: 78, odds: 1.62, multiBetShort: 'Bayern -1.5',
    time: '15:45',
    homeOdd: '13.00', drawOdd: '7.50', awayOdd: '1.18',
    homeProb: 5, drawProb: 12, awayProb: 83, bestOdd: 'away',
    venue: 'Bremer Brücke, Osnabrück', round: '1ª rodada',
    form: { home: 'W-D-L-D-L', away: 'W-W-W-W-D' },
    h2h: ['Encontro recente: Bayern 4-0 Osnabrück (DFB-Pokal 2019)'],
    keyStats: ['Bayern atual campeão da Bundesliga e da Pokal', 'Osnabrück recém-promovido da 3. Liga', 'Diferença técnica brutal entre os elencos'],
    sources: ['dfb.de', 'kicker.de'],
    analysis: [
      'DFB-Pokal — 1ª rodada na Bremer Brücke',
      'Bayern: campeão alemão, entra com força máxima',
      'Osnabrück: 2. Bundesliga, zebra improvável em casa',
      'Histórico DFB-Pokal muito favorável ao Bayern',
      'Recomendação: Bayern vence + M2.5 (~1.62)'
    ],
    teamStats: { home: stats(4, 1, 4, 8, 40, 35, 3.4, 4.2), away: stats(5, 4, 14, 4, 60, 70, 2.0, 7.0) },
    h2hSummary: { total: 1, homeWins: 0, draws: 0, awayWins: 1, avgGoals: 4.0, bttsPct: 0, notes: 'Bayern goleou no último encontro' },
    context: { stakes: 'DFB-Pokal R1 — Bayern entra forte', rotation: 'Bayern pode rotacionar após Supercup', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Bayern vence + M2.5', 1.62, 78, 'Diferença técnica brutal; Bayern marca muito.', 8),
      pick(2, 'Resultado', 'Bayern vence', 1.18, 83, '83% implícito no 1X2.', 0),
      pick(3, 'Handicap', 'Bayern -2.5', 1.85, 60, 'Handicap asiático viável para esse confronto.', 5)
    ],
    markets: mkMarkets(
      [mkt('Bayern vence', 1.18, 83, 'Favoritíssimo'), mkt('Empate', 7.50, 12, 'Prorrogação improvável'), mkt('Osnabrück vence', 13.00, 5, 'Zebra histórica')],
      [mkt('Bayern vence + M2.5', 1.62, 78, 'Combo principal'), mkt('Mais de 3.5 gols', 1.85, 65, 'Ataque do Bayern'), mkt('Bayern vence + M3.5', 2.20, 55, 'Mais gols')],
      [mkt('Mais de 3.5 cartões', 1.85, 52, 'Jogo físico'), mkt('Osnabrück + cartões', 1.95, 50, 'Underdog com faltas')],
      [mkt('Mais de 10.5 escanteios', 1.82, 58, 'Bayern domina'), mkt('Bayern + escanteios', 1.45, 65, 'Pressão constante')]
    )
  }),
  buildMatch({
    league: 'ec', leagueLabel: 'EFL Championship', sortPriority: 2,
    teams: 'Burnley x Middlesbrough', home: 'Burnley', away: 'Middlesbrough',
    homeShort: 'Burnley', awayShort: 'Middlesbrough',
    bet: 'Burnley vence ou empata', confidence: 64, odds: 1.32, multiBetShort: 'Burnley DNB',
    time: '16:00',
    homeOdd: '1.85', drawOdd: '3.50', awayOdd: '4.20',
    homeProb: 52, drawProb: 27, awayProb: 21, bestOdd: 'home',
    venue: 'Turf Moor, Burnley', round: 'Rodada 5',
    form: { home: 'W-W-D-W-W', away: 'D-L-W-D-L' },
    h2h: ['Burnley venceu 2 dos últimos 3 em Turf Moor'],
    keyStats: ['Burnley forte em casa no Championship', 'Middlesbrough em fase irregular', 'Confronto direto por playoff'],
    sources: ['skysports.com', 'fwp.co'],
    analysis: [
      'Championship — Rodada 5 em Turf Moor',
      'Burnley: boa campanha, mandante sólido',
      'Middlesbrough: visitante em má fase, defesa vazando',
      'Histórico recente favorece o Burnley em casa',
      'Recomendação: Burnley vence ou empata (~1.32)'
    ],
    teamStats: { home: stats(4, 3, 7, 3, 55, 50, 2.6, 5.8), away: stats(4, 1, 4, 6, 45, 40, 3.2, 4.5) },
    h2hSummary: { total: 3, homeWins: 2, draws: 0, awayWins: 1, avgGoals: 2.3, bttsPct: 50, notes: 'Burnley leva vantagem em Turf Moor' },
    context: { stakes: 'Championship — disputa por playoff', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Burnley vence ou empata', 1.32, 64, 'Burnley forte em casa; valor no DNB.', 5),
      pick(2, 'Resultado', 'Burnley vence', 1.85, 52, '52% implícito no 1X2.', 0),
      pick(3, 'Gols', 'Menos de 2.5 gols', 1.90, 56, 'Burnley controla jogos em casa.', 0)
    ],
    markets: mkMarkets(
      [mkt('Burnley vence', 1.85, 52, 'Mandante'), mkt('Empate', 3.50, 27, 'Middlesbrough segura'), mkt('Middlesbrough vence', 4.20, 21, 'Azarão')],
      [mkt('Menos de 2.5 gols', 1.90, 56, 'Jogo controlado'), mkt('Burnley vence + U2.5', 2.75, 44, 'Combo'), mkt('Ambos marcam', 1.75, 54, 'Ataques perigosos')],
      [mkt('Mais de 3.5 cartões', 1.80, 50, 'Jogo brigado'), mkt('Middlesbrough + cartões', 2.00, 47, 'Visitante duro')],
      [mkt('Mais de 9.5 escanteios', 1.88, 50, 'Jogo equilibrado'), mkt('Burnley + escanteios', 1.70, 55, 'Mandante pressiona')]
    )
  }),
  buildMatch({
    league: 'br', leagueLabel: 'Brasileirão Série A', sortPriority: 1,
    teams: 'Flamengo x Mirassol', home: 'Flamengo', away: 'Mirassol',
    homeShort: 'Flamengo', awayShort: 'Mirassol',
    bet: 'Flamengo vence + M1.5', confidence: 76, odds: 1.55, multiBetShort: 'Fla vence',
    time: '19:30',
    homeOdd: '1.40', drawOdd: '4.50', awayOdd: '7.50',
    homeProb: 70, drawProb: 20, awayProb: 10, bestOdd: 'home',
    venue: 'Maracanã, Rio de Janeiro', round: 'Rodada',
    form: { home: 'W-W-D-W-W', away: 'L-L-D-L-W' },
    h2h: ['Flamengo venceu últimos 4 confrontos'],
    keyStats: ['Flamengo forte em casa no Maracanã', 'Mirassol em zona de risco no Brasileirão', 'Diferença técnica grande entre os elencos'],
    sources: ['ge.globo.com', 'espn.com.br'],
    analysis: [
      'Brasileirão — Flamengo no Maracanã',
      'Flamengo: disputando título, mandante sólido',
      'Mirassol: luta contra rebaixamento, visitante frágil',
      'Histórico muito favorável ao Rubro-Negro',
      'Recomendação: Flamengo vence + M1.5 (~1.55)'
    ],
    teamStats: { home: stats(5, 4, 12, 4, 55, 65, 2.6, 6.2), away: stats(5, 1, 4, 9, 40, 35, 3.4, 4.0) },
    h2hSummary: { total: 4, homeWins: 4, draws: 0, awayWins: 0, avgGoals: 2.8, bttsPct: 50, notes: 'Flamengo dominante no histórico' },
    context: { stakes: 'Brasileirão — Flamengo pelo título', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Flamengo vence + M1.5', 1.55, 76, 'Mandante forte; Mirassol em crise.', 7),
      pick(2, 'Resultado', 'Flamengo vence', 1.40, 70, '70% implícito no 1X2.', 0),
      pick(3, 'Gols', 'Mais de 2.5 gols', 1.75, 60, 'Flamengo marca bastante em casa.', 4)
    ],
    markets: mkMarkets(
      [mkt('Flamengo vence', 1.40, 70, 'Favorito'), mkt('Empate', 4.50, 20, 'Mirassol segura'), mkt('Mirassol vence', 7.50, 10, 'Azarão')],
      [mkt('Flamengo vence + M1.5', 1.55, 76, 'Combo principal'), mkt('Mais de 2.5 gols', 1.75, 60, 'Ataque do Fla'), mkt('Flamengo -1.5', 1.95, 58, 'Handicap viável')],
      [mkt('Mais de 3.5 cartões', 1.80, 50, 'Jogo tenso'), mkt('Mirassol + cartões', 2.10, 46, 'Visitante com faltas')],
      [mkt('Mais de 10.5 escanteios', 1.85, 55, 'Flamengo domina'), mkt('Flamengo + escanteios', 1.50, 62, 'Pressão constante')]
    )
  }),
  buildMatch({
    league: 'ca', leagueLabel: 'Copa Argentina', sortPriority: 2,
    teams: 'Vélez Sarsfield x Boca Juniors', home: 'Vélez Sarsfield', away: 'Boca Juniors',
    homeShort: 'Vélez', awayShort: 'Boca',
    bet: 'Mais de 2.5 gols', confidence: 60, odds: 1.85, multiBetShort: 'M2.5',
    time: '21:15',
    homeOdd: '2.40', drawOdd: '3.20', awayOdd: '2.90',
    homeProb: 42, drawProb: 30, awayProb: 28, bestOdd: 'none',
    venue: 'Estadio José Amalfitani, Buenos Aires', round: 'Oitavas',
    form: { home: 'W-D-W-L-D', away: 'D-W-W-D-W' },
    h2h: ['Últimos 3 confrontos: 2 empates e 1 vitória do Boca'],
    keyStats: ['Clássico argentino equilibrado', 'Vélez forte em casa', 'Boca com elenco superior em visitante'],
    sources: ['ole.com.ar', 'espn.com.ar'],
    analysis: [
      'Copa Argentina — Oitavas no Amalfitani',
      'Vélez: mandante forte, busca semifinal',
      'Boca: favorito no papel, veio de boa fase',
      'Confrontos recentes marcados por equilíbrio',
      'Recomendação: Mais de 2.5 gols (~1.85)'
    ],
    teamStats: { home: stats(4, 2, 6, 4, 55, 50, 3.0, 5.0), away: stats(4, 3, 7, 3, 50, 50, 2.8, 5.5) },
    h2hSummary: { total: 3, homeWins: 0, draws: 2, awayWins: 1, avgGoals: 2.3, bttsPct: 67, notes: 'Confrontos equilibrados com gols' },
    context: { stakes: 'Copa Argentina — oitavas de final', rotation: 'Boca pode poupar alguns titulares', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Gols', 'Mais de 2.5 gols', 1.85, 60, 'Confrontos equilibrados com gols.', 5),
      pick(2, 'Gols', 'Ambos marcam', 1.72, 58, 'BTTS em 67% do histórico.', 0),
      pick(3, 'Resultado', 'Empate', 3.20, 30, 'Padrão de empates no confronto.', 0)
    ],
    markets: mkMarkets(
      [mkt('Vélez vence', 2.40, 42, 'Mandante'), mkt('Empate', 3.20, 30, 'Padrão do confronto'), mkt('Boca vence', 2.90, 28, 'Visitante')],
      [mkt('Mais de 2.5 gols', 1.85, 60, 'Jogo aberto'), mkt('Ambos marcam', 1.72, 58, 'BTTS recomendado'), mkt('Menos de 2.5 gols', 1.95, 48, 'Cautela defensiva')],
      [mkt('Mais de 4.5 cartões', 1.85, 52, 'Clássico tenso'), mkt('Boca + cartões', 2.05, 47, 'Visitante agressivo')],
      [mkt('Mais de 9.5 escanteios', 1.88, 50, 'Equilibrado'), mkt('Vélez + escanteios', 1.85, 52, 'Mandante')]
    )
  }),
  buildMatch({
    league: 'cb', leagueLabel: 'Copa do Brasil', sortPriority: 1,
    teams: 'Santos x Palmeiras', home: 'Santos', away: 'Palmeiras',
    homeShort: 'Santos', awayShort: 'Palmeiras',
    bet: 'Ambos marcam', confidence: 62, odds: 1.72, multiBetShort: 'BTTS Sim',
    time: '21:30',
    homeOdd: '3.20', drawOdd: '3.40', awayOdd: '2.20',
    homeProb: 32, drawProb: 28, awayProb: 40, bestOdd: 'none',
    venue: 'Vila Belmiro, Santos', round: 'Quartas de final',
    aggregate: 'Jogo único (Vila Belmiro)',
    form: { home: 'D-W-L-D-W', away: 'W-W-D-W-W' },
    h2h: ['Último clássico: Palmeiras 2-1 Santos (Brasileirão)'],
    keyStats: ['Clássico Paulista equilibrado', 'Palmeiras favorito no agregado', 'Santos forte em casa na Vila Belmiro'],
    sources: ['ge.globo.com', 'lance.com.br'],
    analysis: [
      'Copa do Brasil — Quartas na Vila Belmiro',
      'Santos: mandante, precisa vencer para classificar',
      'Palmeiras: favorito, vem de boa sequência',
      'Clássico equilibrado historicamente',
      'Recomendação: Ambos marcam (~1.72)'
    ],
    teamStats: { home: stats(5, 2, 7, 6, 60, 55, 3.2, 5.5), away: stats(5, 4, 10, 4, 55, 60, 2.6, 6.0) },
    h2hSummary: { total: 5, homeWins: 2, draws: 1, awayWins: 2, avgGoals: 2.4, bttsPct: 60, notes: 'Clássico equilibrado com gols' },
    context: { stakes: 'Copa do Brasil — quartas de final (jogo único)', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Gols', 'Ambos marcam', 1.72, 62, 'BTTS em 60% do histórico; jogo decisivo.', 5),
      pick(2, 'Gols', 'Mais de 2.5 gols', 1.80, 58, 'Clássico costuma ter gols.', 0),
      pick(3, 'Resultado', 'Palmeiras vence ou empata', 1.45, 66, 'Favorito no agregado.', 0)
    ],
    markets: mkMarkets(
      [mkt('Santos vence', 3.20, 32, 'Mandante'), mkt('Empate', 3.40, 28, 'Penalidades possíveis'), mkt('Palmeiras vence', 2.20, 40, 'Favorito')],
      [mkt('Ambos marcam', 1.72, 62, 'BTTS recomendado'), mkt('Mais de 2.5 gols', 1.80, 58, 'Jogo aberto'), mkt('Menos de 2.5 gols', 2.00, 45, 'Defesas podem segurar')],
      [mkt('Mais de 4.5 cartões', 1.85, 55, 'Clássico tenso'), mkt('Santos + cartões', 1.95, 50, 'Mandante agressivo')],
      [mkt('Mais de 10.5 escanteios', 1.85, 55, 'Jogo intenso'), mkt('Palmeiras + escanteios', 1.80, 54, 'Visitante pressiona')]
    )
  }),
  buildMatch({
    league: 'cb', leagueLabel: 'Copa do Brasil', sortPriority: 1,
    teams: 'Vitória x Vasco', home: 'Vitória', away: 'Vasco',
    homeShort: 'Vitória', awayShort: 'Vasco',
    bet: 'Vasco vence ou empata', confidence: 58, odds: 1.55, multiBetShort: 'Vasco DNB',
    time: '21:30',
    homeOdd: '2.70', drawOdd: '3.30', awayOdd: '2.55',
    homeProb: 36, drawProb: 29, awayProb: 35, bestOdd: 'none',
    venue: 'Barradão, Salvador', round: 'Quartas de final',
    aggregate: 'Jogo único (Barradão)',
    form: { home: 'W-L-D-W-D', away: 'W-D-W-W-L' },
    h2h: ['Vasco venceu 2 dos últimos 3 confrontos'],
    keyStats: ['Confronto direto por vaga na semifinal', 'Vasco melhor campanha na Copa', 'Vitória forte em casa no Barradão'],
    sources: ['ge.globo.com', 'lance.com.br'],
    analysis: [
      'Copa do Brasil — Quartas no Barradão',
      'Vitória: mandante, busca semifinal histórica',
      'Vasco: melhor campanha, favoritismo no agregado',
      'Confronto equilibrado com duas equipes em alta',
      'Recomendação: Vasco vence ou empata (~1.55)'
    ],
    teamStats: { home: stats(4, 2, 6, 5, 50, 50, 3.4, 5.2), away: stats(4, 3, 7, 4, 55, 50, 2.8, 5.5) },
    h2hSummary: { total: 3, homeWins: 1, draws: 0, awayWins: 2, avgGoals: 2.0, bttsPct: 50, notes: 'Vasco leva vantagem recente' },
    context: { stakes: 'Copa do Brasil — quartas de final (jogo único)', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Vasco vence ou empata', 1.55, 58, 'Vasco melhor campanha; valor no DNB.', 4),
      pick(2, 'Gols', 'Menos de 2.5 gols', 1.85, 56, 'Jogo truncado esperado.', 0),
      pick(3, 'Gols', 'Ambos marcam', 1.78, 54, 'Ataques perigosos de ambos.', 0)
    ],
    markets: mkMarkets(
      [mkt('Vitória vence', 2.70, 36, 'Mandante'), mkt('Empate', 3.30, 29, 'Penalidades possíveis'), mkt('Vasco vence', 2.55, 35, 'Favorito visitante')],
      [mkt('Menos de 2.5 gols', 1.85, 56, 'Jogo truncado'), mkt('Ambos marcam', 1.78, 54, 'Ataques perigosos'), mkt('Mais de 2.5 gols', 1.95, 50, 'Jogo pode abrir')],
      [mkt('Mais de 4.5 cartões', 1.85, 52, 'Jogo decisivo'), mkt('Vitória + cartões', 1.95, 50, 'Mandante com garra')],
      [mkt('Mais de 9.5 escanteios', 1.88, 50, 'Jogo brigado'), mkt('Vasco + escanteios', 1.85, 52, 'Visitante pressiona')]
    )
  })
];

var data = {
  meta: {
    date: '2026-09-02',
    stats: { totalGames: matches.length, resolvedGames: 0, wins: 0, roi: 0 }
  },
  leagues: [
    { id: 'dfb', name: 'DFB-Pokal' },
    { id: 'br', name: 'Brasileirão' },
    { id: 'cb', name: 'Copa do Brasil' },
    { id: 'ca', name: 'Copa Argentina' },
    { id: 'ec', name: 'EFL Championship' },
    { id: 'ci', name: 'Coppa Italia' }
  ],
  matches: matches,
  top3: [
    { rank: 'g', icon: '🥇', teams: 'Flamengo x Mirassol', pick: 'Flamengo vence + M1.5', odd: '1.55', prob: 76, justify: 'Brasileirão — mandante forte contra equipe em zona de risco.' },
    { rank: 's', icon: '🥈', teams: 'VfL Osnabrück x Bayern', pick: 'Bayern vence + M2.5', odd: '1.62', prob: 78, justify: 'DFB-Pokal — Bayern goleia em sequência e defesa do Osnabrück é frágil.' },
    { rank: 'b', icon: '🥉', teams: 'Santos x Palmeiras', pick: 'Ambos marcam', odd: '1.72', prob: 62, justify: 'Copa do Brasil — clássico com 60% de BTTS no histórico.' }
  ],
  combos: [
    {
      teams: 'Flamengo x Mirassol', flag: '🇧🇷', color: 'var(--color-accent)',
      rows: [
        { combo: 'Flamengo vence + M1.5', odd: '1.55', prob: '76%', conf: 'h' },
        { combo: 'Flamengo -1.5', odd: '1.95', prob: '58%', conf: 'h' },
        { combo: 'Flamengo vence + M2.5', odd: '1.90', prob: '60%', conf: 'h' }
      ]
    },
    {
      teams: 'Bayern x Osnabrück', flag: '🇩🇪', color: 'var(--color-blue)',
      rows: [
        { combo: 'Bayern vence + M2.5', odd: '1.62', prob: '78%', conf: 'h' },
        { combo: 'Bayern vence + M3.5', odd: '2.20', prob: '55%', conf: 'm' },
        { combo: 'Bayern -2.5 asiático', odd: '1.85', prob: '60%', conf: 'h' }
      ]
    },
    {
      teams: 'Santos x Palmeiras', flag: '🇧🇷', color: 'var(--color-gold)',
      rows: [
        { combo: 'BTTS + M2.5 gols', odd: '2.05', prob: '52%', conf: 'h' },
        { combo: 'Palmeiras vence + BTTS', odd: '3.40', prob: '32%', conf: 'l' },
        { combo: 'Empate + BTTS', odd: '4.20', prob: '26%', conf: 'l' }
      ]
    },
    {
      teams: 'Udinese x Venezia', flag: '🇮🇹', color: 'var(--color-orange)',
      rows: [
        { combo: 'Udinese vence + U2.5', odd: '2.30', prob: '48%', conf: 'm' },
        { combo: 'Udinese vence', odd: '1.55', prob: '62%', conf: 'h' },
        { combo: 'Udinese -1.5', odd: '2.40', prob: '45%', conf: 'm' }
      ]
    },
    {
      teams: 'Vitória x Vasco', flag: '🇧🇷', color: 'var(--color-purple)',
      rows: [
        { combo: 'Vasco DNB + U2.5', odd: '2.10', prob: '50%', conf: 'm' },
        { combo: 'BTTS + M1.5', odd: '1.95', prob: '54%', conf: 'h' },
        { combo: 'Vasco vence + BTTS Não', odd: '3.50', prob: '30%', conf: 'l' }
      ]
    }
  ],
  quickPicks: [
    { label: 'Flamengo vence + M1.5', odd: '1.55' },
    { label: 'Bayern vence + M2.5', odd: '1.62' },
    { label: 'Santos x Palmeiras BTTS', odd: '1.72' }
  ]
};

var out = path.join(__dirname, '..', 'data', 'matches.json');
fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log('Wrote', out, 'with', matches.length, 'matches');
