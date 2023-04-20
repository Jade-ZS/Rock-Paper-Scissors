// variables
/** TODO: fix name and token later (hard coded in html, need to be fixed as well) */
var player1 = createPlayer();
var player2 = createPlayer();
var currentWinner;
var playerChoice;
var computerChoice;
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
var changeGameButton = document.querySelector('#change-game-button');




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
// TO DO: refactor- turn into one function ifShowItem(item, choice){}
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

// display players' fighter choices


// determine winner page
function generateRandomFighter(fighters) {
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}

function getUserFighter(event) {
  playerChoice = event.target
  for (var i = 0; i < currentMode.length; i++) {
    if (event.target.alt.includes(currentMode[i].fighter)) {
      playerChoice = currentMode[i];
    }
  }
}


function renderResult() {
  computerChoice = generateRandomFighter(currentMode);
  result.innerHTML = `
    <img src=${playerChoice.img} alt=${playerChoice.fighter}>
    <img src=${computerChoice.img} alt=${computerChoice.fighter}>
  `;
}


// refactor TO DO
function displayResult(event) {
    getUserFighter(event);
    ifShowItem(fighters, false);
    ifShowItem(result, true);
    renderResult();

    // render text
    var winner = determineWinner(playerChoice, computerChoice);
    var message;
    if (winner) {
      message = `${winner.fighter} wins!`; // TO DO: improve this, chagnge this to player's name
    } else {
      message = `It's a draw!`;
    }
    showMessage(message);
}

function determineWinner(player1, player2) {
  var winner;
  var condition1 = player1.fighter === 'rock' && player2.fighter === ('scissors'||'lizard');
  var condition2 = player1.fighter === 'paper' && player2.fighter === ('rock'||'alien');
  var condition3 = player1.fighter === 'scissors' && player2.fighter === ('paper'||'lizard');
  var condition4 = player1.fighter === 'lizard' && player2.fighter === ('paper'||'alien');
  var condition5 = player1.fighter === 'alien' && player2.fighter === ('scissors'||'rock');
  if (condition1||condition2||condition3||condition4||condition5) {
    winner = player1; // To DO: change this to player object
  } else if (player1.fighter === player2.fighter) {
    return false; // TO DO: improve this
  } else {
    winner = player2; // TO DO: change this to player object
  }
  return winner;
}



