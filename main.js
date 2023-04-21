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
var cancelRegisterButton = document.querySelector('.cancel-register-button')
var createAccountButton = document.querySelector('.create-account-button')
var asGuestButton = document.querySelector('.as-guest-button');
var changeGameButton = document.querySelector('.change-game-button');



// event listeneres
window.addEventListener('load', displayLogIn)
// game view
gameBoard.addEventListener('click', event => {
  if (event.target.classList.contains('mode') || event.target.parentElement.classList.contains('mode')) {
    displayFighters(event);
  }
});

gameBoard.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' && !fighters.classList.contains('hidden')) {
    displayResult(event);
    setTimeout(resetGameBoard, 2000);
  }
});

changeGameButton.addEventListener('click', displayHome);

// log in view
registerButton.addEventListener('click', displayRegister);
asGuestButton.addEventListener('click', displayHome);

loginView.addEventListener('submit', event => {
  event.preventDefault();
  displayHome();
});

// register view
cancelRegisterButton.addEventListener('click', displayLogIn);
createAccountButton.addEventListener('click', displayHome);

// event handlers
function createPlayer(name, token, wins) {
  var player = {
    name: name || 'tourist',
    token: token|| '👤',
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
  // to show
  var itemsToShow= [loginView];
  ifShowItems(itemsToShow, true);
  // to hide
  var itemsToHide = [gameView, registerView];
  ifShowItems(itemsToHide, false);
}

function displayRegister() {
  var itemsToShow= [registerView];
  ifShowItems(itemsToShow, true);
  // to hide
  var itemsToHide = [gameView, loginView];
  ifShowItems(itemsToHide, false);
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
  renderPlayers(players);

    // to show
    var itemsToShow= [gameView].concat(Array.from(modes));
    ifShowItems(itemsToShow, true);
    // to hide
    var itemsToHide = [result, fighters, loginView, registerView];
    ifShowItems(itemsToHide, false);
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

function displayFighters(event) {
  getGameMode(event);
  renderFighters(currentGame.mode);

  // to show
  var itemsToShow = [fighters, changeGameButton];
  ifShowItems(itemsToShow, true);
  // to hide
  var itemsToHide = [loginView, result].concat(Array.from(modes));
  ifShowItems(itemsToHide, false);
  showMessage('Choose your fighter!');
}

function resetGameBoard() {
    // to show
    var itemsToShow= [fighters];
    ifShowItems(itemsToShow, true);
    // to hide
    var itemsToHide = [result];
    ifShowItems(itemsToHide, false);

  // ifShowItem(fighters, true);
  // ifShowItem(result, false);
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
    // to show
    var itemsToShow= [result];
    ifShowItems(itemsToShow, true);
    // to hide
    var itemsToHide = [fighters];
    ifShowItems(itemsToHide, false);

    getUserFighter(event);
    // ifShowItem(fighters, false);
    // ifShowItem(result, true);
    renderResult();
    renderPlayers(players);
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


