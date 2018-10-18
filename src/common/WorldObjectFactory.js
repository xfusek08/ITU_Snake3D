
var WorldObjectFactory = function () {

  this.createObject = function (type) {
    switch (type) {
      case OBJ_WALL: return this.createWallObject();
      case OBJ_START: return this.createStartObject();
    }

  }

  this.createWallObject = function () {
    return new WorldObject("Zeď", OBJ_WALL, function (sketch) {
      sketch.fill(255, 100, 255);
      sketch.stroke(100);
      sketch.box(40);
    });
  }

  this.createStartObject = function () {
    return new WorldObject("Startovní pozice", OBJ_START, function (sketch) {
      sketch.fill(255, 0, 0);
      sketch.stroke(100);
      sketch.rotateZ(PI / 30);
      sketch.rotateX(PI / 2);
      sketch.translate(0, 0, -2.5);
      sketch.ellipse(0, 0, 61);
      sketch.translate(0, 0, +5);
      sketch.ellipse(0, 0, 61);
    });
  }
}
