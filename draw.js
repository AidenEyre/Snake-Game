let canvas = document.querySelector(".GameWindow");
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  canvas.width = window.innerWidth - (window.innerWidth%30);
  canvas.height = (window.innerHeight - (window.innerHeight%30)) / 2;
} else {
  canvas.width = 600;
  canvas.height = 600;
}
document.querySelector(".GameWindow").style.margin = "0px auto 0px auto";
const ctx = canvas.getContext("2d");
const scale = 30;
const rows = canvas.height / (scale + 5);
const columns = canvas.width / (scale + 5);

var snake;

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
    // document.querySelector(".score").innerText = snake.total;
  }, 100);
})();

window.addEventListener("keydown", (evt) => {
  const direction = evt.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

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
