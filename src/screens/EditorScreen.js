
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: editor.js
// Screen with editor

var EditorScreen = function (canvas, worldMap) {

  if (!(worldMap instanceof WorldMap))
    throw "Editor have to take isntance of WorldMap object as parameter."

  var worldMap = worldMap;
  var canvas = canvas;
  var isPaused = true;

  var editorDivElement = null;
  var mapNameInputElement = null;
  var fpsCounterElement = null;
  var objectBar = null;

  // camera movement wariables
  var worldCamera = null;
  var mousePrePosition = null;
  var isCamMoving = false;
  var maxZPos = 0;

  // dropping object variables
  var mouseOnCanvasPos = null;;
  var isMouseOnCanvas = true;
  var selectedObject = null;
  var isDropping = false;
  var lastDroppedCoords = null;

  // intilatization of screen
  this.init = function () {
    console.log("editor init");

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
    objectBar.addObject(objFactory.createObject(OBJ_DELETE));
    objectBar.onObjectSelection(this.ObjectSelectedEvent);

    objectBar.ParentElement.mouseOver(this.mouseEnterGUIElementEvent);
    objectBar.ParentElement.mouseOut(this.mouseLeaveGUIElementEvent);

    // top bar events
    var topBarElement = select("#editor_topbar");
    topBarElement.mouseOver(this.mouseEnterGUIElementEvent);
    topBarElement.mouseOut(this.mouseLeaveGUIElementEvent);
    select("#saveTopButton").mouseClicked(this.saveClickEvent);
    select("#helpTopButton").mouseClicked(this.helpClickEvent);
    select("#exitTopButton").mouseClicked(this.exitClickEvent);

    // top bar Input
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
      if (isMouseOnCanvas) {
        mouseOnCanvasPos = mouseToXYPlane(canvas, worldCamera);
        // fpsCounterElement.html(mouseOnCanvasPos.x + " " + mouseOnCanvasPos.y );
        cursor(HAND);
      }

      push();
      noStroke();
      translate(mouseOnCanvasPos);
      translate(0,0, TILE_SIZE * 4);
      selectedObject.DrawShape(null);
      pop();

      push();
      stroke(255, 0, 0);
      noFill();
      line(
        mouseOnCanvasPos.x, mouseOnCanvasPos.y, TILE_SIZE * 4,
        mouseOnCanvasPos.x, mouseOnCanvasPos.y, 0
      );
      ellipse(mouseOnCanvasPos.x, mouseOnCanvasPos.y, TILE_SIZE * 0.8, TILE_SIZE * 0.8);
      pop();

    }

    // draw axes
    // stroke(255, 0, 0); line(0, 0, 0, 1000, 0, 0); // RED   - x axis
    // stroke(0, 255, 0); line(0, 0, 0, 0, 1000, 0); // GREEB - Y axis
    // stroke(0, 0, 255); line(0, 0, 0, 0, 0, 1000); // BLUE  - z axis
  }

  this.hide = function () {
    // code to hide and pouse act screen
    noLoop();
    objectBar.pause();
    isPaused = true;
  }

  this.show = function () {
    // code to restore hiden screen
    loop();
    objectBar.unPause();
    isPaused = false;
  }

  this.deinit = function () {
    this.hide();
    canvas.hide();
    objectBar.deinit();
    editorDivElement.hide();
  }

  // DOM events
  this.nameChangedEvent = function () {
    worldMap.Name = mapNameInputElement.value();
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

  this.saveClickEvent = function() {
    console.log("saveClickEvent");
  }

  this.helpClickEvent = function () {
    console.log("helpClickEvent");
    screenStack.pushScreen(new EditorHelpScreen());
  }

  this.exitClickEvent = function () {
    console.log("exitClickEvent");
    var message = new MessageBox("Opravdu si přejete vrátit se do hlavního menu a stratit uložený postup?", MS_BUTTONS_YES_NO);
    message.show(function () {
      screenStack.popScreen();
    });
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

    isDropping = selectedObject !== null &&
      isMouseOnCanvas &&
      mouseButton == LEFT
  }

  this.touchEndedEvent = function () {
    if (mouseButton == RIGHT) {
      isCamMoving = false;
      cursor(ARROW);
    } else if (mouseButton == LEFT) {
      if (isDropping) {
        this.dropObjOnWorld();
        isDropping = false;
      }
    }
  }

  this.touchMovedEvent = function() {
    if (isCamMoving) {
      var newPos = createVector(mouseX, mouseY);
      worldCamera.move(
        newPos.copy()
          .sub(mousePrePosition)
          .mult(-worldCamera.Position.z / 600)
      );
      mousePrePosition = newPos;
    } else if (isDropping) {
      this.dropObjOnWorld();
    }
  }

  this.keyPressedEvent = function () { }

  this.keyReleasedEvent = function () { }

  // Dropping mechanics
  this.getMouseTileCoords = function() {
    var mouseCoords = mouseToXYPlane(canvas, worldCamera);
    var x = round((mouseCoords.x + TILE_SIZE / 2) / TILE_SIZE);
    var y = round((mouseCoords.y + TILE_SIZE / 2) / TILE_SIZE);
    // fpsCounterElement.html("x: " + x + " y: " + y);
    return createVector(x, y);
  }

  this.dropObjOnWorld = function () {
    var coords = this.getMouseTileCoords();
    worldMap.placeObject(coords.x, coords.y, selectedObject);
  }
}
