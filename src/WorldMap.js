
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: camera.js
// Object por one map

var WorldMap = function (
  name,
  width = DEFAULT_WORLD_WIDTH,
  heigth = DEFAULT_WORLD_HEIGHT
) {
  this.Name = name;
  this.Width = width;
  this.Heigth = heigth;

  this.draw = function() {
    stroke(100);
    fill(40, 40, 80);

    rect(0, 0, TILE_SIZE * this.Width, TILE_SIZE * this.Heigth);

    for (var x = 0; x < this.Width; x++) {
      line(x * TILE_SIZE, 0, 0,
        x * TILE_SIZE, TILE_SIZE * this.Heigth, 0);
    }

    for (var y = 0; y < this.Heigth; y++) {
      line(0, y * TILE_SIZE, 0,
        TILE_SIZE * this.Width, y * TILE_SIZE, 0);
    }
  }

}
