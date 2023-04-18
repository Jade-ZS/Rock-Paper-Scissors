### Project Due: Tuesday, April 25 @ 5pm PST

#### Required Features:
- Both players’ wins should be displayed.
- Both players’ selected fighter icon should be displayed each round.
- Winner (or Draw) should be announced each round.
- A timeout is used after a completed round to reset the board.
- The overall layout should be the same but you can choose different colors and icons if you want to get creative with your with your Rock Paper Scissors design!
- This game is played by one user against a computer. The computer player should be another player object with the name of ‘computer’ and have the ability to make a random choice.
- You’ll need to make two versions of Rock, Paper, Scissors - “classic” and some variation. The variation should include more than 3 options (the one in the video has 5). You can invent your own variation, or do some research on variations here. Make sure you communicate the rules to your user!

#### Timeline
- Apr 18 (Tue): 
    - basic `HTML` & `CSS`
- Apr 19 (Wed):
    - [ ] `createPlayer` function should return an object with the following properties: 
        - name (ex: 'Human'), token (ex: '👩🏻'), wins (ex: 0)
    - [ ] A `createGame` function that should return a game object containing:
        - Two Player objects (player1 and player2)
        - A way to keep track of the data for the game board
        - A way to keep track of the selected game type
    - [ ] design a game data model
    - [ ] Create central game board on the DOM
    - [ ] Connect game data model to the DOM
    - [ ] Display the player data in the sidebars
    - [ ] Automatically reset the game board to allow for a new game to be played after the previous game is won
    - [ ] refactor before start extension 
    

- Apr 20 (Thur):
    - [ ] extention: Persist player data using local storage (number of wins should persist across page refreshes)
    - [ ] extension: keep your DOM related JavaScript in a separate JS file altogether. This is NOT a requirement or expectation of this project. If you finish with extra time and want to try refactoring your code to pull the DOM related JavaScript into a `domUpdates.js` file, be sure to do so on a branch so you aren’t breaking your finished, working code while you play with it.
    - [ ] extension: responsive break points
    - [ ] extension: log in page
    - [ ] extension: allow user to chose profile/gender
    - [ ] extension: animation 
    - [ ] extension: cute game start alert
- Apr 21 (Fri):
    - other extension ideas
    - finish README.md
