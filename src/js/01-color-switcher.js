const bodyEl = document.querySelector("body")

bodyEl.addEventListener("click", setColor)

let timerID = null;

function setColor(e) {
   
    if (e.target.dataset.hasOwnProperty("start")) {

        e.target.setAttribute("disabled", "true");
        timerID = 
            setInterval(() => {
                bodyEl.style.backgroundColor = getRandomHexColor()
            }, 1000)
        
    }
    if (e.target.dataset.hasOwnProperty("stop") && timerID) {
        clearInterval(timerID);
        e.target.previousElementSibling.removeAttribute("disabled")        
    }    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
