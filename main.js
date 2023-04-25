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
  if (localStorage.length > 3) {
    var humanAvatar = localStorage.getItem('avatar');
    var humanName = localStorage.getItem('name');
    var humanWins = parseInt(localStorage.getItem('humanWins'));
    var computerWins = parseInt(localStorage.getItem('computerWins'));
    currentGame = createGame(humanName, humanAvatar, humanWins, computerWins);
    displayHome();
  } else {
    displayLogIn();
    currentGame = createGame();
  }
});

avatarField.addEventListener('change', ()=> {
  if(avatarField.value === 'customize') {
    ifShowItems([imgUploadSection], true);
  } else {
    ifShowItems([imgUploadSection], false);
  }
});

loginView.addEventListener('submit', event => {
  event.preventDefault();
  currentGame.humanPlayer.name = nameField.value;

  if(avatarField.value !== "customize") {
    currentGame.humanPlayer.avatar = avatarField.value;
    localStorage.setItem('avatar', avatarField.value);
    localStorage.setItem('humanWins', '0');
    localStorage.setItem('computerWins', '0');
    localStorage.setItem('name', currentGame.humanPlayer.name);
  } else {
    currentGame.humanPlayer.avatar = imgURL;
    localStorage.setItem('avatar', currentGame.humanPlayer.avatar);
    localStorage.setItem('humanWins', '0');
    localStorage.setItem('computerWins', '0');
    localStorage.setItem('name', currentGame.humanPlayer.name);
  }
  displayHome();
});

imgInput.addEventListener('change', () => {
  var img = imgInput.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', () => {
     imgURL = reader.result;
  });
  reader.readAsDataURL(img);
}); 


gameBoard.addEventListener('click', event => {
  if (event.target.classList.contains('mode') || event.target.parentElement.classList.contains('mode')) {
    console.log('mode')
    getGameMode(event);
    displayFighters();
  } 

  if (event.target.nodeName === 'IMG' && !fighters.classList.contains('hidden')) {
    console.log('click on a fighter')
    displayResult(event);
    setTimeout(resetGameBoard, 1000);
  }
  
  if (event.target.classList.contains('return-home-button')) {
    console.log('return home')
    displayHome();
  }

  if (event.target.classList.contains('change-mode-button')) {
    console.log('change mode')
    showAlertMessage(`Your game mode will be changed!`);
  }

  if (event.target.classList.contains('cancel-button')) {
    console.log('cancle change')
    ifShowItems([alertBox], false);
  }

  if (event.target.classList.contains('ok-button')) {
    console.log('confirm change')
    toggleMode(currentGame.mode);
    ifShowItems([alertBox], false);
  }

});

endGameButton.addEventListener('click', () => {
  console.log('end game')
  localStorage.clear();
  displayLogIn();
});

asGuestButton.addEventListener('click', () => {
  console.log('as guest')
  localStorage.setItem('avatar', currentGame.humanPlayer.avatar);
  localStorage.setItem('humanWins', '0');
  localStorage.setItem('computerWins', '0');
  localStorage.setItem('name', currentGame.humanPlayer.name);
  displayHome();
});

function toggleMode() {
  console.log('toggleMode')
  if (currentGame.mode === easyMode) {
    currentGame.mode = difficultMode;
  } else {
    currentGame.mode = easyMode;
  }
  displayFighters();
}
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

function generateRandomFighter(fighters) {
  console.log('random fighter')
  var index = Math.floor(fighters.length * Math.random());
  return fighters[index];
}

function getGameMode(event) {
  console.log('get game mode')
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

function getUserFighter(event) {
  currentGame.humanPlayer.currentChoice = event.target;
    for (var i = 0; i < currentGame.mode.length; i++) {
      if (event.target.alt.includes(currentGame.mode[i].fighter)) {
      currentGame.humanPlayer.currentChoice = currentGame.mode[i];
      }
    }
}

function determineWinner(player1, player2) {
  console.log('determine winner')
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
  console.log('human: ', currentGame.humanPlayer.wins)
  console.log('computer: ', currentGame.computerPlayer.wins)
  console.log('--------')
  return winner;
}

function uploadImage() {
  ifShowItems([imgUploadSection], true);
}

function showResultText() {
  console.log('show result text')
  var winner = determineWinner(currentGame.humanPlayer, currentGame.computerPlayer);
  if (winner.name === localStorage.getItem('name')) {
    localStorage.setItem('humanWins', winner.wins)
  } else {
    localStorage.setItem('computerWins', winner.wins);
  }

  var message;
  if (winner) {
    message = `${winner.name} won!`; 
  } else {
    message = `It's a draw!`;
  }
  showMessage(message);
}

function displayLogIn() {
  console.log('display log in')
  var itemsToShow= [loginView];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [gameView];
  ifShowItems(itemsToHide, false);
}

function displayHome() {
  console.log('display home')
  renderPlayers(players);
  var itemsToShow= [gameView].concat(Array.from(modes));
  ifShowItems(itemsToShow, true);
  var itemsToHide = [result, fighters, loginView, changeModeButton, returnHomeButton];
  ifShowItems(itemsToHide, false);
}

function resetGameBoard() {
  console.log('reset game board')
  var itemsToShow= [fighters];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [result];
  ifShowItems(itemsToHide, false);
  showMessage('Choose your fighters!');
}

function displayFighters() {
  console.log('display fighters')
  showMessage('Choose your fighter!');
  renderFighters(currentGame.mode);
  var itemsToShow = [fighters, changeModeButton, returnHomeButton];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [loginView, result].concat(Array.from(modes));
  ifShowItems(itemsToHide, false);
}

function displayResult(event) {
  console.log('display result')
  var itemsToShow= [result];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [fighters];
  ifShowItems(itemsToHide, false);
  getUserFighter(event);
  renderResult();
  showResultText();  
  renderPlayers(players);
}


