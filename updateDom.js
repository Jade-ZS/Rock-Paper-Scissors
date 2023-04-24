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
  console.log('render fighters')
  fighters.innerHTML = '';
  for (var i = 0; i < 5; i++) {
    if (!mode[i]) {
      return;
    }
    fighters.innerHTML += `<img src=${mode[i].img} alt=${mode[i].fighter}>`
  }
}

function renderResult() {
  console.log('render result')
  currentGame.computerPlayer.currentChoice = generateRandomFighter(currentGame.mode);
  result.innerHTML = `
    <img class="human-choice" src=${currentGame.humanPlayer.currentChoice.img} alt=${currentGame.humanPlayer.currentChoice.fighter}>
    <img class="computer-choice" src=${currentGame.computerPlayer.currentChoice.img} alt=${currentGame.computerPlayer.currentChoice.fighter}>
  `;
}

function renderPlayers(players) {
  console.log('render players')
  var leftChildren = players[0].children;
  console.log('hererere')
  if (currentGame.humanPlayer.avatar.includes('data')) {
    console.log(currentGame.humanPlayer.avatar.imgSrc)
    // leftChildren[0].innerHTML = `<img src=${currentGame.humanPlayer.avatar.imgSrc}>`
    console.log('render img')
    leftChildren[0].innerHTML = `<img src=${localStorage.getItem('avatar')}>`
  } else {
    leftChildren[0].innerText = localStorage.getItem('avatar');
  }
  leftChildren[1].innerText = localStorage.getItem('name');
  console.log('localStorage.humanWins', localStorage.getItem('humanWins'))
  leftChildren[2].innerText = `Wins: ${localStorage.getItem('humanWins')}`;
  console.log('localStorage', localStorage)

  var rightChildren = players[1].children;
  rightChildren[0].innerText = currentGame.computerPlayer.avatar;
  rightChildren[1].innerText = currentGame.computerPlayer.name;
  rightChildren[2].innerText = `Wins: ${localStorage.getItem('computerWins')}`;
}

function showAlertMessage(message) {
  alertMessage.innerText = message;
  ifShowItems([alertBox], true);
}