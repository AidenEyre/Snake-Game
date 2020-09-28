/*
  JS code to handle snake functions for Snake-Game
   
   Author: Aiden Eyre
   Date:   27 September 2020
   
   Filename: snake.js
*/

function Snake() {
  this.x = 150;
  this.y = 150;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.draw = function () {
    ctx.fillStyle = "#254A04";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  // Update snake location and check if there is a wall collision.
  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (
      this.x >= canvas.width ||
      this.y >= canvas.height ||
      this.x < 0 ||
      this.y < 0
    ) {
      this.updateHighScore(this.total);
      this.total = 0;
      this.tail = [];
      this.x = 150;
      this.y = 150;
    }
  };

  // Changes snake direction based off of eventlisteners.
  this.changeDirection = function (direction) {
    switch (direction) {
      case "Up":
        if (this.ySpeed <= 0) {
          this.xSpeed = 0;
          this.ySpeed = -scale * 1;
        }
        break;
      case "Right":
        if (this.xSpeed >= 0) {
          this.xSpeed = scale * 1;
          this.ySpeed = 0;
        }
        break;
      case "Left":
        if (this.xSpeed <= 0) {
          this.xSpeed = -scale * 1;
          this.ySpeed = 0;
        }
        break;
      case "Down":
        if (this.ySpeed >= 0) {
          this.xSpeed = 0;
          this.ySpeed = scale * 1;
        }
        break;
    }
  };

  // Checks if snake is eating fruit.
  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
    return false;
  };

  // Checks if snake is colliding with itself.
  this.checkCollision = function () {
    for (var i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        this.updateHighScore(this.total);
        this.total = 0;
        this.tail = [];
      }
    }
  };

  // Updates the highscore and saves it into local storage.
  this.updateHighScore = function (num) {
    if (num > window.localStorage.getItem("highScore")) {
      window.localStorage.setItem("highScore", this.total);
      document.querySelector(".highScore").innerText = this.total;
    }
  };
}
