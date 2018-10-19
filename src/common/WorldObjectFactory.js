
var WorldObjectFactory = function () {

  this.createObject = function (type) {
    switch (type) {
      case OBJ_WALL: return this.createWallObject();
      case OBJ_START: return this.createStartObject();
      case OBJ_DELETE: return this.createDeleteObject();
    }

  }

  this.createWallObject = function () {
    return new WorldObject("Zeď", OBJ_WALL, function (sketch) {
      if (sketch == null) {
        ambientMaterial(255, 100, 255);
        specularMaterial(255, 100, 255);
        stroke(100);
        box(TILE_SIZE);
      } else {
        sketch.fill(255, 100, 255);
        sketch.stroke(100);
        sketch.box(40);
      }
    });
  }

  this.createStartObject = function () {
    return new WorldObject("Startovní pozice", OBJ_START, function (sketch) {
      if (sketch == null) { // global mode
        ambientMaterial(255, 0, 0);
        specularMaterial(255, 0, 0);
        rotateZ(PI / 30);
        rotateX(PI / 2);
        noStroke();
        cylinder(TILE_SIZE / 2, 2.5);
        stroke(100);
        rotateX(-PI / 2);
        translate(0, 0, -1.25);
        ellipse(0, 0, TILE_SIZE);
        translate(0, 0, +2.5);
        ellipse(0, 0, TILE_SIZE);
      } else { // objbar mode
        sketch.fill(255, 0, 0);
        sketch.stroke(100);
        sketch.rotateZ(PI / 30);
        sketch.rotateX(PI / 2);
        sketch.translate(0, 0, -2.5);
        sketch.ellipse(0, 0, 61);
        sketch.translate(0, 0, +5);
        sketch.ellipse(0, 0, 61);
      }
    });
  }


  this.createDeleteObject = function () {
    return new WorldObject("Smazat (jako že guma)", OBJ_DELETE, function (sketch) {
      if (sketch == null) { // global mode
        ambientMaterial(244, 197, 66);
        specularMaterial(244, 197, 66);
        stroke(100);
        rotateY(PI / 2 + PI / 10);
        box(30, 15);
        translate(20, 0, 0)
        ambientMaterial(244, 0, 66);
        specularMaterial(244, 0, 66);
        box(10, 15);
      } else { // objbar mode
        sketch.fill(244, 197, 66);
        sketch.stroke(100);
        sketch.rotateZ(PI / 2 + PI / 10);
        sketch.box(30, 20);
        sketch.translate(20, 0, 0)
        sketch.fill(244, 0, 66);
        sketch.box(10, 20);
      }
    });
  }
}
