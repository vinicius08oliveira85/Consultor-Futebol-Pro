/* Validate data/matches.json consistency — run: node scripts/validate-matches.js */
var fs = require('fs');
var path = require('path');

var file = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(__dirname, '..', 'data', 'matches.json');
var data = JSON.parse(fs.readFileSync(file, 'utf8'));
var errors = [];
var warnings = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

data.matches.forEach(function (m, i) {
  var prefix = 'Match #' + (i + 1) + ' (' + m.teams + '):';

  if (!m.topPicks || m.topPicks.length !== 3) {
    err(prefix + ' must have exactly 3 topPicks');
  }
  if (!m.markets || !Object.keys(m.markets).length) {
    err(prefix + ' must have markets object');
  }
  if (!m.teamStats || !m.teamStats.home || !m.teamStats.away) {
    err(prefix + ' missing teamStats.home/away');
  }
  if (!m.h2hSummary) {
    warn(prefix + ' missing h2hSummary');
  }
  if (!m.context) {
    warn(prefix + ' missing context');
  }

  if (m.topPicks && m.topPicks.length) {
    var tp0 = m.topPicks[0];
    if (tp0.confidence !== m.confidence) {
      err(prefix + ' topPicks[0].confidence (' + tp0.confidence + ') !== match.confidence (' + m.confidence + ')');
    }
    if (Math.abs(tp0.odd - m.odds) > 0.01 && m.bet.indexOf(tp0.label) < 0 && tp0.label.indexOf(m.bet.split(' ')[0]) < 0) {
      warn(prefix + ' topPicks[0] odd/label may not align with bet/odds');
    }
    m.topPicks.forEach(function (p, j) {
      if (p.confidence > 100 || p.confidence < 0) err(prefix + ' topPicks[' + j + '] invalid confidence');
      if (p.odd < 1.01) err(prefix + ' topPicks[' + j + '] odd < 1.01');
      if (!p.rationale) warn(prefix + ' topPicks[' + j + '] missing rationale');
    });
  }

  if (m.odds < 1.01) err(prefix + ' match odds < 1.01');
  if (m.confidence > 100 || m.confidence < 0) err(prefix + ' invalid confidence');

  var probSum = (m.homeProb || 0) + (m.drawProb || 0) + (m.awayProb || 0);
  if (Math.abs(probSum - 100) > 5) {
    warn(prefix + ' 1X2 probs sum to ' + probSum + ' (expected ~100)');
  }

  if (m.markets) {
    Object.keys(m.markets).forEach(function (key) {
      m.markets[key].forEach(function (row, j) {
        if (row.confidence > 100 || row.confidence < 0) err(prefix + ' markets.' + key + '[' + j + '] invalid confidence');
        if (row.odd < 1.01) err(prefix + ' markets.' + key + '[' + j + '] odd < 1.01');
      });
    });
  }
});

console.log('Validated', data.matches.length, 'matches\n');

if (warnings.length) {
  console.log('Warnings (' + warnings.length + '):');
  warnings.forEach(function (w) { console.log('  ⚠', w); });
  console.log('');
}

if (errors.length) {
  console.log('Errors (' + errors.length + '):');
  errors.forEach(function (e) { console.log('  ✗', e); });
  process.exit(1);
}

console.log('All checks passed.' + (warnings.length ? ' (' + warnings.length + ' warnings)' : ''));
