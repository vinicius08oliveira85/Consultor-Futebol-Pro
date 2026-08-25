/* Gera data/matches.json para 2026-08-26 — node scripts/build-matches-2026-08-26.js */
var fs = require('fs');
var path = require('path');

function kickoff(time) { return '2026-08-26T' + time + ':00-03:00'; }

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
    league: 'cf', leagueLabel: 'Conference League', sortPriority: 1,
    teams: 'Rapid Wien x Hearts', home: 'Rapid Wien', away: 'Hearts',
    homeShort: 'Rapid', awayShort: 'Hearts',
    bet: 'Mais de 2.5 gols', confidence: 58, odds: 1.82, multiBetShort: 'M2.5',
    time: '13:45',
    homeOdd: '2.15', drawOdd: '3.40', awayOdd: '3.20',
    homeProb: 44, drawProb: 28, awayProb: 28, bestOdd: 'none',
    venue: 'Allianz Stadion, Vienna', round: 'Play-off — 2º jogo',
    aggregate: '2-2 (1º jogo em Edinburgh)',
    form: { home: 'W-D-W-L-W', away: 'W-W-D-L-W' },
    h2h: ['20/08/2026: Hearts 2-2 Rapid (Tynecastle)'],
    keyStats: ['1º jogo terminou 2-2 com 4 gols', 'Hearts marcou 2 fora; Rapid precisa vencer', 'Ambos times atacaram no primeiro jogo'],
    sources: ['uefa.com', 'heartsfc.co.uk'],
    analysis: [
      'Conference League play-off — 2º jogo em Viena',
      '1º jogo: Hearts 2-2 Rapid (Wilson, McPake / Raux-Yao, Wurmbrand)',
      'Empate no agregado; vencedor do 2º jogo avança à fase de liga',
      'Partida aberta no 1º jogo — mercado de gols com valor',
      'Recomendação: Mais de 2.5 gols (~1.82)'
    ],
    teamStats: { home: stats(5, 3, 11, 8, 70, 65, 3.6, 5.8), away: stats(5, 3, 10, 7, 65, 60, 3.4, 5.2) },
    h2hSummary: { total: 1, homeWins: 0, draws: 1, awayWins: 0, avgGoals: 4.0, bttsPct: 100, notes: '2-2 no 1º jogo; decisão em Viena' },
    context: { stakes: '2º jogo — empate no agregado', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Gols', 'Mais de 2.5 gols', 1.82, 58, '1º jogo teve 4 gols; ambos precisam atacar.', 4),
      pick(2, 'Resultado', 'Rapid vence', 2.15, 44, 'Mandante austríaco em decisão caseira.', 0),
      pick(3, 'Gols', 'Ambos marcam', 1.68, 55, 'BTTS em 100% do confronto atual.', 0)
    ],
    markets: mkMarkets(
      [mkt('Rapid vence', 2.15, 44, 'Decisão em casa'), mkt('Empate', 3.40, 28, 'Prorrogação'), mkt('Hearts vence', 3.20, 28, 'Classificação fora')],
      [mkt('Mais de 2.5 gols', 1.82, 58, 'Jogo aberto esperado'), mkt('Ambos marcam', 1.68, 55, 'Ataque de ambos'), mkt('Menos de 2.5 gols', 2.00, 45, 'Possível cautela')],
      [mkt('Mais de 4.5 cartões', 1.85, 52, 'Jogo eliminatório'), mkt('Hearts + cartões', 2.05, 46, 'Visitante com faltas')],
      [mkt('Mais de 9.5 escanteios', 1.88, 50, 'Times ofensivos'), mkt('Rapid + escanteios', 1.92, 48, 'Pressão mandante')]
    )
  }),
  buildMatch({
    league: 'ec', leagueLabel: 'EFL Cup', sortPriority: 2,
    teams: 'Bradford x Burnley', home: 'Bradford', away: 'Burnley',
    homeShort: 'Bradford', awayShort: 'Burnley',
    bet: 'Burnley vence', confidence: 68, odds: 1.50, multiBetShort: 'Burnley vence',
    time: '15:45',
    homeOdd: '3.60', drawOdd: '3.50', awayOdd: '1.95',
    homeProb: 27, drawProb: 28, awayProb: 45, bestOdd: 'away',
    venue: 'University of Bradford Stadium', round: '2ª rodada',
    form: { home: 'W-L-D-W-L', away: 'W-W-L-D-W' },
    h2h: ['Burnley venceu 2 dos últimos 3 encontros'],
    keyStats: ['Burnley da Premier League', 'Bradford League Two', 'Burnley favorito claro no mercado'],
    sources: ['skysports.com', 'fwp.co'],
    analysis: [
      'Carabao Cup 2ª rodada — Valley Parade',
      'Bradford: time da 4ª divisão, busca zebra em casa',
      'Burnley: recém-promovido/rebaixado PL, elenco superior',
      'Diferença de divisão favorece visitante',
      'Recomendação: Burnley vence (~1.50)'
    ],
    teamStats: { home: stats(4, 2, 5, 7, 50, 45, 3.2, 4.5), away: stats(4, 3, 8, 5, 55, 55, 2.8, 5.8) },
    h2hSummary: { total: 3, homeWins: 0, draws: 1, awayWins: 2, avgGoals: 2.3, bttsPct: 45, notes: 'Burnley superior nos últimos jogos' },
    context: { stakes: 'Carabao Cup — PL vs League Two', rotation: 'Burnley pode rotacionar parcialmente', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Burnley vence', 1.50, 68, 'PL vs League Two; odd 1.95 no 1X2.', 6),
      pick(2, 'Gols', 'Menos de 2.5 gols', 1.88, 55, 'Burnley pode controlar após abrir placar.', 0),
      pick(3, 'Cartões', 'Mais de 3.5 cartões', 1.72, 52, 'Bradford intensifica marcação.', 0)
    ],
    markets: mkMarkets(
      [mkt('Burnley vence', 1.95, 45, 'Favorito'), mkt('Empate', 3.50, 28, 'Bradford em casa'), mkt('Bradford vence', 3.60, 27, 'Azarão')],
      [mkt('Menos de 2.5 gols', 1.88, 55, 'Burnley administra'), mkt('Burnley vence + U2.5', 2.60, 42, 'Combo'), mkt('Ambos marcam', 2.05, 48, 'Bradford pode marcar')],
      [mkt('Mais de 3.5 cartões', 1.72, 52, 'Jogo físico'), mkt('Bradford + cartões', 1.95, 48, 'Underdog com faltas')],
      [mkt('Mais de 9.5 escanteios', 1.90, 48, 'Burnley domina'), mkt('Burnley + escanteios', 1.75, 54, 'Visitante pressiona')]
    )
  }),
  buildMatch({
    league: 'ec', leagueLabel: 'EFL Cup', sortPriority: 2,
    teams: 'Newcastle x West Brom', home: 'Newcastle', away: 'West Brom',
    homeShort: 'Newcastle', awayShort: 'West Brom',
    bet: 'Newcastle vence', confidence: 76, odds: 1.42, multiBetShort: 'Newcastle vence',
    time: '15:45',
    homeOdd: '1.42', drawOdd: '4.40', awayOdd: '7.00',
    homeProb: 70, drawProb: 22, awayProb: 8, bestOdd: 'home',
    venue: "St James' Park", round: '2ª rodada',
    form: { home: 'W-W-D-W-W', away: 'L-W-D-L-D' },
    h2h: ['Newcastle venceu 3 dos últimos 4 vs West Brom'],
    keyStats: ['Newcastle PL em casa', 'West Brom Championship', 'Magpies favoritos pesados (1.42)'],
    sources: ['skysports.com', 'fwp.co'],
    analysis: [
      "Carabao Cup 2ª rodada — St James' Park",
      'Newcastle: elenco PL, forte em casa',
      'West Brom: Championship, rotaciona menos que PL',
      'Histórico recente favorece mandante',
      'Recomendação: Newcastle vence (~1.42)'
    ],
    teamStats: { home: stats(5, 4, 12, 4, 50, 60, 2.6, 6.5), away: stats(4, 1, 4, 8, 40, 35, 3.4, 4.2) },
    h2hSummary: { total: 4, homeWins: 3, draws: 0, awayWins: 1, avgGoals: 2.5, bttsPct: 40, notes: 'Newcastle dominou recentemente' },
    context: { stakes: 'PL vs Championship', rotation: 'Newcastle pode poupar 2-3 titulares', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Newcastle vence', 1.42, 76, '70% implícito; PL em casa vs Championship.', 8),
      pick(2, 'Gols', 'Newcastle vence + M2.5', 1.85, 62, 'Magpies marcam 2.4 gols/jogo em casa.', 5),
      pick(3, 'Escanteios', 'Newcastle + escanteios', 1.55, 58, 'Domínio de posse esperado.', 0)
    ],
    markets: mkMarkets(
      [mkt('Newcastle vence', 1.42, 70, 'Favorito claro'), mkt('Empate', 4.40, 22, 'West Brom busca empate'), mkt('West Brom vence', 7.00, 8, 'Azarão')],
      [mkt('Mais de 2.5 gols', 1.75, 58, 'Newcastle ataca'), mkt('Newcastle -1.5', 1.88, 55, 'Handicap'), mkt('Ambos marcam Não', 1.72, 54, 'West Brom ataque fraco')],
      [mkt('Mais de 3.5 cartões', 1.80, 50, 'Jogo controlado'), mkt('West Brom + cartões', 2.15, 44, 'Visitante frustra')],
      [mkt('Mais de 10.5 escanteios', 1.85, 52, 'Newcastle domina'), mkt('Newcastle + escanteios', 1.55, 58, 'Mandante pressiona')]
    )
  }),
  buildMatch({
    league: 'ec', leagueLabel: 'EFL Cup', sortPriority: 2,
    teams: 'Tottenham x Charlton', home: 'Tottenham', away: 'Charlton',
    homeShort: 'Tottenham', awayShort: 'Charlton',
    bet: 'Tottenham -1.5', confidence: 72, odds: 1.68, multiBetShort: 'Spurs -1.5',
    time: '15:45',
    homeOdd: '1.32', drawOdd: '5.20', awayOdd: '9.00',
    homeProb: 76, drawProb: 16, awayProb: 8, bestOdd: 'home',
    venue: 'Tottenham Hotspur Stadium', round: '2ª rodada',
    form: { home: 'W-W-W-D-W', away: 'L-D-W-L-D' },
    h2h: ['Tottenham venceu últimos 3 confrontos'],
    keyStats: ['Spurs PL pesado favorito (1.32)', 'Charlton League One', 'Handicap -1.5 com valor'],
    sources: ['skysports.com', 'fwp.co'],
    analysis: [
      'Carabao Cup 2ª rodada — Tottenham Hotspur Stadium',
      'Tottenham: elenco PL de alto nível em casa',
      'Charlton: 3ª divisão, dificuldade contra PL',
      'Mercado espera vitória confortável dos Spurs',
      'Recomendação: Tottenham -1.5 (~1.68)'
    ],
    teamStats: { home: stats(5, 4, 14, 5, 55, 70, 2.4, 7.2), away: stats(4, 1, 5, 9, 35, 40, 3.6, 3.8) },
    h2hSummary: { total: 3, homeWins: 3, draws: 0, awayWins: 0, avgGoals: 3.0, bttsPct: 33, notes: 'Tottenham 3V seguidas' },
    context: { stakes: 'PL vs League One', rotation: 'Spurs deve rotacionar mas manter qualidade', injuries: [], referee: null },
    topPicks: [
      pick(1, 'Handicap', 'Tottenham -1.5', 1.68, 72, 'PL vs L1; Spurs marcam 2.8 gols/jogo.', 7),
      pick(2, 'Resultado', 'Tottenham vence', 1.32, 76, '76% implícito no mercado.', 0),
      pick(3, 'Gols', 'Mais de 2.5 gols', 1.62, 65, 'Diferença de nível gera gols.', 5)
    ],
    markets: mkMarkets(
      [mkt('Tottenham vence', 1.32, 76, 'Favorito'), mkt('Empate', 5.20, 16, 'Charlton defende'), mkt('Charlton vence', 9.00, 8, 'Azarão')],
      [mkt('Tottenham -1.5', 1.68, 72, 'Handicap recomendado'), mkt('Mais de 2.5 gols', 1.62, 65, 'Jogo aberto'), mkt('Tottenham vence + M2.5', 1.75, 60, 'Combo')],
      [mkt('Mais de 3.5 cartões', 1.78, 48, 'Charlton com faltas'), mkt('Charlton + cartões', 2.05, 45, 'Underdog')],
      [mkt('Mais de 10.5 escanteios', 1.82, 52, 'Spurs dominam'), mkt('Tottenham + escanteios', 1.48, 62, 'Pressão constante')]
    )
  }),
  buildMatch({
    league: 'ec', leagueLabel: 'EFL Cup', sortPriority: 2,
    teams: 'Preston x Everton', home: 'Preston', away: 'Everton',
    homeShort: 'Preston', awayShort: 'Everton',
    bet: 'Everton vence', confidence: 70, odds: 1.55, multiBetShort: 'Everton vence',
    time: '16:00',
    homeOdd: '3.80', drawOdd: '3.60', awayOdd: '1.85',
    homeProb: 26, drawProb: 28, awayProb: 46, bestOdd: 'away',
    venue: 'Deepdale', round: '2ª rodada',
    form: { home: 'W-L-D-W-L', away: 'W-D-W-L-W' },
    h2h: ['Everton venceu 2 dos últimos 3'],
    keyStats: ['Everton PL visitante', 'Preston Championship em Deepdale', 'Toffees favoritos'],
    sources: ['skysports.com', 'fwp.co'],
    analysis: [
      'Carabao Cup 2ª rodada — Deepdale',
      'Preston: Championship, defende bem em casa',
      'Everton: PL, busca avançar com elenco superior',
      'Visitante favorito no mercado (1.85)',
      'Recomendação: Everton vence (~1.55)'
    ],
    teamStats: { home: stats(4, 2, 6, 6, 50, 50, 3.4, 5.0), away: stats(4, 3, 9, 5, 55, 55, 2.8, 5.5) },
    h2hSummary: { total: 3, homeWins: 1, draws: 0, awayWins: 2, avgGoals: 2.3, bttsPct: 50, notes: 'Everton levou vantagem recente' },
    context: { stakes: 'PL vs Championship', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Resultado', 'Everton vence', 1.55, 70, 'PL superior; 46% implícito no 1X2.', 6),
      pick(2, 'Gols', 'Ambos marcam', 1.78, 56, 'Preston marca em casa com regularidade.', 0),
      pick(3, 'Cartões', 'Mais de 4.5 cartões', 1.82, 52, 'Preston jogo físico em Deepdale.', 0)
    ],
    markets: mkMarkets(
      [mkt('Everton vence', 1.85, 46, 'Favorito'), mkt('Empate', 3.60, 28, 'Preston em casa'), mkt('Preston vence', 3.80, 26, 'Azarão')],
      [mkt('Ambos marcam', 1.78, 56, 'Preston ataca em casa'), mkt('Everton vence + BTTS', 2.90, 45, 'Combo'), mkt('Menos de 2.5 gols', 1.92, 48, 'Jogo fechado')],
      [mkt('Mais de 4.5 cartões', 1.82, 52, 'Jogo físico'), mkt('Preston + cartões', 1.88, 50, 'Mandante')],
      [mkt('Mais de 9.5 escanteios', 1.85, 50, 'Everton domina'), mkt('Everton + escanteios', 1.78, 53, 'Visitante pressiona')]
    )
  }),
  buildMatch({
    league: 'cl', leagueLabel: 'Champions League', sortPriority: 1,
    teams: 'AEK Athens x Levski Sofia', home: 'AEK Athens', away: 'Levski Sofia',
    homeShort: 'AEK', awayShort: 'Levski',
    bet: 'AEK avança', confidence: 74, odds: 1.48, multiBetShort: 'AEK avança',
    time: '16:00',
    homeOdd: '1.55', drawOdd: '3.90', awayOdd: '5.50',
    homeProb: 64, drawProb: 25, awayProb: 11, bestOdd: 'home',
    venue: 'OPAP Arena, Athens', round: 'Play-off — 2º jogo',
    firstLeg: { home: 0, away: 0 },
    aggregate: '0-0 (1º jogo em Sofia)',
    form: { home: 'W-W-D-W-W', away: 'W-D-W-W-D' },
    h2h: ['18/08/2026: Levski 0-0 AEK (Sofia)'],
    keyStats: ['0-0 no 1º jogo — tudo em aberto', 'AEK forte em casa na OPAP Arena', 'Levski precisa marcar fora'],
    sources: ['uefa.com', 'espn.com'],
    analysis: [
      'Play-off UCL — 2º jogo em Atenas',
      '1º jogo: Levski 0-0 AEK (18/08, Sofia)',
      'Empate no agregado; qualquer vitória classifica',
      'AEK mandante com apoio da torcida grega',
      'Recomendação: AEK avança (~1.48)'
    ],
    teamStats: { home: stats(5, 4, 10, 3, 40, 45, 3.2, 6.0), away: stats(5, 3, 7, 4, 35, 40, 3.0, 4.8) },
    h2hSummary: { total: 1, homeWins: 0, draws: 1, awayWins: 0, avgGoals: 0, bttsPct: 0, notes: '0-0 no 1º jogo' },
    context: { stakes: '2º jogo UCL — 0-0 no agregado', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Classificação', 'AEK avança', 1.48, 74, 'Mandante forte; Levski não marcou fora.', 8),
      pick(2, 'Gols', 'Menos de 2.5 gols', 1.85, 58, '1º jogo 0-0; tendência cautelosa.', 0),
      pick(3, 'Resultado', 'AEK vence', 1.55, 64, 'Vitória no 90 min classifica.', 0)
    ],
    markets: mkMarkets(
      [mkt('AEK avança', 1.48, 74, 'Classificação'), mkt('AEK vence', 1.55, 64, '90 min'), mkt('Levski vence', 5.50, 11, 'Azarão')],
      [mkt('Menos de 2.5 gols', 1.85, 58, '0-0 no 1º jogo'), mkt('Ambos marcam Não', 1.78, 55, 'Defesas sólidas'), mkt('Mais de 2.5 gols', 1.95, 48, 'AEK pressiona')],
      [mkt('Mais de 4.5 cartões', 1.88, 50, 'Jogo tenso'), mkt('Levski + cartões', 2.00, 47, 'Visitante frustra')],
      [mkt('Mais de 9.5 escanteios', 1.82, 52, 'AEK domina'), mkt('AEK + escanteios', 1.65, 58, 'Mandante')]
    )
  }),
  buildMatch({
    league: 'cl', leagueLabel: 'Champions League', sortPriority: 1,
    teams: 'Viking x GNK Dinamo', home: 'Viking', away: 'GNK Dinamo',
    homeShort: 'Viking', awayShort: 'Dinamo',
    bet: 'Mais de 2.5 gols', confidence: 60, odds: 1.78, multiBetShort: 'M2.5',
    time: '16:00',
    homeOdd: '2.20', drawOdd: '3.50', awayOdd: '3.00',
    homeProb: 43, drawProb: 27, awayProb: 30, bestOdd: 'none',
    venue: 'Lyse Arena, Stavanger', round: 'Play-off — 2º jogo',
    firstLeg: { home: 2, away: 2 },
    aggregate: '2-2 (1º jogo em Zagreb)',
    form: { home: 'W-W-D-W-L', away: 'W-L-W-D-W' },
    h2h: ['19/08/2026: Dinamo 2-2 Viking (Zagreb)'],
    keyStats: ['1º jogo 2-2 com 4 gols', 'Empate no agregado — decisão em Stavanger', 'Viking ataca bem em casa'],
    sources: ['uefa.com', 'skysports.com'],
    analysis: [
      'Play-off UCL — 2º jogo em Stavanger',
      '1º jogo: Dinamo Zagreb 2-2 Viking (19/08)',
      'Empate no agregado; gols esperados com ambos atacando',
      'Viking mandante norueguês com Lyse Arena lotada',
      'Recomendação: Mais de 2.5 gols (~1.78)'
    ],
    teamStats: { home: stats(5, 3, 11, 8, 65, 70, 3.4, 5.5), away: stats(5, 3, 10, 7, 60, 65, 3.2, 5.0) },
    h2hSummary: { total: 1, homeWins: 0, draws: 1, awayWins: 0, avgGoals: 4.0, bttsPct: 100, notes: '2-2 no 1º jogo' },
    context: { stakes: '2º jogo UCL — 2-2 no agregado', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Gols', 'Mais de 2.5 gols', 1.78, 60, '1º jogo com 4 gols; ambos precisam atacar.', 5),
      pick(2, 'Resultado', 'Viking vence', 2.20, 43, 'Mandante em Stavanger.', 0),
      pick(3, 'Gols', 'Ambos marcam', 1.65, 58, 'BTTS no 1º jogo.', 0)
    ],
    markets: mkMarkets(
      [mkt('Viking vence', 2.20, 43, 'Mandante'), mkt('Empate', 3.50, 27, 'Prorrogação'), mkt('Dinamo vence', 3.00, 30, 'Classificação fora')],
      [mkt('Mais de 2.5 gols', 1.78, 60, 'Jogo aberto'), mkt('Ambos marcam', 1.65, 58, 'Ataque de ambos'), mkt('Menos de 2.5 gols', 2.05, 45, 'Cautela tática')],
      [mkt('Mais de 4.5 cartões', 1.85, 52, 'Eliminatória'), mkt('Dinamo + cartões', 1.95, 48, 'Visitante')],
      [mkt('Mais de 9.5 escanteios', 1.88, 50, 'Jogo aberto'), mkt('Viking + escanteios', 1.82, 52, 'Mandante')]
    )
  }),
  buildMatch({
    league: 'cl', leagueLabel: 'Champions League', sortPriority: 1,
    teams: 'Celje x Slovan Bratislava', home: 'Celje', away: 'Slovan Bratislava',
    homeShort: 'Celje', awayShort: 'Slovan',
    bet: 'Celje avança', confidence: 66, odds: 1.62, multiBetShort: 'Celje avança',
    time: '16:00',
    homeOdd: '1.75', drawOdd: '3.60', awayOdd: '4.40',
    homeProb: 57, drawProb: 27, awayProb: 16, bestOdd: 'home',
    venue: "Stadion Z'dežele, Celje", round: 'Play-off — 2º jogo',
    firstLeg: { home: 1, away: 1 },
    aggregate: '1-1 (1º jogo em Bratislava)',
    form: { home: 'W-D-W-W-D', away: 'W-W-D-L-W' },
    h2h: ['21/08/2026: Slovan 1-1 Celje (Bratislava)'],
    keyStats: ['1-1 no agregado', 'Celje joga em casa na Eslovênia', 'Slovan precisa vencer fora'],
    sources: ['uefa.com', 'skysports.com'],
    analysis: [
      'Play-off UCL — 2º jogo em Celje',
      '1º jogo: Slovan 1-1 Celje (21/08, Bratislava)',
      'Empate favorece ligeiramente mandante no 2º jogo',
      'Celje com apoio da torcida eslovena',
      'Recomendação: Celje avança (~1.62)'
    ],
    teamStats: { home: stats(5, 3, 9, 6, 55, 55, 3.0, 5.2), away: stats(5, 3, 8, 5, 50, 50, 3.2, 4.8) },
    h2hSummary: { total: 1, homeWins: 0, draws: 1, awayWins: 0, avgGoals: 2.0, bttsPct: 100, notes: '1-1 no 1º jogo' },
    context: { stakes: '2º jogo UCL — 1-1 agregado', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Classificação', 'Celje avança', 1.62, 66, 'Mandante com empate no agregado; Slovan precisa vencer.', 6),
      pick(2, 'Gols', 'Menos de 2.5 gols', 1.88, 54, '1º jogo fechado 1-1.', 0),
      pick(3, 'Resultado', 'Celje vence', 1.75, 57, 'Vitória classifica direto.', 0)
    ],
    markets: mkMarkets(
      [mkt('Celje avança', 1.62, 66, 'Classificação'), mkt('Celje vence', 1.75, 57, '90 min'), mkt('Slovan vence', 4.40, 16, 'Precisa vencer')],
      [mkt('Menos de 2.5 gols', 1.88, 54, '1º jogo 1-1'), mkt('Ambos marcam', 1.82, 52, 'BTTS no 1º jogo'), mkt('Mais de 2.5 gols', 1.95, 48, 'Celje pressiona')],
      [mkt('Mais de 4.5 cartões', 1.90, 49, 'Eliminatória'), mkt('Slovan + cartões', 2.05, 44, 'Visitante frustra')],
      [mkt('Mais de 9.5 escanteios', 1.85, 50, 'Celje domina'), mkt('Celje + escanteios', 1.72, 54, 'Mandante')]
    )
  }),
  buildMatch({
    league: 'cl', leagueLabel: 'Champions League', sortPriority: 1, imminent: true,
    teams: 'Lyon x Fenerbahçe', home: 'Lyon', away: 'Fenerbahçe',
    homeShort: 'Lyon', awayShort: 'Fenerbahçe',
    bet: 'Ambos marcam', confidence: 58, odds: 1.72, multiBetShort: 'BTTS Sim',
    time: '16:00',
    homeOdd: '2.05', drawOdd: '3.40', awayOdd: '3.50',
    homeProb: 48, drawProb: 29, awayProb: 23, bestOdd: 'none',
    venue: 'Groupama Stadium, Lyon', round: 'Play-off — 2º jogo',
    firstLeg: { home: 1, away: 1 },
    aggregate: '1-1 (1º jogo em Istambul)',
    form: { home: 'W-D-W-L-W', away: 'W-W-D-W-W' },
    h2h: ['19/08/2026: Fenerbahçe 1-1 Lyon (Istanbul)'],
    keyStats: ['1-1 no agregado — decisão em Lyon', 'Fenerbahçe marcou fora no 1º jogo', 'Lyon precisa vencer ou empatar com gols'],
    sources: ['uefa.com', 'milliyet.com.tr'],
    analysis: [
      'Play-off UCL — 2º jogo no Groupama Stadium',
      '1º jogo: Fenerbahçe 1-1 Lyon (19/08, Istanbul)',
      'Empate no agregado; jogo equilibrado entre gigantes',
      'Lyon mando de campo; Fenerbahçe com Dzeko e quality',
      'Recomendação: Ambos marcam (~1.72)'
    ],
    teamStats: { home: stats(5, 3, 10, 7, 60, 60, 3.2, 5.8), away: stats(5, 4, 12, 6, 65, 65, 3.4, 5.5) },
    h2hSummary: { total: 1, homeWins: 0, draws: 1, awayWins: 0, avgGoals: 2.0, bttsPct: 100, notes: '1-1 no 1º jogo em Istambul' },
    context: { stakes: '2º jogo UCL — 1-1 agregado; Dzeko titular', rotation: null, injuries: [], referee: null },
    topPicks: [
      pick(1, 'Gols', 'Ambos marcam', 1.72, 58, '1-1 no 1º jogo; ambos marcam com regularidade.', 4),
      pick(2, 'Gols', 'Mais de 2.5 gols', 1.85, 55, 'Decisão exige ataque dos dois lados.', 0),
      pick(3, 'Resultado', 'Lyon vence', 2.05, 48, 'Mandante francês em casa.', 0)
    ],
    markets: mkMarkets(
      [mkt('Lyon vence', 2.05, 48, 'Mandante'), mkt('Empate', 3.40, 29, 'Prorrogação'), mkt('Fenerbahçe vence', 3.50, 23, 'Classificação fora')],
      [mkt('Ambos marcam', 1.72, 58, 'BTTS recomendado'), mkt('Mais de 2.5 gols', 1.85, 55, 'Jogo aberto'), mkt('Menos de 2.5 gols', 1.95, 48, 'Cautela possível')],
      [mkt('Mais de 4.5 cartões', 1.88, 52, 'Jogo grande'), mkt('Fenerbahçe + cartões', 2.00, 47, 'Visitante')],
      [mkt('Mais de 9.5 escanteios', 1.82, 52, 'Equilibrado'), mkt('Lyon + escanteios', 1.88, 50, 'Mandante')]
    )
  })
];

var leagues = [
  { id: 'cl', name: 'Champions League' },
  { id: 'ec', name: 'EFL Cup' },
  { id: 'cf', name: 'Conference League' }
];

var top3 = [
  { rank: 'g', icon: '🥇', teams: 'Newcastle x West Brom', pick: 'Newcastle vence', odd: '1.42', prob: 76, justify: 'PL em casa vs Championship. Mercado a 70% implícito.' },
  { rank: 's', icon: '🥈', teams: 'AEK Athens x Levski Sofia', pick: 'AEK avança', odd: '1.48', prob: 74, justify: '0-0 no agregado; AEK forte na OPAP Arena em Atenas.' },
  { rank: 'b', icon: '🥉', teams: 'Tottenham x Charlton', pick: 'Tottenham -1.5', odd: '1.68', prob: 72, justify: 'PL vs League One. Spurs deve vencer por 2+ gols.' }
];

var combos = [
  { teams: 'Newcastle x West Brom', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'var(--color-accent)', rows: [
    { combo: 'Newcastle vence + M2.5 gols', odd: '1.85', prob: '62%', conf: 'h' },
    { combo: 'Newcastle vence + BTTS Não', odd: '1.95', prob: '58%', conf: 'h' },
    { combo: 'Newcastle -1.5 + M2.5', odd: '2.40', prob: '45%', conf: 'm' }
  ]},
  { teams: 'Tottenham x Charlton', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'var(--color-blue)', rows: [
    { combo: 'Tottenham -1.5 + M2.5 gols', odd: '1.95', prob: '58%', conf: 'h' },
    { combo: 'Tottenham vence + BTTS Não', odd: '1.75', prob: '55%', conf: 'h' },
    { combo: 'Spurs + M3.5 gols', odd: '2.60', prob: '40%', conf: 'm' }
  ]},
  { teams: 'Lyon x Fenerbahçe', flag: '🇫🇷', color: 'var(--color-gold)', rows: [
    { combo: 'BTTS + M2.5 gols', odd: '2.05', prob: '52%', conf: 'h' },
    { combo: 'Empate + BTTS', odd: '4.20', prob: '28%', conf: 'm' },
    { combo: 'Lyon vence + BTTS', odd: '2.80', prob: '38%', conf: 'm' }
  ]},
  { teams: 'AEK Athens x Levski Sofia', flag: '🇬🇷', color: 'var(--color-orange)', rows: [
    { combo: 'AEK avança + U2.5', odd: '2.20', prob: '48%', conf: 'm' },
    { combo: 'AEK vence + BTTS Não', odd: '2.10', prob: '50%', conf: 'h' },
    { combo: 'Empate 0-0', odd: '7.50', prob: '12%', conf: 'l' }
  ]},
  { teams: 'Preston x Everton', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'var(--color-purple)', rows: [
    { combo: 'Everton vence + BTTS', odd: '2.75', prob: '42%', conf: 'm' },
    { combo: 'Everton vence + U2.5', odd: '2.30', prob: '48%', conf: 'm' },
    { combo: 'Everton + M2.5', odd: '2.05', prob: '52%', conf: 'h' }
  ]}
];

var quickPicks = [
  { label: 'Newcastle vence', odd: '1.42' },
  { label: 'AEK avança', odd: '1.48' },
  { label: 'Tottenham -1.5', odd: '1.68' }
];

var out = {
  meta: { date: '2026-08-26', stats: { totalGames: matches.length, resolvedGames: 0, wins: 0, roi: 0 } },
  leagues: leagues,
  matches: matches,
  top3: top3,
  combos: combos,
  quickPicks: quickPicks
};

fs.writeFileSync(path.join(__dirname, '..', 'data', 'matches.json'), JSON.stringify(out, null, 2) + '\n');
console.log('Wrote', matches.length, 'matches for 2026-08-26');
