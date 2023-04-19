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
var fighters = document.querySelector('.fighters');

var result = document.querySelector('.result');
// var easyMode = mode[0];
// var difficultMode = mode[1];




// event listeneres
gameBoard.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') {
    displayGame(event);
  }
});
gameBoard.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG' && !fighters.classList.contains('hidden')) {
    displayResult(event);
  }
});


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
function ifShowModeBox(choice) {
  for (var i = 0; i < modes.length; i++) {
    if (!choice) {
      modes[i].classList.add('hidden');
    } else {
      modes[i].classList.remove('hidden');
    }
  };
}

function ifShowFighters(choice) {
  if (!choice) {
    fighters.classList.add('hidden');
  } else {
    fighters.classList.remove('hidden');
  }
}


// might not need this
function hideResult() {
  result.classList.add('hidden');
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
  ifShowModeBox(false);
  ifShowFighters(true);
  showMessage('Choose your fighter!');
  renderGameMode(event);
}

// display players' fighter choices


// determine winner page
function generateRandomFighter(fighters) {
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}


// refactor TO DO
function getUserFighter(event) {
  currentChoice = event.target
  for (var i = 0; i < currentMode.length; i++) {
    if (event.target.alt.includes(currentMode[i].fighter)) {
      currentChoice = currentMode[i];
    }
  }
}


function renderResult() {
  var computerChoice = generateRandomFighter(currentMode);
  var playerChoice = currentChoice;
  result.innerHTML = `
    <img src=${playerChoice.img} alt=${playerChoice.fighter}>
    <img src=${computerChoice.img} alt=${computerChoice.fighter}>
  `;
}


// refactor TO DO
function displayResult(event) {
    getUserFighter(event);
    ifShowFighters(false);
    renderResult();
}

function determineWinner() {
  // TO DO
  // rules
  return;
}

