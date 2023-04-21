function ifShowItems(items, choice) {
  for (var i = 0; i < items.length; i++) {
    if (!choice) {
      items[i].classList.add('hidden');
    } else {
      items[i].classList.remove('hidden');
    }
  };
}

function showMessage(message) {
  subline.innerText = message;
}


function renderFighters(mode) {
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

function renderPlayers(players) {
  var leftChildren = players[0].children;
  leftChildren[0].innerText = humanPlayer.avatar;
  leftChildren[1].innerText = humanPlayer.name;
  leftChildren[2].innerText = `Wins: ${humanPlayer.wins}`;

  var rightChildren = players[1].children;
  rightChildren[0].innerText = computerPlayer.avatar;
  rightChildren[1].innerText = computerPlayer.name;
  rightChildren[2].innerText = `Wins: ${computerPlayer.wins}`;
}
