// variables
/** TODO: fix name and token later (hard coded in html, need to be fixed as well) */
var player1 = createPlayer();
var player2 = createPlayer();
var currentWinner;


// event listeneres

// event handlers
function createPlayer(name, token, wins) {
  var player = {
    name: name || 'Unknown',
    token: token|| 👻,
    wins: wins || 0
  }
  
  return player;
}

/**
 * saveWinsToStorage
 * retrieveWinsFromStorage
 * takeTurn
 */

// idea: move is an array, player1's move and player2's move in each round
function createGame(move, type) {
  var game = {
    player1: player1,
    player2: player2,
    move: move,
    type: type
  }
  return game;
}