
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// File: GameMenuScreen.js
// Type of screen witch displays game and screen for game menu

var GameMenuScreen = function (decision) {

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
    decision.val = 0;
    exit();
  }

  function clickRes() {
    decision.val = 1;
    exit();
  }

  function clickMen() {
    decision.val = 2;
    exit();
  }

  function exit() {
    if (!exited) {
      exited = true;
      screenStack.popScreen();
    }
  }
}