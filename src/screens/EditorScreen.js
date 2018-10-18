
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
  var objectBar = null;

  var worldCamera = null;
  var mouseOnCanvasPos = null;;
  var isMouseOnCanvas = true;
  var mousePrePosition = null;
  var isCamMoving = false;
  var maxZPos = 0;
  var isPaused = true;

  var selectedObject = null;

  // intilatization of screen
  this.init = function () {
    // Main Screen
    editorDivElement = select('#editorScreenDiv');
    editorDivElement.show();
    editorDivElement.style('background', 'transparent');

    resizeCanvas(editorDivElement.size().width, editorDivElement.size().height);
    canvas.show();

    // initilize object bar with needed items
    objectBar = new ObjectBar(select('#editor_objectbar'));
    var objFactory = new WorldObjectFactory();
    objectBar.addObject(objFactory.createObject(OBJ_WALL));
    objectBar.addObject(objFactory.createObject(OBJ_START));
    objectBar.onObjectSelection(this.ObjectSelectedEvent);

    objectBar.ParentElement.mouseOver(this.mouseEnterGUIElementEvent);
    objectBar.ParentElement.mouseOut(this.mouseLeaveGUIElementEvent);
    var topBarElement = select("#editor_topbar");
    topBarElement.mouseOver(this.mouseEnterGUIElementEvent);
    topBarElement.mouseOut(this.mouseLeaveGUIElementEvent);

    // Input
    mapNameInputElement = select('#worldMapName_input');
    mapNameInputElement.value(worldMap.Name);
    mapNameInputElement.input(this.nameChangedEvent); // bind event on value change

    // FPS Counter
    fpsCounterElement = select('#fpscounter');

    // diable context menu and selection
    document.oncontextmenu = function () { return false; };
    document.onselectstart = function () { return false; };

    // rendering sections

    // Camera
    // Calculate camera maximal z position relative to actual size of world
    // based on proportions of defauld values of world size and max Z position.
    maxZPos = (MAX_CAMERA_Z * max(worldMap.Heigth, worldMap.Width)) / DEFAULT_WORLD_SIZE;
    worldCamera = new GeneralCamera(
      worldMap.Width * TILE_SIZE / 2, worldMap.Heigth * TILE_SIZE / 2, maxZPos,
      worldMap.Width * TILE_SIZE / 2, worldMap.Heigth * TILE_SIZE / 2, 0
    );
    mousePrePosition = createVector(worldCamera.Position.x, worldCamera.Position.y, 0);
    mouseOnCanvasPos = mousePrePosition;

    this.show();
  }

  this.draw = function () {
    if (isPaused)
      return;

    background("#26263A");

    // display FPS on screen
    fpsCounterElement.html(round(frameRate()));

    // use camera
    worldCamera.use();

    // draw world
    worldMap.draw();


    // draw selected element hovering over user cursor
    if (selectedObject !== null) {

      if (isMouseOnCanvas)
        mouseOnCanvasPos = mouseToXYPlane(canvas, worldCamera);

      push();
      noStroke();
      translate(mouseOnCanvasPos);
      translate(0,0, 30);
      ambientMaterial(150, 250, 255);
      specularMaterial(150, 250, 255);
      sphere(10);
      pop();

      push();
      stroke(255, 0, 0);
      noFill();
      line(
        mouseOnCanvasPos.x, mouseOnCanvasPos.y, 30,
        mouseOnCanvasPos.x, mouseOnCanvasPos.y, mouseOnCanvasPos.z
      );
      ellipse(mouseOnCanvasPos.x, mouseOnCanvasPos.y, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
      pop();

    }

    // draw axes
    stroke(255, 0, 0); line(0, 0, 0, 1000, 0, 0); // RED   - x axis
    stroke(0, 255, 0); line(0, 0, 0, 0, 1000, 0); // GREEB - Y axis
    stroke(0, 0, 255); line(0, 0, 0, 0, 0, 1000); // BLUE  - z axis
  }

  this.hide = function () {
    // code to hide and pouse act screen
    editorDivElement.hide();
    noLoop();
    objectBar.pause();
    isPaused = true;
  }

  this.show = function () {
    // code to restore hiden screen
    editorDivElement.show();
    canvas.show();
    loop();
    objectBar.unPause();
    isPaused = false;
  }

  this.deinit = function () {
    this.hide();
  }

  // DOM events
  this.nameChangedEvent = function () {
    worldMap.Name = mapNameInputElement.value();
    console.log("name changed to: " + worldMap.Name);
  }

  this.ObjectSelectedEvent = function (selectedWorldObj) {
    selectedObject = selectedWorldObj;
    mouseOnCanvasPos = mouseToXYPlane(canvas, worldCamera);
    if (selectedObject instanceof WorldObject) {
      console.log("selected object: " + selectedWorldObj.Name);
    } else if (selectedObject == null) {
      console.log("object deselected.");
      selectedObject = null;
    }
  }

  this.mouseEnterGUIElementEvent = function(){
    isMouseOnCanvas = false;
  }

  this.mouseLeaveGUIElementEvent = function () {
    isMouseOnCanvas = true;
  }

  // movement Events

  this.mouseWheenEvent = function (event) {
    var zPos = worldCamera.Position.z;
    zPos += event.delta;

    if (zPos > maxZPos)
      zPos = maxZPos;
    else if (zPos < MIN_CAMERA_Z)
      zPos = MIN_CAMERA_Z;

    worldCamera.Position.z = zPos;
    worldCamera.Target.y = worldCamera.Position.y - (maxZPos - zPos) / (2 * maxZPos / MAX_CAMERA_Z);
  }

  this.touchStartedEvent = function () {
    if (mouseButton == RIGHT) {
      isCamMoving = true;
      mousePrePosition = createVector(mouseX, mouseY);
      cursor(HAND);
    }
  }

  this.touchEndedEvent = function () {
    if (mouseButton == RIGHT) {
      isCamMoving = false;
      cursor(ARROW);
    }
  }

  this.touchMovedEvent = function() {
    if (!isCamMoving) return;

    var newPos = createVector(mouseX, mouseY);
    worldCamera.move(
      newPos.copy()
        .sub(mousePrePosition)
        .mult(-worldCamera.Position.z / 600)
    );

    mousePrePosition = newPos;
  }
}
