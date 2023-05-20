(function () {
  // Define the Sudoku puzzles as 2D arrays
  let puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const btnSolve = document.getElementById('btnSolve');
  const btnRead = document.getElementById('btnRead');

  // Solve the puzzle and render the solved puzzle
  btnSolve.addEventListener('click', function (event) {
    event.preventDefault();

    const solved = solveSudoku(puzzle);
    if (!solved) {
      alert('The puzzle could not be solved.');
      return;
    }

    renderSudoku(puzzle, 'puzzle');
  });

  // Read the input and update the puzzle
  btnRead.addEventListener('click', function (event) {
    event.preventDefault();

    const sudokuArray = getSudokuArray();
    if (sudokuArray) {
      puzzle = sudokuArray;
      renderSudoku(puzzle, 'puzzle');
    }
  });


  // Render the solved puzzles in HTML
  renderSudoku(puzzle, 'puzzle');

  function solveSudoku(board) {
    // Find the next empty cell on the board
    const [row, col] = findEmptyCell(board);

    // If there are no more empty cells, the board is solved
    if (row === -1) {
      return true;
    }

    // Try each possible value for the empty cell
    for (let val = 1; val <= 9; val++) {
      if (isValidMove(board, row, col, val)) {
        board[row][col] = val;

        // Recurse to solve the rest of the board
        if (solveSudoku(board)) {
          return true;
        }

        // If the recursive call doesn't find a solution, backtrack
        board[row][col] = 0;
      }
    }

    // If no value works, the board is unsolvable
    return false;
  }

  function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }

    // If no empty cells are found, return -1, -1
    return [-1, -1];
  }

  function isValidMove(board, row, col, val) {
    // Check row for conflicts
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === val) {
        return false;
      }
    }

    // Check column for conflicts
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === val) {
        return false;
      }
    }

    // Check 3x3 box for conflicts
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === val) {
          return false;
        }
      }
    }

    // If no conflicts are found, the move is valid
    return true;
  }

  function renderSudoku(board, gridId) {
    const element = document.getElementById(gridId);
    const rmGrid = element.querySelector('.grid');

    // Remove table from DOM if it already exists
    if (rmGrid) {
      element.removeChild(rmGrid);
    }

    const grid = document.createElement('div');
    grid.classList.add('grid');
    element.appendChild(grid);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement('input');
        // cell.classList.add('cell');
        cell.type = 'text';
        cell.className = 'cell';
        grid.appendChild(cell);


        const val = board[row][col];
        cell.value = val !== 0 ? val : '';
      }
    }
  }
  function getSudokuArray() {
    const inputElements = document.querySelectorAll('#puzzle .cell');
    const sudokuArray = [];

    for (let i = 0; i < inputElements.length; i++) {
      const value = inputElements[i].value.trim();
      sudokuArray.push(value !== '' ? parseInt(value) : 0);
    }

    // Split the flat array into a 2D array
    const rows = [];
    for (let i = 0; i < sudokuArray.length; i += 9) {
      rows.push(sudokuArray.slice(i, i + 9));
    }

    return rows;
  }

  function isValidNumber(value) {
    try {
      const num = parseInt(value);
      return isNaN(num) || num < 1 || num > 9;
    } catch (error) {
      return false
    }
  }

})()