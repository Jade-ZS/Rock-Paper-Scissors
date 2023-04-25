// variables
var currentGame;
var easyMode = [
  {fighter:'rock', img:'./assets/images/happy-rocks.png'},
  {fighter:'paper', img:'./assets/images/happy-paper.png'},
  {fighter:'scissors', img:'./assets/images/happy-scissors.png'},
];
var difficultMode = easyMode.concat(
  {fighter:'lizard', img:'./assets/images/lizard.png'},
  {fighter:'alien', img:'./assets/images/happy-alien.png'}
);

var loginView = document.querySelector('.login-view');
var loginForm = document.querySelector('.login-form');
var avatarField = loginForm.children[0].children[1];
var nameField = loginForm.children[1].children[1];
var imgUploadSection = document.querySelector('.customize-avatar-section');
var imgInput = imgUploadSection.children[0];
var imgURL;
var gameView = document.querySelector('.game-view');
var subline = document.querySelector('header>h2');
var gameBoard = document.querySelector('.gameboard');
var modes = gameBoard.getElementsByClassName('mode');
var fighters = document.querySelector('.fighters-view');
var result = document.querySelector('.result-view');
var players = document.getElementsByClassName('player');
var alertBox = document.querySelector('.alert-box');
var alertMessage = alertBox.firstElementChild;

var asGuestButton = document.querySelector('.as-guest-button');
var changeModeButton = document.querySelector('.change-mode-button');
var returnHomeButton = document.querySelector('.return-home-button');
var endGameButton = document.querySelector('.end-game-button');

// event listeneres
window.addEventListener('load', () => {
  if (localStorage.length > 0) {
    storageToData()
    displayHome();
  } else {
    currentGame = createGame();
    displayLogIn();
  }
});

loginView.addEventListener('submit', event => {
  event.preventDefault();
  getUserInfo();
  dataToStorage();
  displayHome();
});

avatarField.addEventListener('change', ()=> {
  displayUploadSection();
});

imgInput.addEventListener('change', getUploadedImg); 

asGuestButton.addEventListener('click', () => {
  dataToStorage();
  displayHome();
});

gameBoard.addEventListener('click', event => {
  if (event.target.classList.contains('mode') || event.target.parentElement.classList.contains('mode')) {
    getGameMode(event);
    displayFighters();
  } 
  if (event.target.nodeName === 'IMG' && !fighters.classList.contains('hidden')) {
    displayResult(event);
    setTimeout(resetGameBoard, 2000);
  }
  if (event.target.classList.contains('return-home-button')) {
    displayHome();
  }
  if (event.target.classList.contains('change-mode-button')) {
    showAlertMessage(`Your game mode will be changed!`);
  }
  if (event.target.classList.contains('cancel-button')) {
    ifShowItems([alertBox], false);
  }
  if (event.target.classList.contains('ok-button')) {
    toggleMode(currentGame.mode);
    ifShowItems([alertBox], false);
  }
});

endGameButton.addEventListener('click', () => {
  localStorage.clear();
  currentGame = createGame();
  displayLogIn();
});

// event handlers
function createPlayer(name, avatar, wins) {
  var player = {
    name: name || 'tourist',
    avatar: avatar|| '👤',
    wins: wins || 0
  }
  return player;
}

function createGame(name, avatar, humanWins, computerWins) {
  var humanPlayer = createPlayer(name, avatar, humanWins);
  var computerPlayer = createPlayer('computer', '💻', computerWins);
  var game = {
    humanPlayer: humanPlayer,
    computerPlayer: computerPlayer
  }
  return game;
}

function storageToData() {
  var humanAvatar = localStorage.getItem('avatar');
  var humanName = localStorage.getItem('name');
  var humanWins = parseInt(localStorage.getItem('humanWins'));
  var computerWins = parseInt(localStorage.getItem('computerWins'));
  currentGame = createGame(humanName, humanAvatar, humanWins, computerWins);
}

function dataToStorage() {
  localStorage.setItem('avatar', currentGame.humanPlayer.avatar);
  localStorage.setItem('humanWins', currentGame.humanPlayer.wins);
  localStorage.setItem('computerWins', currentGame.computerPlayer.wins);
  localStorage.setItem('name', currentGame.humanPlayer.name);
}

function displayLogIn() {
  var itemsToShow= [loginView];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [gameView];
  ifShowItems(itemsToHide, false);
}

function getUserInfo() {
  currentGame.humanPlayer.name = nameField.value;
  if(avatarField.value !== "customize") {
    currentGame.humanPlayer.avatar = avatarField.value;
  } else {
    currentGame.humanPlayer.avatar = imgURL;
  }
}

function displayUploadSection() {
  if(avatarField.value === 'customize') {
    ifShowItems([imgUploadSection], true);
  } else {
    ifShowItems([imgUploadSection], false);
  }
}

function getUploadedImg() {
  var img = imgInput.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', () => {
     imgURL = reader.result;
  });
  reader.readAsDataURL(img);
}

function displayHome() {
  renderSideBar(players);
  var itemsToShow= [gameView].concat(Array.from(modes));
  ifShowItems(itemsToShow, true);
  var itemsToHide = [result, fighters, loginView, changeModeButton, returnHomeButton];
  ifShowItems(itemsToHide, false);
}

function getGameMode(event) {
  var choiceBox = event.target.parentElement.firstElementChild;
  if (event.target.innerText.indexOf('CLASSIC') !== -1|| choiceBox.innerText.indexOf("CLASSIC") !== -1) {
    currentGame.mode = easyMode; 
    localStorage.setItem('mode', easyMode);
  } else {
    currentGame.mode = difficultMode;
    localStorage.setItem('mode', difficultMode);
  }
  return currentGame.mode;
}

function toggleMode() {
  if (currentGame.mode === easyMode) {
    currentGame.mode = difficultMode;
  } else {
    currentGame.mode = easyMode;
  }
  displayFighters();
}

function displayFighters() {
  showMessage('Choose your fighter!');
  renderFighters(currentGame.mode);
  var itemsToShow = [fighters, changeModeButton, returnHomeButton];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [loginView, result].concat(Array.from(modes));
  ifShowItems(itemsToHide, false);
}

function resetGameBoard() {
  var itemsToShow= [fighters];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [result];
  ifShowItems(itemsToHide, false);
  showMessage('Choose your fighters!');
}

function generateRandomFighter(fighters) {
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}

function getUserFighter(event) {
  currentGame.humanPlayer.currentChoice = event.target;
    for (var i = 0; i < currentGame.mode.length; i++) {
      if (event.target.alt.includes(currentGame.mode[i].fighter)) {
      currentGame.humanPlayer.currentChoice = currentGame.mode[i];
      }
    }
}

function displayResult(event) {
  var itemsToShow= [result];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [fighters];
  ifShowItems(itemsToHide, false);
  getUserFighter(event);
  renderResult();
  showResultText();  
  renderSideBar(players);
}

function showResultText() {
  var winner = determineWinner(currentGame.humanPlayer, currentGame.computerPlayer);
  var message;
  if (winner) {
    message = `${winner.name} won!`; 
  } else {
    message = `It's a draw!`;
  }
  showMessage(message);
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
  
  winner.wins += 1;
  dataToStorage();
 
  return winner;
}










