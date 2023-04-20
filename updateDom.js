function ifShowCollection(collection, choice) {
  for (var i = 0; i < collection.length; i++) {
    if (!choice) {
      modes[i].classList.add('hidden');
    } else {
      modes[i].classList.remove('hidden');
    }
  };
}

function ifShowItem(item, choice) {
  if (!choice) {
    item.classList.add('hidden');
  } else {
    item.classList.remove('hidden');
  }
}

function showMessage(message) {
  subline.innerText = message;
}


function renderGameBoard(mode) {
  fighters.innerHTML = '';
  for (var i = 0; i < 5; i++) {
    if (!mode[i]) {
      return;
    }
    fighters.innerHTML += `<img src=${mode[i].img} alt=${mode[i].fighter}>`
  }
}

function renderResult() {
  computerPlayer.currentChoice = generateRandomFighter(currentGame.mode);
  result.innerHTML = `
    <img src=${humanPlayer.currentChoice.img} alt=${humanPlayer.currentChoice.fighter}>
    <img src=${computerPlayer.currentChoice.img} alt=${computerPlayer.currentChoice.fighter}>
  `;
}

function renderWins(players) {
  var leftChildren = players[0].children;
  leftChildren[0].innerText = humanPlayer.token;
  leftChildren[1].innerText = humanPlayer.name;
  leftChildren[2].innerText = `Wins: ${humanPlayer.wins}`;

  var rightChildren = players[1].children;
  rightChildren[0].innerText = computerPlayer.token;
  rightChildren[1].innerText = computerPlayer.name;
  rightChildren[2].innerText = `Wins: ${computerPlayer.wins}`;
}
