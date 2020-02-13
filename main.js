let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300



function inflate(){
  clickCount++
  let balloonElement = document.getElementById("balloon")
  height+= inflationRate
  width+= inflationRate
  
  if(height >= maxSize){
    console.log("popped")
    width = 0
    height = 0
  }

  balloonElement.style.height = height.toString()
  balloonElement.style.width = width.toString()

  let clickElem = document.getElementById("click-count")
  clickElem.innerText = clickCount.toString()
}