var previousScores = [];
var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Clear the board container before appending tiles
    document.getElementById("board").innerHTML = '';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.setAttribute("data-col", c); // Set the data attribute for the current column position

            let num = board[r][c];
            updateTile(tile, num, r, c, c); // Pass the current column position as prevC
            document.getElementById("board").append(tile);
        }
    }
}
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}
function updateTile(tile, num, r, c) {
    tile.innerText = "";
    tile.classList.value = "tile";

    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}
function keys() {
    document.addEventListener("keyup", (e) => {
        const previousBoardState = JSON.parse(JSON.stringify(board));

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.dataset.col = c;
            }
        }

        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
        } else if (e.code == "ArrowRight") {
            slideRight();
            setTwo();
        } else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();
        } else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
        }

        document.getElementById("score").innerText = score;
    });
}


    function filterZero(row) {
        return row.filter(num => num != 0); //mo create og new array without zero
    }

    function slide(row) {          // ex arr = [2,2,2,0]
        row = filterZero(row); // first step kay kwaon ang zero = [2,2,2]
    
        // nig slide
        for(let i = 0; i < row.length; i++){
            //check every two nga number
            if (row[i] ==  row[i+1]){
                row[i] *= 2;
                row[i+1] = 0;
                score += row[i];
            } // [2,2,2] mahimong ingon ani = [4,0,2]
        }

        row = filterZero(row); // [4,0,2] = [4,2]

        //add zero back
        while (row.length < columns) {
            row.push(0);
        } // [4,2] = [4,2,0,0]

        return row;

    }

    function playMoveSound() {
        var moveSound = document.getElementById('moveSound');
        moveSound.volume = 0.5;
        moveSound.play();
      }
      
      function slideLeft() {
        for (let r = 0; r < rows; r++) {
          let row = board[r];
          row = slide(row);
          board[r] = row;
      
          for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
          }
        }
      
        playMoveSound(); // Play sound after sliding
      }
      
      function slideRight() {
        for (let r = 0; r < rows; r++) {
          let row = board[r];
          row.reverse();
          row = slide(row);
          row.reverse();
          board[r] = row;
      
          for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
          }
        }
      
        playMoveSound(); // Play sound after sliding
      }
      
      function slideUp() {
        for (let c = 0; c < columns; c++) {
          let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
          row = slide(row);
      
          for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
          }
        }
      
        playMoveSound(); // Play sound after sliding
      }
      
      function slideDown() {
        for (let c = 0; c < columns; c++) {
          let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
          row.reverse();
          row = slide(row);
          row.reverse();
      
          for (let r = 0; r < columns; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
          }
        }
      
        playMoveSound(); // Play sound after sliding
      }
      
      // You can call keys() function after setting up sound to start listening for key events
      keys();


    function reset() {
  // Check if there are any non-zero values in the board
  if (board.every(row => row.every(cell => cell === 0))) {
    document.getElementById('overlay2').style.display = 'block';
    document.getElementById('popup2').style.display = 'block';
  }

  // Store the current score as the previous score
  previousScores.push(score);

  // Update the highest score if the current score is higher
  let highestScore = Math.max(...previousScores);
  if (score > highestScore) {
    highestScore = score;
  }

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  score = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }

  hasStarted = false; // Reset the flag to false

  // Clear the score on the UI
  var sound = document.getElementById('sound');

  // Reset audio to the beginning before playing
  sound.currentTime = 0;

  sound.volume = 0.5;
  sound.play();

  var audio = document.getElementById('music');
  audio.pause();

  // Display the current score on the UI
  document.getElementById("score").innerText = score;

  // Display the highest score
  document.getElementById("high").innerText = highestScore;
}
let hasStarted = false;

function hasEmptyTileStart() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function start() {
    if (hasStarted || !hasEmptyTileStart()) {
        return;
    }

    // Show initial tiles on the board
    setTwo();
    setTwo();

    var audio4 = document.getElementById('start2');
    audio4.play();
    audio4.volume = 0.1;

    setTimeout(function () {
        var audio = document.getElementById('music');
        audio.volume = 0.1;

        if (audio.paused) {
            // If the audio is paused, reset the playback position to the beginning
            audio.currentTime = 0;
        } else {
            // If the audio is playing, pause it and then reset the playback position to the beginning
            audio.pause();
            audio.currentTime = 0;
        }

        audio.play();
    }, 1000); // Wait for 2000 milliseconds (2 seconds)

    hasStarted = true; // set the flag to true after execution
    keys();
}

/*document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('music');
    var button = document.getElementById('toggleButton');
    var iconImage = document.getElementById('icon1');
    audio.volume = 0.1;
    audio.play();
    iconImage.src = 'images/speakerrIcon.png'; 

    button.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            iconImage.src = 'images/speakerrIcon.png';
        } else {
            audio.pause();
            iconImage.src = 'images/XSpearr.jpg'; 
        }
    });
}) */
function info() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
  
    var audio3 = document.getElementById('InfoSound');
  
    // Reset audio to the beginning before playing
    audio3.currentTime = 0;
  
    // Set the volume before playing
    audio3.volume = 0.1;
  
    // Play the audio
    audio3.play();
  }
    function closePopup() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('popup').style.display = 'none';
    }
function closePopup2() {
    document.getElementById('overlay2').style.display = 'none';
    document.getElementById('popup2').style.display = 'none';
  }

//Gameover
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr1[i][j] !== arr2[i][j]) {
                return false;
            }
        }
    }

    return true;
}
function keys() {
  let isMoving = false;
  function validMovesExist() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return true; // Valid move, as there is an empty cell
        }
        if (j < board[i].length - 1 && board[i][j] === board[i][j + 1]) {
          return true; // Valid move, as there are adjacent cells with the same value
        }
        if (i < board.length - 1 && board[i][j] === board[i + 1][j]) {
          return true; // Valid move, as there are adjacent cells with the same value
        }
      }
    }
    return false; // No valid moves
  }
  document.addEventListener("keyup", (e) => {
    if (isMoving) {
      return;
    }

    const previousBoardState = JSON.parse(JSON.stringify(board));

    // Check if there are valid moves before allowing the player to move
    if (!validMovesExist()) {
      document.getElementById('overlay3').style.display = 'block';
      document.getElementById('popup3').style.display = 'block';
      var sound2 = document.getElementById('sound2');
      sound2.volume = 0.5;
      sound2.play();
      var audio = document.getElementById('music');
      audio.pause();
      isMoving = true;

      // Reset isMoving after a short delay
      setTimeout(() => {
        isMoving = false;
      }, 500); // Adjust the delay as needed

      return;
    }

    if (e.code == "ArrowLeft") {
      slideLeft();
    } else if (e.code == "ArrowRight") {
      slideRight();
    } else if (e.code == "ArrowUp") {
      slideUp();
    } else if (e.code == "ArrowDown") {
      slideDown();
    }

    if (!validMovesExist()) {
      // If no valid moves after the player's move, display the Game Over popup
      document.getElementById('overlay3').style.display = 'block';
      document.getElementById('popup3').style.display = 'block';
      var sound2 = document.getElementById('sound2');
      sound2.volume = 0.5;
      sound2.play();
      var audio = document.getElementById('music');
      audio.pause();

      // Reset isMoving after a short delay
      setTimeout(() => {
        isMoving = false;
      }, 500); // Adjust the delay as needed

      return;
    }

    if (!arraysEqual(previousBoardState, board)) {
      setTwo();
    }

    document.getElementById("score").innerText = score;
  });
}
function closePopup3() {
  document.getElementById('overlay3').style.display = 'none';
  document.getElementById('popup3').style.display = 'none';
}
function instructions() {
  document.getElementById('overlay4').style.display = 'block';
  document.getElementById('popup4').style.display = 'block';

  var audio3 = document.getElementById('InfoSound');

  // Reset audio to the beginning before playing
  audio3.currentTime = 0;

  // Set the volume before playing
  audio3.volume = 0.1;

  // Play the audio
  audio3.play();
}
  function closePopup4() {
    document.getElementById('overlay4').style.display = 'none';
    document.getElementById('popup4').style.display = 'none';
  }
