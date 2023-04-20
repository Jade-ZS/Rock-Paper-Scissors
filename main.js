// variables
/** TODO: fix name and token later (hard coded in html, need to be fixed as well) */
var humanPlayer = createPlayer();
var computerPlayer = createPlayer('computer', '💻');
var currentMode;
var easyMode = [
  {fighter:'rock', img:'./assets/happy-rocks.png'},
  {fighter:'paper', img:'./assets/happy-paper.png'},
  {fighter:'scissors', img:'./assets/happy-scissors.png'},
];

var difficultMode = easyMode.concat(
  {fighter:'lizard', img:'./assets/lizard.png'},
  {fighter:'alien', img:'./assets/happy-alien.png'}
);

var gameBoard = document.querySelector('main');
var modes = gameBoard.getElementsByClassName('mode');
var subline = document.querySelector('header>h2');
var fighters = document.querySelector('.fighters');
var result = document.querySelector('.result');
var changeGameButton = document.querySelector('.change-game-button');
var players = document.getElementsByClassName('player');




// event listeneres
gameBoard.addEventListener('click', event => {
  if (event.target.classList.contains('mode') || event.target.parentElement.classList.contains('mode')) {
    displayGame(event);
  }
});

gameBoard.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' && !fighters.classList.contains('hidden')) {
    displayResult(event);
  }
});

changeGameButton.addEventListener('click', displayInitialView);

// event handlers
function createPlayer(name, token, wins) {
  var player = {
    name: name || 'Human',
    token: token|| '👻',
    wins: wins || 0
  }
  
  return player;
}

function createGame(player1, player2, mode) {
  var game = {
    player1: player1,
    player2: player2,
    mode: mode
  }
  return game;
}

/** local storage extension
 * saveWinsToStorage
 * retrieveWinsFromStorage
 * takeTurn
 */


// game page - choose a fighter page
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

function displayInitialView() {
  ifShowCollection(modes, true);
  ifShowItem(result, false);
  ifShowItem(fighters, false);
}

function showMessage(message) {
  subline.innerText = message;
}

function getGameMode(event) {
  var modeChoiceBox = event.target.parentElement.firstElementChild;
  if (event.target.innerText.indexOf('CLASSIC') !== -1|| modeChoiceBox.innerText.indexOf("CLASSIC") !== -1) {
    currentMode = easyMode;
  } else if (event.target.innerText.indexOf('DIFFICULT') !== -1|| modeChoiceBox.innerText.indexOf("DIFFICULT") !== -1) {
    currentMode = difficultMode;
  }
  return currentMode;
}

function renderGameMode(event) {
  var currentMode = getGameMode(event);
  fighters.innerHTML = '';
  for (var i = 0; i < 5; i++) {
    if (!currentMode[i]) {
      return;
    }
    fighters.innerHTML += `<img src=${currentMode[i].img} alt=${currentMode[i].fighter}>`
  }
}

function displayGame(event) {
  ifShowCollection(modes, false);
  ifShowItem(changeGameButton, true);
  ifShowItem(fighters, true);
  showMessage('Choose your fighter!');
  renderGameMode(event);
}

// determine winner page
function generateRandomFighter(fighters) {
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}

function getUserFighter(event) {
 humanPlayer.currentChoice = event.target;
  for (var i = 0; i < currentMode.length; i++) {
    if (event.target.alt.includes(currentMode[i].fighter)) {
     humanPlayer.currentChoice = currentMode[i];
    }
  }
}

function renderResult() {
  computerPlayer.currentChoice = generateRandomFighter(currentMode);
  result.innerHTML = `
    <img src=${humanPlayer.currentChoice.img} alt=${humanPlayer.currentChoice.fighter}>
    <img src=${computerPlayer.currentChoice.img} alt=${computerPlayer.currentChoice.fighter}>
  `;
}

function displayResult(event) {
    getUserFighter(event);
    ifShowItem(fighters, false);
    ifShowItem(result, true);
    renderResult();

    // render text
    var winner = determineWinner(humanPlayer, computerPlayer);
    var message;
    if (winner) {
      message = `${winner.name} won!`; // TO DO: improve this, chagnge this to player's name
    } else {
      message = `It's a draw!`;
    }
    showMessage(message);
    displayWins(players);
}

function determineWinner(player1, player2) {
  var winner;
  var condition1 = player1.currentChoice.fighter === 'rock' && player2.currentChoice.fighter === ('scissors'||'lizard');
  var condition2 = player1.currentChoice.fighter === 'paper' && player2.currentChoice.fighter === ('rock'||'alien');
  var condition3 = player1.currentChoice.fighter === 'scissors' && player2.currentChoice.fighter === ('paper'||'lizard');
  var condition4 = player1.currentChoice.fighter === 'lizard' && player2.currentChoice.fighter === ('paper'||'alien');
  var condition5 = player1.currentChoice.fighter === 'alien' && player2.currentChoice.fighter === ('scissors'||'rock');
  if (condition1||condition2||condition3||condition4||condition5) {
    winner = player1; 
  } else if (player1.currentChoice.fighter === player2.currentChoice.fighter) {
    return false; 
  } else {
    winner = player2; 
  }
  winner.wins+=1;
  return winner;
}

function displayWins(players) {
  var leftChildren = players[0].children;
  leftChildren[0].innerText = humanPlayer.token;
  leftChildren[1].innerText = humanPlayer.name;
  leftChildren[2].innerText = `Wins: ${humanPlayer.wins}`;

  var rightChildren = players[1].children;
  rightChildren[0].innerText = computerPlayer.token;
  rightChildren[1].innerText = computerPlayer.name;
  rightChildren[2].innerText = `Wins: ${computerPlayer.wins}`;
}

