// variables
// DATA model
var humanPlayer = createPlayer();
var computerPlayer = createPlayer('computer', '💻');
var currentGame = createGame(humanPlayer, computerPlayer);
var easyMode = [
  {fighter:'rock', img:'./assets/happy-rocks.png'},
  {fighter:'paper', img:'./assets/happy-paper.png'},
  {fighter:'scissors', img:'./assets/happy-scissors.png'},
];
var difficultMode = easyMode.concat(
  {fighter:'lizard', img:'./assets/lizard.png'},
  {fighter:'alien', img:'./assets/happy-alien.png'}
);

// view
var loginView = document.querySelector('.login-view');
var registerView = document.querySelector('.register-view');
var gameView = document.querySelector('.game-view');
var result = document.querySelector('.result-view');
var fighters = document.querySelector('.fighters-view');
var gameBoard = document.querySelector('.gameboard');
var players = document.getElementsByClassName('player');
var modes = gameBoard.getElementsByClassName('mode');
var subline = document.querySelector('header>h2');

// BUTTON
var loginButton = document.querySelector('.log-in-button');
var registerButton = document.querySelector('.register-button');
var asGuestButton = document.querySelector('.as-guest-button');
var changeGameButton = document.querySelector('.change-game-button');



// event listeneres
window.addEventListener('load', displayLogIn)
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

changeGameButton.addEventListener('click', displayHome);
loginButton.addEventListener('click', displayHome);

// event handlers
function createPlayer(name, token, wins) {
  var player = {
    name: name || 'Human',
    token: token|| '👻',
    wins: wins || 0
  }
  return player;
}

function createGame(player1, player2) {
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
function displayLogIn() {
  ifShowItem(loginView, true);
  ifShowItem(gameView, false);
}
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

// register-page

//

// home-page
function displayHome() {
  renderWins(players);
  ifShowItem(gameView, true);
  ifShowCollection(modes, true);
  ifShowItem(result, false);
  ifShowItem(fighters, false);
  ifShowItem(loginView, false);
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
  ifShowItem(changeGameButton, true);
  ifShowItem(fighters, true);
  ifShowCollection(modes, false);
  ifShowItem(result, false);
  ifShowItem(loginView, false);
  
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


