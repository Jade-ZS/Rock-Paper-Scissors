// variables
/** TODO: fix name and token later (hard coded in html, need to be fixed as well) */
var player1 = createPlayer();
var player2 = createPlayer();
var currentWinner;
var currentChoice;
var currentMode;
// var easyMode = ['rock', 'paper', 'scissors'];
// var difficultMode = easyMode.concat(['lizard', 'alien']);
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
var fighters = document.querySelector('.fighters')
// var easyMode = mode[0];
// var difficultMode = mode[1];


// event listeneres
gameBoard.addEventListener('click', event => displayGame(event));
gameBoard.addEventListener('click', event => getUserFighter(event));

// event handlers

// data model generator. to be fixed
function createPlayer(name, token, wins) {
  var player = {
    name: name || 'Unknown',
    token: token|| '👻',
    wins: wins || 0
  }
  
  return player;
}

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

/** local storage extension
 * saveWinsToStorage
 * retrieveWinsFromStorage
 * takeTurn
 */


// game page - choose a fighter page
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
  for (var i = 0; i < modes.length; i++) {
    modes[i].classList.add('hidden');
  };

  showMessage('Choose your fighter!');
  renderGameMode(event);
}

// display players' fighter choices


// determine winner page
function generateRandomFighter(fighters) {
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}

function getUserFighter(event) {
  if (event.target.nodeName === 'IMG') {
    for (var i = 0; i < currentMode.length; i++) {
      if (event.target.alt.includes(currentMode[i])) {
        currentChoice = currentMode[i];
      }
    }
  }
}

function determineWinner() {
  // TO DO
  // rules
  return;
}

