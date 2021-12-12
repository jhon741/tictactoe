let boardLogic = (function(){
  let currentTurn = 'x'
  let myBoard = board.getEmptyBoard(); 
  let turnsCount = 0
  let winner = ''

  // cacheDOM
  let boardImg = document.querySelector('.board')

  // bind events
  function startGame () {
    boardImg.querySelectorAll('.board-item').forEach(el => el.addEventListener('click', render))
    boardImg.style.display = 'grid'
  }

  function render(e) {
    if(e.target.classList.contains('active')) {
      let i = +e.target.getAttribute('i')
      let j = +e.target.getAttribute('j')
      paintBoard(e.target)
      fillBoard({i:i, j:j})
      checkWinner()
    }
  }

  function paintBoard(targ) {
    targ.textContent = currentTurn
    targ.classList.remove('active')
  }

  function changeTurn(turn) {
    currentTurn = turn == 'x' ? 'o' : 'x';
  }

  function fillBoard(coord) {
    markNumber = (currentTurn == 'x') ? 1 : 4
    myBoard[coord.i][coord.j] = markNumber
  }

  function cleanBoard() {
    boardImg.querySelectorAll('.board-item').forEach(element => {
      element.textContent = ''
    });
  }

  function checkWinner() {
    ++turnsCount
    changeTurn(currentTurn)
    if(turnsCount > 4) {
      console.log('checking winner');
      let sum
      for (let i = 0; i < 3; i++) {
        sum = myBoard[i].reduce((a,b) => a + b, 0)
        console.log(turnsCount);
        console.log(sum);
        if(sum == 3) {
          winner = 'x'
          break
        } else if(sum == 12) {
          winner = 'o'
          break
        } else {
          sum = myBoard[0][i] + myBoard[1][i] + myBoard[2][i]
          if(sum == 3) {
            winner = 'x'
          } else if(sum == 12) {
            winner = 'o'
          }
        }
      }
      
      sum = myBoard[0][0] + myBoard[1][1] + myBoard[2][2]
      winner = sum == 3 ? 'x' : sum == 12 ? 'o' : winner
      sum = myBoard[0][2] + myBoard[1][1] + myBoard[2][0]
      winner = sum == 3 ? 'x' : sum == 12 ? 'o' : winner
      if(winner) {
        showWinner()
        restartGame()
      }
    }
  if(turnsCount == 9 && winner == '') {
    showDrawn()
    restartGame()
  }
  }

  function restartGame() {
    myBoard = board.getEmptyBoard()
    turnsCount = 0
    winner = ''
    boardImg.querySelectorAll('.board-item').forEach(el => {
      if(!el.classList.contains('active')){
       el.classList.add('active') 
      }
    })
    setTimeout(() => {
      cleanBoard()
    }, 10);
  }

  function showDrawn() {
    setTimeout(() => {
      alert('draw')
    }, 1);
  }

  function showWinner() {
    setTimeout(((winner) => {
      alert(`we have a winner ${winner}`);
    }).bind(this, winner), 1)
  }

  return {
    startGame,
    restartGame,
  }

})()