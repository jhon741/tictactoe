let controls = (function() {

  // initial values
  let pmark

  // cacheDOM
  let optionsContainer = document.querySelector('.optionsContainer')
  let selectModeContainer = optionsContainer.querySelector('.selectMode')
  let pvpBtn = selectModeContainer.querySelector('.pvp')
  let pvcBtn = selectModeContainer.querySelector('.pvc')
  let pvpContainer = optionsContainer.querySelector('.pvpContainer')
  let p1Name = pvpContainer.querySelector('#p1Name')
  let p2Name = pvpContainer.querySelector('#p2Name')
  let startPvpBtn = pvpContainer.querySelector('.startPvpGame')
  let pvcContainer = optionsContainer.querySelector('.pvcContainer')
  let pName = pvcContainer.querySelector('#pName')
  let pMarkContainer = pvcContainer.querySelector('.markBtnContainer')
  let xMark = pMarkContainer.querySelector('.xMark')
  let oMark = pMarkContainer.querySelector('.oMark')
  let startPvcBtn = pvcContainer.querySelector('.startPvcGame')

  //bind Events

  console.log(pvpBtn);
  pvpBtn.addEventListener('click', selectPvpMode)
  pvcBtn.addEventListener('click', selectPvcMode)
  startPvpBtn.addEventListener('click', startPvpMode)
  startPvcBtn.addEventListener('click', startPvcMode)
  xMark.addEventListener('click', setXasMark)
  oMark.addEventListener('click', setOasMark)
  // functions 

  function setXasMark() {
    pmark = 'x'
    xMark.classList.toggle('active')
    if(oMark.classList.contains('active')) {
      oMark.classList.toggle('active')
    }
  }

  function setOasMark() {
    pmark = 'o'
    oMark.classList.toggle('active')
    if(xMark.classList.contains('active')) {
      xMark.classList.toggle('active')
    }
  }

  function selectPvpMode(e) {
    selectModeContainer.style.display = 'none'
    pvpContainer.style.display = 'block'
    pvcContainer.style.display = 'none'
  }

  function selectPvcMode(e) {
    selectModeContainer.style.display = 'none'
    pvpContainer.style.display = 'none'
    pvcContainer.style.display = 'block'
  }

  function startPvpMode() {
    let data = {
      p1: {name: p1Name.value},
      p2: {name: p2Name.value}
    }
    pvpContainer.style.display = 'none'
    optionsContainer.style.display = 'none'
    pubSub.emit('configPvpReady', data)

  }

  function startPvcMode() {
    let data = {p1: {name: pName.value, mark: pmark}}
    if(data.p1.mark && data.p1.name) {
      let cmark = pmark == 'x' ? 'o' : 'x'
      data.p2 = {mark: cmark}
      pvcContainer.style.display = 'none'
      optionsContainer.style.display = 'none'
      pubSub.emit('configPvcReady', data)
    } else {
      console.log('mark or name missing');
    }
  }



})()