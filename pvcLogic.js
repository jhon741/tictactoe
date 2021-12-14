let pvcLogic = (function () {
  let gameData = {}
  let restartBtn = document.querySelector('.restartBtn')
  function startGame(data) {
    gameData = {
      board: boardLogic.getEmptyBoard(),
      boardImg: document.querySelector('.board'),
      p1 : {name: 'jose', mark: 'x'},
      p2 : {name: 'computer', mark: 'o'},
      currentTurn: 'x',
      turnsCount : 0,
      winner : {name: '', mark: ''},
      actualCoord: {},
      boxsClicked: [],
      posibleChoices : [0,1,2,3,4,5,6,7,8],
    }

    gameData.p1.name = data.p1.name
    gameData.p1.mark = data.p1.mark
    gameData.p2.mark = data.p2.mark

    gameData.boardImg.querySelectorAll('.board-item').forEach(el => el.addEventListener('click', makeMove))
    gameData.boardImg.style.display = 'grid'
    restartBtn.addEventListener('click', restartGame)

    checkFirstTurn()
  }

  // startGame()

  pubSub.on('configPvcReady', startGame)

  function restartGame() {
    boardLogic.restartGame(gameData)
    boardLogic.cleanBoardImg(gameData)
  }

  function checkFirstTurn() {
    if(gameData.currentTurn == gameData.p2.mark) {
      makeMove(gameData.currentTurn)
    }
  }

  function makeMove(e) {
    let targ
    if(typeof e === 'string') {
      let choice = randomChoice()
      let cord = fromNumberToCoord(gameData.posibleChoices[choice])
        
        targ =  [...gameData.boardImg.querySelectorAll('.board-item')].find(el => {
          let i = +el.getAttribute('i')
          let j = +el.getAttribute('j')
          return (cord.i == i && cord.j == j )
        })
        console.log(targ);
        t = targ
      // targ = targ[0]
    } else {
      targ = e.target
    }
    if(gameData.boxsClicked.every(el => el != targ)) 
    {
      gameData.boxsClicked.push(targ)
      boardLogic.renderMark(targ, gameData)
      boardLogic.fillBoard(gameData)
      let choosedNum = FromCoordToNumber(gameData.actualCoord)
      let index = gameData.posibleChoices.findIndex(el => el == choosedNum)
      gameData.posibleChoices.splice(index,1)
      boardLogic.checkWinner(gameData)
      boardLogic.changeTurn(gameData)
      let win = checkWinner()
      if(gameData.currentTurn == gameData.p2.mark && win == '') {
        makeMove(gameData.currentTurn)
      }
    }
  }

  function randomChoice() {
    let choice = Math.floor(Math.random() * gameData.posibleChoices.length)
    return choice
  }

  function checkWinner() {
    let win = ''
    if(gameData.turnsCount > 4) {
      if(gameData.winner.mark) {
        if(gameData.winner.mark == gameData.p1.mark) {
          gameData.winner.name = gameData.p1.name
        } else {
          gameData.winner.name = gameData.p2.name
        }
        boardLogic.showWinner(gameData)
        win = gameData.winner.name
        setTimeout(() => {
          boardLogic.cleanBoardImg(gameData)
          boardLogic.restartGame(gameData)
          checkFirstTurn()
        }, 10);
        
      } else {
        if(gameData.turnsCount == 9) {
          boardLogic.showDrawn()
          setTimeout(() => {
            boardLogic.cleanBoardImg(gameData)
            boardLogic.restartGame(gameData)
            checkFirstTurn()
          }, 10);
          win = 'draw'
        }
      }
    }
    return win
  }

  function FromCoordToNumber(coord) {
    let strCoord = `${coord.i},${coord.j}`
    let num
    switch (strCoord) {
      case '0,0':
        num = 0
        break;
    
      case '0,1':
        num = 1
        break;
      
      case '0,2':
        num = 2
        break;
    
      case '1,0':
        num = 3
        break;

      case '1,1':
        num = 4
        break;
    
      case '1,2':
        num = 5
        break;
      
      case '2,0':
        num = 6
        break;
    
      case '2,1':
        num = 7
        break;
      
        case '2,2':
        num = 8
        break;
    }
    return num
  }

  function fromNumberToCoord(num) {
    let coord
    switch (num) {
      case 0:
        coord = {i: 0, j:0}
        break;
    
      case 1:
        coord = {i: 0, j:1}
        break;
      
      case 2:
        coord = {i: 0, j:2}
        break;
    
      case 3:
        coord = {i: 1, j:0}
        break;

      case 4:
        coord = {i:1, j:1}
        break;
    
      case 5:
        coord = {i: 1, j:2}
        break;
      
      case 6:
        coord = {i: 2, j:0}
        break;
    
      case 7:
        coord = {i: 2, j:1}
        break;
      
      case 8:
        coord = {i: 2, j:2}
        break;
    }
    return coord
  }
  return {
    getData: () =>gameData
  }
})()