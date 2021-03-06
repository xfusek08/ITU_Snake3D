
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// File: MainMenuScreen.js
// Type of screen witch displays main menu

var GameScreen = function (canvas, worldMap) {

  this.gameScreenDiv = null;

  var worldMap = worldMap;
  var canvas = canvas;
  var isPaused = true;

  var date = null;

  var camera = null;

  // public
  this.init = function () {
    // generate screen html and behavor
    this.gameScreenDiv = select('#gameScreenDiv');
    this.gameScreenDiv.show();
    this.gameScreenDiv.style('background', 'transparent');

    worldMap.prepareStart();
    this.date = new Date();

    resizeCanvas(this.gameScreenDiv.size().width, this.gameScreenDiv.size().height);
    canvas.show();

    var maxZPos = (MAX_CAMERA_Z * max(worldMap.Height, worldMap.Width)) / DEFAULT_WORLD_SIZE;
    camera = new GeneralCamera(
      worldMap.Width * TILE_SIZE / 2, worldMap.Height * TILE_SIZE / 2, maxZPos,
      worldMap.Width * TILE_SIZE / 2, worldMap.Height * TILE_SIZE / 2, 0
    );
    this.show();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
  }

  this.hide = function () {
    // code to hide and pouse act screen
    noLoop();
    this.gameScreenDiv.hide();
  }

  this.show = function () {
    // code to restorre hiden screen
    loop();
    this.gameScreenDiv.show();
    isPaused = false;
  }

  this.draw = function () {
    if (isPaused)
      return;

    background("#26263A");

    camera.use();

    var currentDate = (new Date()).getTime();
    if(currentDate >= this.date.getTime()) {
      worldMap.moveSnake();
      this.date.setTime(currentDate + 1000);
    }

    worldMap.draw();
  }

  this.keyPressedEvent = function () {
    if(keyCode == RIGHT_ARROW)
      worldMap.changeDirection(1);
    if(keyCode == LEFT_ARROW)
      worldMap.changeDirection(-1);
   }

  // unused functions
  this.mouseWheenEvent = function(event) {}
  this.touchMovedEvent = function () { }
  this.touchStartedEvent = function () { }
  this.touchEndedEvent = function () { }
  this.keyReleasedEvent = function () { }
}
