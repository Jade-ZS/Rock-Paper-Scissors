// variables
// DATA model
var currentGame = createGame();
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
// var loginButton = document.querySelector('.log-in-button');
var registerButton = document.querySelector('.register-button');
var cancelRegisterButton = document.querySelector('.cancel-register-button')
var createAccountButton = document.querySelector('.create-account-button')
var asGuestButton = document.querySelector('.as-guest-button');
var changeGameButton = document.querySelector('.change-game-button');
var uploadButton = document.querySelector('.upload-image-button');

var imgUploadSection = document.querySelector('.customize-avatar-section');
var imgInput = imgUploadSection.children[0];
var uploadedImg;

// local storage
var avatarField = loginView.children[0].children[1];
var nameField = loginView.children[1].children[1];


// bug
imgInput.addEventListener('change', (event) => {
  imgInput.src = URL.createObjectURL(event.target.files[0]);
  console.log(imgInput)
  current.game.humanPlayer.avatar = imgInput;
  console.log(currentGame.humanPlayer);
}); 

// event listeneres
window.addEventListener('load', () => {
  if (localStorage.length) {
    displayHome();
  } else {
    displayLogIn();
  }
});

avatarField.addEventListener('change', ()=> {
  if(avatarField.value === 'customize') {
    ifShowItems([imgUploadSection], true);
  } else {
    ifShowItems([imgUploadSection], false);
  }
});

// uploadButton.addEventListener()

// log in view
// registerButton.addEventListener('click', displayRegister);
asGuestButton.addEventListener('click', displayHome);
loginView.addEventListener('submit', event => {
  event.preventDefault();
  currentGame.humanPlayer.name = nameField.value;
  currentGame.humanPlayer.avatar = avatarField.value;
  displayHome();

});


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

// event handlers
function createPlayer(name, avatar, wins) {
  var player = {
    name: name || 'tourist',
    avatar: avatar|| '👤',
    wins: wins || 0
  }
  return player;
}

function createGame() {
  var humanPlayer = createPlayer();
  var computerPlayer = createPlayer('computer', '💻');
  var game = {
    humanPlayer: humanPlayer,
    computerPlayer: computerPlayer
  }
  return game;
}

/** local storage extension
 * saveWinsToStorage
 * retrieveWinsFromStorage
 * takeTurn
 */

function uploadImage() {
  ifShowItems([imgUploadSection], true);
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

// log-in-page
function displayLogIn() {
  var itemsToShow= [loginView];
  ifShowItems(itemsToShow, true);
  var itemsToHide = [gameView];
  ifShowItems(itemsToHide, false);
}


/** if (localStorage) {
  // bring to game page
} else {
  // bring to login page
}
*/ 


//

// home-page
function displayHome() {
  renderPlayers(players);

    // to show
    var itemsToShow= [gameView].concat(Array.from(modes));
    ifShowItems(itemsToShow, true);
    // to hide
    var itemsToHide = [result, fighters, loginView];
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
    var itemsToShow= [fighters];
    ifShowItems(itemsToShow, true);
    var itemsToHide = [result];
    ifShowItems(itemsToHide, false);
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
    renderPlayers(players);
    
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


