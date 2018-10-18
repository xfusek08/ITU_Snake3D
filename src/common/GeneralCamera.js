
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: camera.js
// Object camera

var GeneralCamera = function(
  posX, posY, posZ,
  centerX, centerY, centerZ,
  upX = 0, upY = 1, upZ = 0
) {

  this.Position = createVector(posX, posY, posZ);
  this.Target = createVector(centerX, centerY, centerZ);
  this.Up = createVector(upX, upY, upZ);

  // public methods
  this.use = function() {
    camera(
      this.Position.x, this.Position.y, this.Position.z,
      this.Target.x, this.Target.y, this.Target.z,
      this.Up.x, this.Up.y, this.Up.z
    );
  }

  this.move = function(dx, dy, dz) {
    this.Position.add(createVector(dx, dy, dz));
    this.Target.add(createVector(dx, dy, dz));
  }

  this.move = function (vector) {
    this.Position.add(vector);
    this.Target.add(vector);
  }
}
