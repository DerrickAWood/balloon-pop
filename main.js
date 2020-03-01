let inflateButton = document.getElementById("inflate-button")
let startButton = document.getElementById("start-button")

// #region GAME LOGIc

let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let currentPopCount = 0
let gameLength = 5000
let highestPopCount = 0
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}

function startGame(){

  startButton.setAttribute("disabled", "true")
  inflateButton.removeAttribute("disabled")
  startClock()
  setTimeout(stopGame, gameLength)
}

function startClock(){
  timeRemaining = gameLength
  drawClock()
  clockId = setInterval(drawClock, 1000)
}

function stopClock(){
  clearInterval(clockId)
}

function drawClock(){
  let countdownElem = document.getElementById("countdown")
  countdownElem.innerText = (timeRemaining / 1000).toString()
  timeRemaining -= 1000
}

function inflate(){
  clickCount++
  height+= inflationRate
  width+= inflationRate
  
  if(height >= maxSize){
    currentPopCount++
    console.log("popped")
    width = 0
    height = 0
  }
  draw()
}

function draw(){
  let clickElem = document.getElementById("click-count")
  let balloonElement = document.getElementById("balloon")
  let popCountElem = document.getElementById("pop-count")
  let highestPopCountElem = document.getElementById("high-pop-count")

  balloonElement.style.height = height.toString()
  balloonElement.style.width = width.toString()
  clickElem.innerText = clickCount.toString()
  popCountElem.innerHTML = currentPopCount.toString()
  highestPopCountElem.innerText = currentPlayer.topScore.toString()
  
}

function stopGame(){
  console.log("TIME!")
  startButton.removeAttribute("disabled")
  inflateButton.setAttribute("disabled", "true")

  clickCount = 0
  height = 120
  width = 100

  if(currentPopCount > currentPlayer.topScore){
    currentPlayer.topScore = currentPopCount
    savePlayers()
  }

  currentPopCount = 0


  stopClock()
  draw()
}

// #endregion

let players = []
loadPlayers()

function setPlayer(event){
  event.preventDefault()
  let form = event.target
  let playerName = form.playerName.value

  currentPlayer = players.find(player => player.name == playerName)

  if(!currentPlayer){
    currentPlayer = {name: playerName, topScore: 0 }
    players.push(currentPlayer)
    savePlayers()
  }
  console.log(currentPlayer)
  form.reset()
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
}

function changePlayer(){
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}

function savePlayers(){
  window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if(!playersData){
    players = []
  }else{
    players = playersData
  }
}