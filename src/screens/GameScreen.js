
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// File: MainMenuScreen.js
// Type of screen witch displays game and screen for game menu

var decision = 0;

var GameMenuScreen = function () {

  var GameMenuScreenDiv = null;
  var exited = false;

  // public
  this.init = function () {
    // generate screen html and behavor
    GameMenuScreenDiv = select('#gameMenuScreenDiv');

    var button = document.getElementById("con_game");
    button.addEventListener("click", clickCon, false);
    var button = document.getElementById("res_game");
    button.addEventListener("click", clickRes, false);
    var button = document.getElementById("men_game");
    button.addEventListener("click", clickMen, false);

    this.show();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
  }

  this.draw = function () {
    // real time reaction ...
  }

  this.hide = function () {
    this.fadeOut(function () {
      GameMenuScreenDiv.hide();
    });
  }

  this.show = function () {
    this.fadeIn();
  }

  this.mouseWheenEvent = function(event) {}
  this.touchMovedEvent = function (event) {}
  this.touchStartedEvent = function (event) {}
  this.touchEndedEvent = function (event) {}
  this.keyPressedEvent = function () {}
  this.keyReleasedEvent = function () {}

  this.fadeOut = function (callback) {
    var elem = document.getElementById('gameMenuScreenDiv');
    elem.style.transition = "opacity 0.5s linear 0s";
    elem.style.opacity = 0;
    if (typeof callback == 'function')
      setTimeout(() => { callback(); }, 500);
  }

  this.fadeIn = function (callback) {
    var elem = document.getElementById('gameMenuScreenDiv');
    elem.style.display = "block";

    setTimeout(() => {
      elem.style.transition = "opacity 0.5s linear 0s";
      elem.style.opacity = 1;
      if (typeof callback == 'function')
        setTimeout(() => { callback(); }, 200);
    }, 100);
  }

  function clickCon() {
    decision = 0;
    exit();
  }

  function clickRes() {
    decision = 1;
    exit();
  }

  function clickMen() {
    decision = 2;
    exit();
  }

  function exit() {
    if (!exited) {
      exited = true;
      screenStack.popScreen();
    }
  }

}

var GameScreen = function (canvas, worldMap) {

  this.gameScreenDiv = null;
  this.going = true;
  var exited = false;

  var worldMap = worldMap;
  var isPaused = true;
  var showThis = true;
  var canvas = canvas;

  var camera = null;

  // public
  this.init = function () {
    // generate screen html and behavor
    this.gameScreenDiv = select('#gameScreenDiv');
    this.gameScreenDiv.show();
    this.gameScreenDiv.style('background', 'transparent');
    this.going = true;

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
      this.date.setTime(currentDate + 750);
    }

    worldMap.draw();

      
    if(decision == 1)
    {
      decision = 0;
      this.going = true;
      this.init();
    }
    else if(decision >= 2)
    {
      decision = 0;
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
      decision = 0;
      screenStack.pushScreen(new GameMenuScreen());
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
