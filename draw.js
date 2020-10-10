/*
  JS code to setup and run Snake-Game
   
   Author: Aiden Eyre
   Date:   27 September 2020
   
   Filename: draw.js
*/
let canvas = document.querySelector(".GameWindow");
let useMobile = false;

// If the user is on mobile adjust canvas size accordingly.
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.getElementById("switchDevice").style.display = "none";
  document.getElementById("buttons").style.display = "block";
  canvas.width = window.innerWidth - (window.innerWidth % 30);
  canvas.height = (window.innerHeight - (window.innerHeight % 30)) / 2;
}
// This else if is so that people can see what mobile looks like on desktop.
else if (useMobile === true) {
  document.body.style.width = "25%";
  document.getElementById("buttons").style.display = "block";
  var width = document.getElementById("body").offsetWidth;
  var height = document.getElementById("body").offsetHeight;
  canvas.width = width - (width % 30);
  canvas.height = (height - (height % 30)) / 2;
} else {
  canvas.width = 600;
  canvas.height = 600;
}
document.querySelector(".GameWindow").style.margin = "2% auto 0 auto";
const ctx = canvas.getContext("2d");
const scale = 30;
const rows = canvas.height / (scale + 5);
const columns = canvas.width / (scale + 5);

// Set up snake and load highscore before starting.
var snake;
document.querySelector(".highScore").innerText = window.localStorage.getItem(
  "highScore"
);

// Run each game function every 140 milliseconds.
(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    fruit.draw();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();
    document.querySelector(".score").innerText = snake.total;
  }, 150);
})();

// Listends for keyboard arrow press.
window.addEventListener("keydown", (evt) => {
  const direction = evt.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

// Listens for button clicks on mobile.
var btnUp = document
  .getElementById("buttonUp")
  .addEventListener("click", (evt) => {
    snake.changeDirection("Up");
  });
var btnRight = document
  .getElementById("buttonRight")
  .addEventListener("click", (evt) => {
    snake.changeDirection("Right");
  });
var btnDown = document
  .getElementById("buttonDown")
  .addEventListener("click", (evt) => {
    snake.changeDirection("Down");
  });
var btnLeft = document
  .getElementById("buttonLeft")
  .addEventListener("click", (evt) => {
    snake.changeDirection("Left");
  });

// Try on mobile for desktop
var btnUp = document
  .getElementById("switchDevice")
  .addEventListener("click", (evt) => {
    if (useMobile === false) {
      document.body.style.width = "25%";
      document.getElementById("buttons").style.display = "block";
      var width = document.getElementById("body").offsetWidth;
      var height = document.getElementById("body").offsetHeight;
      canvas.width = width - (width % 30);
      canvas.height = (height - (height % 30)) / 2;
      useMobile = true;
    } else {
      document.body.style.width = "99%";
      document.getElementById("buttons").style.display = "none";
      canvas.width = 600;
      canvas.height = 600;
      useMobile = false;
    }
  });
