// Gameboard object
const GameBoard = (() => {
  let board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
  ];

  const getBoard = () => board;

  const setCell = (y, x, userTurn) => {
    if (board[y][x] != "-") {
      throw new Error("This cell is already populated.");
    }

    board[y][x] = userTurn;
  }

  const resetBoard = () => {
    board = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"]
    ];
  }

  return {getBoard, setCell, resetBoard};
})();

// Player object(s)
Player = (name, marker) => {

  let score = 0;

  const getName = () => name;
  const getMarker = () => marker;
  const getScore = () =>  score;

  const increaseScore = () => {
    score++;
  }

  return {getName, getMarker, getScore, increaseScore};

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

 // Changers the marker
  const changeTurn = () => {
    markerTurn = (markerTurn == "X") ? "O" : "X";
  }  


  // Makes move
  const MakeMove = (y, x) => {
    console.log(`${y} row, ${x} column`);

    try {
      GameBoard.setCell(y, x, markerTurn);
    } catch(error) {
      console.log(error);
      return;
    }
    

    // Update UI
    drawBoard();

  }
  
// Check for Win / End of game
  const checkResult = () => {
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
        if (markerTurn == "X") {
          player1.increaseScore();
          console.log(`Player 1 has ${player1.getScore()} wins`);
          return "win";
        }
        else {
          player2.increaseScore();
          console.log(`Player 2 has ${player2.getScore()} wins`)
          return "win";
        }
      }
    }
    
    // Check for draw, if there's no winner
    if (!result.some(row => row.includes("-"))) {
      console.log("Draw!");
      return "draw";
    }

    changeTurn();

  }

  // Restart game
  const resetGame = () => {
    GameBoard.resetBoard();
    
  }


  let markerTurn = "O";
  const getTurn = () => markerTurn;

  player1 = Player("Player 1", "X");
  player2 = Player("Player 2", "O");

  return {Start, MakeMove, checkResult, changeTurn, resetGame, getTurn, player1, player2};



})();



const ScreenController = (() => {
  const newGameButton = document.querySelector("#new-game");
  const playerTurnSpan = document.querySelector("#player-turn");
  const boardDiv = document.querySelector(".board");
  const playerOneScore = document.querySelector("#player-1-score");
  const playerTwoScore = document.querySelector("#player-2-score");

  // Update Board
  function updateBoard() {

    // Check if game is over then don't add event listeners to board, update score and text
    const result = Game.checkResult();
    if (result == "win") {
      playerTurnSpan.textContent = `Player ${Game.getTurn()} has won!`;
    }
    else if (result == "draw") {
      playerTurnSpan.textContent = `It's a draw!`;
    }
    else {
      // Update turn text
      playerTurnSpan.textContent = `Player ${Game.getTurn()}'s turn!`;
    }

    // Update Scores
    playerOneScore.textContent = player1.getScore();
    playerTwoScore.textContent = player2.getScore();

    // Clear board
    boardDiv.textContent = "";

    // Get latest Board
    currentBoard = GameBoard.getBoard();

    // Render board
    for (const [i, row] of currentBoard.entries()) {
      for (const [j, cell] of row.entries()) {
        const cellButton = document.createElement("button");
        cellButton.classList.add("board-cell");
        cellButton.id = `${i}${j}`;
        cellButton.textContent = (currentBoard[i][j] == "-") ? "" : currentBoard[i][j];

        boardDiv.appendChild(cellButton);

        // Add event listener to cell if blank and the game is still not over.

        if (cellButton.textContent == "" && !result) {
          cellButton.addEventListener("click", makeMove)
        }
      }
    }

    

  }

  function makeMove(e) {
    const targetRow = e.target.id[0];
    const targetColumn = e.target.id[1];

    Game.MakeMove(targetRow, targetColumn);

    updateBoard();
  }

  

  // Event listener for New game button

  function gameStart() {
    // Reset board array values
    Game.resetGame();
    // Update Screen

    updateBoard();

  }

  

  newGameButton.addEventListener("click", gameStart); 


})();