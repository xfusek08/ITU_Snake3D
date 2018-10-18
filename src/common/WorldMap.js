
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: camera.js
// Object por one map

var WorldMap = function (
  name,
  width = DEFAULT_WORLD_SIZE,
  heigth = DEFAULT_WORLD_SIZE
) {
  this.Name = name;
  this.Width = width;
  this.Heigth = heigth;

  var mapCenterX = this.Width * TILE_SIZE / 2;

  this.PointLightPos  = createVector(mapCenterX, -300, 100)

  this.LightDirection = createVector(mapCenterX, 0, 0)
    .sub(createVector(mapCenterX, this.PointLightPos.y, 1000))
    .normalize();

  this.draw = function() {

    // lights
    pointLight(255, 255, 255, this.PointLightPos);
    directionalLight(200, 200, 200, this.LightDirection);
    ambientLight(255);

    stroke(100);

    // monolite floor
    ambientMaterial(40, 40, 80);
    specularMaterial(40, 40, 80);
    rect(0, 0, TILE_SIZE * this.Width, TILE_SIZE * this.Heigth);

    // lines
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
