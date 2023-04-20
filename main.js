// variables
var humanPlayer = createPlayer();
var computerPlayer = createPlayer('computer', '💻');
var currentGame = createGame(humanPlayer, computerPlayer);
var gameBoard = document.querySelector('main');
var modes = gameBoard.getElementsByClassName('mode');
var players = document.getElementsByClassName('player');
var fighters = document.querySelector('.fighters');
var subline = document.querySelector('header>h2');
var result = document.querySelector('.result');
var changeGameButton = document.querySelector('.change-game-button');
var easyMode = [
  {fighter:'rock', img:'./assets/happy-rocks.png'},
  {fighter:'paper', img:'./assets/happy-paper.png'},
  {fighter:'scissors', img:'./assets/happy-scissors.png'},
];
var difficultMode = easyMode.concat(
  {fighter:'lizard', img:'./assets/lizard.png'},
  {fighter:'alien', img:'./assets/happy-alien.png'}
);

// event listeneres
window.addEventListener('load', displayInitialView)
gameBoard.addEventListener('click', event => {
  if (event.target.classList.contains('mode') || event.target.parentElement.classList.contains('mode')) {
    displayGame(event);
  }
});

gameBoard.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' && !fighters.classList.contains('hidden')) {
    displayResult(event);
    setTimeout(resetGameBoard, 2000);
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
  }
  return game;
}

/** local storage extension
 * saveWinsToStorage
 * retrieveWinsFromStorage
 * takeTurn
 */

function showResultText() {
  // render text
  var winner = determineWinner(humanPlayer, computerPlayer);
  var message;
  if (winner) {
    message = `${winner.name} won!`; 
  } else {
    message = `It's a draw!`;
  }
  showMessage(message);
}

// log-in-page
/**
 * html: form (create your own, or continue as a guest)
 * - username, token (allow upload)
 * - local storage, password
 * js: update humanplayer based on form information
 * js: connect to local storage
 * if guest, not local storage
 * if own, local storage
 * 
 * local storage
 * username, token, password, wins
 * game history
 */

// home-page
function displayInitialView() {
  renderWins(players);
  ifShowCollection(modes, true);
  ifShowItem(result, false);
  ifShowItem(fighters, false);
}

// chose-a-fighter-page
function getGameMode(event) {
  var modeChoiceBox = event.target.parentElement.firstElementChild;
  if (event.target.innerText.indexOf('CLASSIC') !== -1|| modeChoiceBox.innerText.indexOf("CLASSIC") !== -1) {
    currentGame.mode = easyMode;
  } else if (event.target.innerText.indexOf('DIFFICULT') !== -1|| modeChoiceBox.innerText.indexOf("DIFFICULT") !== -1) {
    currentGame.mode = difficultMode;
  }
  return currentGame.mode;
}

function displayGame(event) {
  getGameMode(event);
  renderGameBoard(currentGame.mode);
  ifShowCollection(modes, false);
  ifShowItem(changeGameButton, true);
  ifShowItem(fighters, true);
  ifShowItem(result, false);
  showMessage('Choose your fighter!');
}

function resetGameBoard() {
  ifShowItem(fighters, true);
  ifShowItem(result, false);
}

// Result-page
function generateRandomFighter(fighters) {
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}

function getUserFighter(event) {
 humanPlayer.currentChoice = event.target;
  for (var i = 0; i < currentGame.mode.length; i++) {
    if (event.target.alt.includes(currentGame.mode[i].fighter)) {
     humanPlayer.currentChoice = currentGame.mode[i];
    }
  }
}

function displayResult(event) {
    getUserFighter(event);
    ifShowItem(fighters, false);
    ifShowItem(result, true);
    renderResult();
    renderWins(players);
    showResultText();  
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


