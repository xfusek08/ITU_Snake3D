
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// File: MainMenuScreen.js
// Type of screen witch displays main menu

var GameScreen = function (canvas) {

  this.gameScreenDiv = null;

  // public
  this.init = function () {
    // generate screen html and behavor
    this.gameScreenDiv = select('#gameScreenDiv');
    this.gameScreenDiv.show();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.gameScreenDiv.hide();
  }

  this.show = function () {
    // code to restorre hiden screen
    this.gameScreenDiv.show();
  }

  // unused functions
  this.draw = function () { }
  this.mouseWheenEvent = function(event) {}
  this.touchMovedEvent = function () { }
  this.touchStartedEvent = function () { }
  this.touchEndedEvent = function () { }
  this.keyPressedEvent = function () { }
  this.keyReleasedEvent = function () { }
}
