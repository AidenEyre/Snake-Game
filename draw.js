let canvas = document.querySelector(".GameWindow");
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 2;
} else {
  canvas.width = 600;
  canvas.height = 600;
}
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
  snake2.changeDirection(direction);
});
