
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: editor.js
// Screen with editor

var EditorScreen = function (canvas, worldMap) {

  if (!(worldMap instanceof WorldMap))
    throw "Editor have to take isntance of WorldMap object as parameter."

  var worldMap = worldMap;
  var canvas = canvas;

  var editorDivElement = null;
  var mapNameInputElement = null;
  var fpsCounterElement = null;

  var isPaused = true;
  var worldCamera = null;
  var mousePrePosition = null;
  var isCamMoving = false;

  this.init = function () {
    // Main Screen
    editorDivElement = select('#editorScreenDiv');
    editorDivElement.show();
    editorDivElement.style('background', 'transparent');

    // Canva
    resizeCanvas(editorDivElement.size().width, editorDivElement.size().height);
    canvas.show();

    // Input
    mapNameInputElement = select('#worldMapName_input');
    mapNameInputElement.value(worldMap.Name);
    mapNameInputElement.input(this.nameChangedEvent); // bind event on value change

    // FPS Counter
    fpsCounterElement = select('#fpscounter');

    //camera
    worldCamera = new GeneralCamera(
      worldMap.Width * TILE_SIZE / 2, worldMap.Heigth * TILE_SIZE / 2, MAX_CAMERA_Z,
      worldMap.Width * TILE_SIZE / 2, worldMap.Heigth * TILE_SIZE / 8, 0
    );
    mousePrePosition = createVector(worldCamera.Position.x, worldCamera.Position.y, 0);

    // property and fields values
    isPaused = false;
  }

  this.deinit = function () {
    this.hide();
  }

  this.draw = function () {
    if (isPaused)
      return;

    background("#26263A");

    // display FPS on screen
    fpsCounterElement.html(frameRate());

    // use camera
    worldCamera.use();

    // translate(0,0,-1); // make sure that axes are shown above
    worldMap.draw();

    // // little box whe camera is pointing
    // push();
    // noStroke();
    // translate(worldCamera.Target);
    // fill(150, 250 ,255);
    // box(10);
    // pop();

    stroke(255, 0, 0); line(0, 0, 0, 1000, 0, 0); // RED   - x axis
    stroke(0, 255, 0); line(0, 0, 0, 0, 1000, 0); // GREEB - Y axis
    stroke(0, 0, 255); line(0, 0, 0, 0, 0, 1000); // BLUE  - z axis

    // var t = this.mouseToXYPlane();
    // stroke(255, 0, 255); line(
    //   mousePrePosition.x, mousePrePosition.y, mousePrePosition.z + 10,
    //   t.x, t.y, 10);
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.editorDivElement.hide();
    canvas.hide();
    isPaused = true;
  }

  this.show = function () {
    // code to restore hiden screen
    this.editorDivElement.show();
    canvas.hide();
    isPaused = false;
  }

  // events
  this.nameChangedEvent = function () {
    worldMap.Name = mapNameInputElement.value();
    console.log("name changed to: " + worldMap.Name);
  }

  this.mouseWheenEvent = function (event) {
    var zPos = worldCamera.Position.z;
    zPos += event.delta;

    if (zPos > MAX_CAMERA_Z)
      zPos = MAX_CAMERA_Z;
    else if (zPos < MIN_CAMERA_Z)
      zPos = MIN_CAMERA_Z;

    worldCamera.Position.z = zPos;
  }

  this.touchStartedEvent = function () {
    isCamMoving = true;
    mousePrePosition = createVector(mouseX, mouseY);
    // mousePrePosition = this.mouseToXYPlane();
    cursor(MOVE);
  }

  this.touchEndedEvent = function () {
    isCamMoving = false;
    cursor(ARROW);
  }

  this.touchMovedEvent = function() {
    if (!isCamMoving) return;
    // var newPos = this.mouseToXYPlane();
    // console.log(newPos);
    // console.log(mousePrePosition);
    // console.log(mousePrePosition.copy().sub(newPos));
    // worldCamera.move(mousePrePosition.copy().sub(newPos));

    var newPos = createVector(mouseX, mouseY);
    worldCamera.move(
      newPos.copy()
        .sub(mousePrePosition)
        .mult(-worldCamera.Position.z / 600)
    );

    mousePrePosition = newPos;
  }

  this.mouseToXYPlane = function() {
    // x(t) = worldCamera.x + delta.x * t
    // y(t) = worldCamera.y + delta.y * t
    // z(t) = worldCamera.z + delta.z * t
    // -----------------------------------
    // 0 = worldCamera.z + delta.z * t
    // t = worldCamera.z / -delta.z
    //

    var mouseWorld = projectCanvasToWorld(canvas, createVector(mouseX, mouseY));
    var delta = mouseWorld.sub(worldCamera.Position);

    return worldCamera.Position.copy()
      .add(delta.mult(worldCamera.Position.z / -delta.z));
  }
}
