
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// File: GameScreen.js
// Type of screen witch displays game

var GameScreen = function (canvas, worldMap) {

  this.gameScreenDiv = null;
  this.going = true;
  var exited = false;

  var worldMap = worldMap;
  var isPaused = true;
  var showThis = true;
  var canvas = canvas;

  var decision = {val: 0};

  var camera = null;

  // public
  this.init = function () {
    // generate screen html and behavor
    this.gameScreenDiv = select('#gameScreenDiv');
    this.gameScreenDiv.show();
    this.gameScreenDiv.style('background', 'transparent');
    this.going = true;
    this.lost = false;

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
    isPaused = true;
  }

  this.show = function () {
    // code to restorre hiden screen
    if(showThis)
    {
      loop();
      this.gameScreenDiv.show();
      isPaused = false;
    }
  }

  this.draw = function () {
    if (isPaused)
      return;

    background("#26263A");

    camera.use();

    var currentDate = (new Date()).getTime();
    if(currentDate >= this.date.getTime() && this.going) {
      this.going = worldMap.moveSnake();
      this.lost = true;
      this.date.setTime(currentDate + 550);
    }

    worldMap.draw();

    if(!this.going && this.lost)
    {
      showThis = false;
      this.hide();
      decision.val = 0;
      screenStack.pushScreen(new GameMenuScreen(decision));
      showThis = true;
      this.lost = false;
    }
      
    if(decision.val == 1)
    {
      decision.val = 0;
      this.going = true;
      this.init();
    }
    else if(decision.val >= 2)
    {
      decision.val = 0;
      this.going = true;
      exit();
    }
  }

  this.keyPressedEvent = function () {
    if(keyCode == UP_ARROW)
      worldMap.changeDirection(0);
    else if(keyCode == RIGHT_ARROW)
      worldMap.changeDirection(1);
    else if(keyCode == DOWN_ARROW)
      worldMap.changeDirection(2);
    else if(keyCode == LEFT_ARROW)
      worldMap.changeDirection(3);
    else if(keyCode == ESCAPE)
    {
      showThis = false;
      this.hide();
      decision.val = 0;
      screenStack.pushScreen(new GameMenuScreen(decision));
      showThis = true;
    }
   }
  // unused functions
  this.mouseWheenEvent = function(event) {}
  this.touchMovedEvent = function () { }
  this.touchStartedEvent = function () { }
  this.touchEndedEvent = function () { }
  this.keyReleasedEvent = function () { }

  function exit() {
    if (!exited) {
      exited = true;
      screenStack.popScreen();
    }
  }
}
