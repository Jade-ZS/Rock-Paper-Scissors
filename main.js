// variables
/** TODO: fix name and token later (hard coded in html, need to be fixed as well) */
var player1 = createPlayer();
var player2 = createPlayer();
var currentWinner;

var gameBoard = document.querySelector('main');
var modes = gameBoard.getElementsByClassName('mode');
var subline = document.querySelector('header>h2');
var fighters = document.querySelector('.fighters')
// var easyMode = mode[0];
// var difficultMode = mode[1];

gameBoard.addEventListener('click', (event) => {
  if (event.target.innerText.indexOf('CLASSIC') !== -1|| event.target.parentElement.firstElementChild.innerText.indexOf("CLASSIC") !== -1) {
    renderEasyMode();
  } else {
    renderDifficultMode();
  }
});



// event listeneres

// event handlers
function createPlayer(name, token, wins) {
  var player = {
    name: name || 'Unknown',
    token: token|| '👻',
    wins: wins || 0
  }
  
  return player;
}

/**
 * saveWinsToStorage
 * retrieveWinsFromStorage
 * takeTurn
 */

// idea: fighters is an array, player1's fighter and player2's fighter in each round
function createGame(fighters, type) {
  var game = {
    player1: player1,
    player2: player2,
    fighters: fighters,
    type: type
  }
  return game;
}

function renderEasyMode() {
  fighters.innerHTML = `
    <img src="./assets/happy-rocks.png" alt="rock icon">
    <img src="./assets/happy-paper.png" alt="paper icon">
    <img src="./assets/happy-scissors.png" alt="scissors icon">
    `;
  displayGame();
  return;
}

function renderDifficultMode() {
  // todo 
  displayGame();
  return;
}

function displayGame() {
  for (var i = 0; i < modes.length; i++) {
    modes[i].classList.add('hidden');
  }

  subline.innerText = 'Choose your fighter!';
  return;
}