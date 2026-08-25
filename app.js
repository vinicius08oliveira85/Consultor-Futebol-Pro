function filterLeague(league, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('#tab-all .mc').forEach(function(card) {
    if (league === 'all' || card.dataset.league === league) {
      card.style.display = 'block';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
  });
}

var savedBets = JSON.parse(localStorage.getItem('savedBets') || '[]');

function toggleSave(btn) {
  var card = btn.closest('.mc');
  var teams = card.querySelector('.mteams').textContent.replace('VS', 'x').trim();
  var bestOdd = card.querySelector('.oi.best .ov');
  var bestPick = card.querySelector('.oi.best .ol');
  if (!bestOdd || !bestPick) return;
  var pick = bestPick.textContent;
  pick = pick.replace(/[\u{1F3C6}\u{1F947}\u{1F6E1}\u{2B07}\u{1F3AF}\u2B50]/gu, '').trim();
  var bet = { id: teams, match: teams, pick: pick, odd: bestOdd.textContent };
  var idx = savedBets.findIndex(function(b) { return b.id === bet.id; });
  if (idx > -1) {
    savedBets.splice(idx, 1);
    btn.textContent = '\u2606';
    btn.classList.remove('saved');
  } else {
    savedBets.push(bet);
    btn.textContent = '\u2605';
    btn.classList.add('saved');
  }
  localStorage.setItem('savedBets', JSON.stringify(savedBets));
  renderSavedBets();
}

function renderSavedBets() {
  var list = document.getElementById('savedList');
  var empty = document.getElementById('savedEmpty');
  if (!list || !empty) return;
  if (savedBets.length === 0) {
    empty.style.display = 'block';
    list.innerHTML = '';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = savedBets.map(function(b) {
    return '<div class="saved-item"><span class="match">' + b.match + '</span><span class="pick">' + b.pick + ' @' + b.odd + '</span><span class="remove" onclick="removeSaved(\'' + b.id + '\')">X</span></div>';
  }).join('');
}

function removeSaved(id) {
  savedBets = savedBets.filter(function(b) { return b.id !== id; });
  localStorage.setItem('savedBets', JSON.stringify(savedBets));
  renderSavedBets();
  document.querySelectorAll('.save-btn').forEach(function(btn) {
    var card = btn.closest('.mc');
    if (!card) return;
    var teams = card.querySelector('.mteams').textContent.replace('VS', 'x').trim();
    if (!savedBets.find(function(b) { return b.id === teams; })) {
      btn.textContent = '\u2606';
      btn.classList.remove('saved');
    }
  });
}

function calculateReturn() {
  var amount = parseFloat(document.getElementById('calcAmount').value) || 0;
  var oddSelect = document.getElementById('calcOdd');
  var customInput = document.getElementById('calcCustomOdd');
  var odd;
  if (oddSelect.value === 'custom') {
    customInput.style.display = 'block';
    odd = parseFloat(customInput.value) || 0;
  } else {
    customInput.style.display = 'none';
    odd = parseFloat(oddSelect.value);
  }
  var total = amount * odd;
  var profit = total - amount;
  document.getElementById('calcReturn').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
  document.getElementById('calcProfit').textContent = 'R$ ' + profit.toFixed(2).replace('.', ',');
}

document.addEventListener('DOMContentLoaded', function() {
  renderSavedBets();
  document.querySelectorAll('.save-btn').forEach(function(btn) {
    var card = btn.closest('.mc');
    if (!card) return;
    var teams = card.querySelector('.mteams').textContent.replace('VS', 'x').trim();
    if (savedBets.find(function(b) { return b.id === teams; })) {
      btn.textContent = '\u2605';
      btn.classList.add('saved');
    }
  });
});
