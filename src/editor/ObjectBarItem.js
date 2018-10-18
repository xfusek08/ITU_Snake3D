
// one item in object bar
var ObjectBarItem = function (worldObject, parent) {
  if (!(worldObject instanceof WorldObject))
    throw "ObjectBarItem has to take instance of worldObject";

  this.P5SketchInstance = new p5(function (sketch) {
    var rotY = 0;

    sketch.setup = function () {
      var actCanvas = sketch.createCanvas(parent.size().width, 80, WEBGL);
      actCanvas.parent(parent);
      actCanvas.addClass('objCanvas');
    };

    sketch.draw = function () {
      sketch.background(0, 0, 0, 0);
      sketch.stroke(100);
      sketch.rotateX(-PI / 8);
      sketch.rotateY(rotY);

      worldObject.DrawShape(sketch);

      var l = 0.5 / round(sketch.frameRate());
      if (l < 1)
        rotY += l;
    };

    sketch.windowResized = function () {
      sketch.resizeCanvas(parent.size().width, 80);
    }
  });

  this.pause = function () {
    this.P5SketchInstance.sketch.noLoop();
  }

  this.unPause = function () {
    this.P5SketchInstance.sketch.loop();
  }

  createDiv(worldObject.Name).parent(parent);
}
