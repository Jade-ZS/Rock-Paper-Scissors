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
  currentGame.computerPlayer.currentChoice = generateRandomFighter(currentGame.mode);
  result.innerHTML = `
    <img src=${currentGame.humanPlayer.currentChoice.img} alt=${currentGame.humanPlayer.currentChoice.fighter}>
    <img src=${currentGame.computerPlayer.currentChoice.img} alt=${currentGame.computerPlayer.currentChoice.fighter}>
  `;
}

function renderPlayers(players) {
  var leftChildren = players[0].children;
  if (typeof currentGame.humanPlayer.avatar !== 'string') {
    leftChildren[0].innerHTML = `<img src=${currentGame.humanPlayer.avatar.imgSrc}>`
  } else {
    leftChildren[0].innerText = currentGame.humanPlayer.avatar;
  }
  leftChildren[1].innerText = currentGame.humanPlayer.name;
  leftChildren[2].innerText = `Wins: ${currentGame.humanPlayer.wins}`;

  var rightChildren = players[1].children;
  rightChildren[0].innerText = currentGame.computerPlayer.avatar;
  rightChildren[1].innerText = currentGame.computerPlayer.name;
  rightChildren[2].innerText = `Wins: ${currentGame.computerPlayer.wins}`;
}
