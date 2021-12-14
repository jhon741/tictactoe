let boardLogic = (function(){
  let markNumber
  function renderMark(target, gameData) {
    if(target.classList.contains('active')) {
      ++gameData.turnsCount;
      let i = +target.getAttribute('i')
      let j = +target.getAttribute('j')
      target.textContent = gameData.currentTurn
      gameData.actualCoord['i'] = i
      gameData.actualCoord['j'] = j
      target.classList.remove('active')
    }
  }

  function changeTurn(gameData) {
    gameData.currentTurn = gameData.currentTurn == 'x' ? 'o' : 'x'; 
  }

  function fillBoard(gameData) {
    markNumber = (gameData.currentTurn == 'x') ? 1 : 4
    gameData.board[gameData.actualCoord.i][gameData.actualCoord.j] = markNumber
  }

  function cleanBoardImg(gameData) {
    gameData.boardImg.querySelectorAll('.board-item').forEach(element => {
      element.textContent = ''
  })
}

  function checkWinner(gameData) {
    if(gameData.turnsCount > 4) {
      let sum
      for (let i = 0; i < 3; i++) {
        sum = gameData.board[i].reduce((a,b) => a + b, 0)
        if(sum == 3) {
          gameData.winner.mark = 'x'
          break
        } else if(sum == 12) {
          gameData.winner.mark = 'o'
          break
        } else {
          sum = gameData.board[0][i] + gameData.board[1][i] + gameData.board[2][i]
          if(sum == 3) {
            gameData.winner.mark = 'x'
          } else if(sum == 12) {
            gameData.winner.mark = 'o'
          }
        }
      }
      
      sum = gameData.board[0][0] + gameData.board[1][1] + gameData.board[2][2]
      gameData.winner.mark = sum == 3 ? 'x' : sum == 12 ? 'o' : gameData.winner.mark
      sum = gameData.board[0][2] + gameData.board[1][1] + gameData.board[2][0]
      gameData.winner.mark = sum == 3 ? 'x' : sum == 12 ? 'o' : gameData.winner.mark
    }
  }

  function restartGame(gameData) {
    gameData.board = getEmptyBoard()
    gameData.turnsCount = 0
    gameData.winner.mark = ''
    gameData.winner.name = ''
    gameData.boxsClicked = []
    gameData.posibleChoices = [0,1,2,3,4,5,6,7,8],
    gameData.boardImg.querySelectorAll('.board-item').forEach(el => {
      if(!el.classList.contains('active')){
       el.classList.add('active') 
      }
    })
  }

  function showDrawn() {
    setTimeout(() => {
      alert('draw')
    }, 1);
  }

  function showWinner(gameData) {
    setTimeout(((winner) => {
      // console.log(`we have a winner ${winner}`);
      alert(`we have a winner ${winner}`);
    }).bind(this, gameData.winner.name), 1)
  }

  function getEmptyBoard() {
    return [
      ['','',''],
      ['','',''],
      ['','',''],
    ]
  }


  return {
    renderMark,
    changeTurn,
    fillBoard,
    cleanBoardImg,
    checkWinner,
    restartGame,
    showDrawn,
    showWinner,
    getEmptyBoard,
  }

})()