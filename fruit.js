/*
  JS code to handle fruit functions for Snake-Game
   
   Author: Aiden Eyre
   Date:   27 September 2020
   
   Filename: fruit.js
*/
function Fruit() {
  this.x;
  this.y;

  // Picks random location for fruit.
  this.pickLocation = function () {
    this.x = (Math.floor(Math.random() * (rows - 1)) + 1) * scale;
    this.y = (Math.floor(Math.random() * (columns - 1)) + 1) * scale;
  };

  // Draws fruit into game.
  this.draw = function (x, y) {
    ctx.fillStyle = "#ff0800";
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}
