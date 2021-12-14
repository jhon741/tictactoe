let pvpLogic =  (function(){
  let gameData
  // cacheDOM
  let restartBtn = document.querySelector('.restartBtn')
  function startGame(data) {
    console.log('game has started');
    gameData = {
      board: boardLogic.getEmptyBoard(),
      boardImg: document.querySelector('.board'),
      p1 : {name: '', mark: 'x'},
      p2 : {name: '', mark: 'o'},
      currentTurn: 'x',
      turnsCount : 0,
      winner: {name: '', mark:''},
      actualCoord: {},
      boxsClicked: [],
      posibleChoices : [],
    }

    gameData.p1.name = data.p1.name
    gameData.p2.name = data.p2.name
    console.log(gameData);

    gameData.boardImg.querySelectorAll('.board-item').forEach(el => el.addEventListener('click', render))
    console.log(gameData.boardImg);
    console.log('ok');
    restartBtn.addEventListener('click', restartGame)
    gameData.boardImg.style.display = 'grid'
  }
  
  pubSub.on('configPvpReady', startGame)

  function restartGame() {
    boardLogic.restartGame(gameData)
    boardLogic.cleanBoardImg(gameData)
  }

  function render(e) {
    console.log('asdasfkjasgdh');
    if(gameData.boxsClicked.every(el => el != e.target)) {
      gameData.boxsClicked.push(e.target)
      boardLogic.renderMark(e.target, gameData)
      boardLogic.fillBoard(gameData)
      boardLogic.checkWinner(gameData)
      boardLogic.changeTurn(gameData)
      console.log(gameData);  
      checkWinner()
    }
  }

  function checkWinner() {
    if(gameData.turnsCount > 4) {
      if(gameData.winner.mark) {
        if(gameData.winner.mark == gameData.p1.mark) {
          gameData.winner.name = gameData.p1.name
        } else {
          gameData.winner.name = gameData.p2.name
        }
        boardLogic.showWinner(gameData)
        boardLogic.restartGame(gameData)
        console.log(`the winner is ${gameData.winner.mark}`);
        setTimeout(() => {
          boardLogic.cleanBoardImg(gameData)
        }, 10);
      } else {
        if(gameData.turnsCount == 9) {
          boardLogic.showDrawn()      
          boardLogic.restartGame(gameData)
          setTimeout(() => {
            boardLogic.cleanBoardImg(gameData)
          }, 10);
        }
        console.log('we have no winne ryet');
      }

    }
  }

})()