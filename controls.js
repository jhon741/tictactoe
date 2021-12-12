let controls = (function() {
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
  let startPvcBtn = pvpContainer.querySelector('.startPvcGame')
})()