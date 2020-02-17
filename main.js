let inflateButton = document.getElementById("inflate-button")
let startButton = document.getElementById("start-button")
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let popCount = 0


function startGame(){

  startButton.setAttribute("disabled", "true")
  inflateButton.removeAttribute("disabled")

  setTimeout(() => {
    console.log("TIME!")
    startButton.removeAttribute("disabled")
    inflateButton.setAttribute("disabled", "true")

    clickCount = 0
    height = 120
    width = 100

    draw()

  }, 5000)
}


function inflate(){
  clickCount++
  height+= inflationRate
  width+= inflationRate
  
  if(height >= maxSize){
    popCount++
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

  balloonElement.style.height = height.toString()
  balloonElement.style.width = width.toString()
  clickElem.innerText = clickCount.toString()
  popCountElem.innerHTML = popCount.toString()
  
}
