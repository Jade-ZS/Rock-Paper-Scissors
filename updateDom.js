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

function showAlertMessage(message) {
  alertMessage.innerText = message;
  ifShowItems([alertBox], true);
}

function renderFighters(choices) {
  fighters.innerHTML = '';
  for (var i = 0; i < 5; i++) {
    if (!choices[i]) {
      return;
    }
    fighters.innerHTML += `<img src=${choices[i].img} alt=${choices[i].fighter}>`
  }
}

function renderResult() {
  currentGame.computerPlayer.currentChoice = generateRandomFighter(currentGame.mode);
  result.innerHTML = `
    <img class="human-choice" src=${currentGame.humanPlayer.currentChoice.img} alt=${currentGame.humanPlayer.currentChoice.fighter}>
    <img class="computer-choice" src=${currentGame.computerPlayer.currentChoice.img} alt=${currentGame.computerPlayer.currentChoice.fighter}>
  `;
}

function renderSideBar(players) {
  var leftChildren = players[0].children;
  if (currentGame.humanPlayer.avatar.includes('data')) {
    leftChildren[0].innerHTML = `<img src=${localStorage.getItem('avatar')}>`
  } else {
    leftChildren[0].innerText = localStorage.getItem('avatar');
  }
  leftChildren[1].innerText = localStorage.getItem('name');
  leftChildren[2].innerText = `Wins: ${localStorage.getItem('humanWins')}`;

  var rightChildren = players[1].children;
  rightChildren[0].innerText = currentGame.computerPlayer.avatar;
  rightChildren[1].innerText = currentGame.computerPlayer.name;
  rightChildren[2].innerText = `Wins: ${localStorage.getItem('computerWins')}`;
}

