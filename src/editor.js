
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

    // property and fields values
    isPaused = false;

    //camera
    worldCamera = new GeneralCamera(
      worldMap.Width * TILE_SIZE / 2, worldMap.Heigth * TILE_SIZE / 2, MAX_CAMERA_Z,
      worldMap.Width * TILE_SIZE / 2, worldMap.Heigth * TILE_SIZE / 2, 0
    );

    this.recalculateGlobals();
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

    // little box whe camera is pointing
    push();
    noStroke();
    translate(centerX, centerY, centerZ);
    fill(150, 250 ,255);
    box(10);
    pop();

    // translate(0,0,-1); // make sure that axes are shown above
    worldMap.draw();

    stroke(255, 0, 0); line(0, 0, 0, 1000, 0, 0); // RED   - x axis
    stroke(0, 255, 0); line(0, 0, 0, 0, 1000, 0); // GREEB - Y axis
    stroke(0, 0, 255); line(0, 0, 0, 0, 0, 1000); // BLUE  - z axis
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.editorDivElement.hide();
    canvas.hide();
    isPaused = true;
  }

  this.show = function () {
    // code to restorre hiden screen
    this.editorDivElement.show();
    canvas.hide();
    isPaused = false;
  }

  this.recalculateGlobals = function () {
    camPosX = (worldMap.Width * TILE_SIZE) / 2;
    camPosY = (worldMap.Heigth * TILE_SIZE) / 2;

    centerX = camPosX;
    centerY = camPosY;
    centerZ = 0;
  }

  // events
  this.nameChangedEvent = function () {
    if (isPaused)
      return;

    worldMap.Name = mapNameInputElement.value();
    console.log("name changed to: " + worldMap.Name);
  }

  this.windowResizedEvent = function () {
    if (isPaused)
      return;

    this.recalculateGlobals();
  }

  this.mouseWheenEvent = function (event) {
    if (isPaused)
      return;
    var zPos = worldCamera.Position.z;
    zPos += event.delta;

    if (zPos > MAX_CAMERA_Z)
      zPos = MAX_CAMERA_Z;
    else if (zPos < MIN_CAMERA_Z)
      zPos = MIN_CAMERA_Z;

    worldCamera.Position.z = zPos;
  }
}
