// Gameboard object
const GameBoard = (() => {
  const board = [
    ["X", "O", "O"],
    ["O", "X", "X"],
    ["X", "O", "O"]
  ];

  const getBoard = () => board;


  return {getBoard};
})();

// Player object(s)
Player = (name, marker) => {

  const getName = () => name;
  const getMarker = () => marker;

  return {getName, getMarker};

}




// Main game object
const Game = (() => {
  
  // Draw Board
  const drawBoard = () => {
    console.log(GameBoard.getBoard()[0]);
    console.log(GameBoard.getBoard()[1]);
    console.log(GameBoard.getBoard()[2]);

    return {};

  }  

  // Start Game
  const Start = () => {
    drawBoard();
  }

  


  // Make move
  const MakeMove = (y, x) => {
    console.log(`${y} row, ${x} column`);
    console.log(GameBoard.getBoard());

    GameBoard.getBoard()[y][x] = markerTurn;

    // Update UI
    drawBoard();

    // Check if game is decided
    // if decided then end the game


    // if not decided change turn

    

  }
  
// Check for Win / End of game
  const checkResult = () => {
    let winningMarker;
    result = GameBoard.getBoard();

    // All winning conditions
    validCombinations = [
      result[0],
      result[1],
      result[2],
      [result[0][0], result[1][0], result[2][0]],
      [result[0][1], result[1][1], result[2][1]],
      [result[0][2], result[1][2], result[2][2]],
      [result[0][0], result[1][1], result[2][2]],
      [result[0][2], result[1][1], result[2][0]],
    ]


    // Check for win
    for (condition of validCombinations) {
      if (condition.every(value => value == markerTurn)) {
        console.log("Winner!");
        winningMarker = markerTurn; 
        break
      }
    }
    
    // Check for draw, if there's no winner
    if (!winningMarker) {
      const isDraw = !result.some(row => row.includes("-"))
      console.log(isDraw);
    }



    
    // iterate through the valid combinations

    // top-row
    // middle-row
    // bottom-row

    // first-column
    // middle-column
    // bottom-column

    // left to right diag
    // right to left diag
    
    // all spaces taken
  }

  let markerTurn = "X";
  let player1Score = 0;
  let player2Score = 0;

  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");


  
  

  // Restart Game




  return {Start, MakeMove, checkResult};



})();


Game.Start();
Game.checkResult();
