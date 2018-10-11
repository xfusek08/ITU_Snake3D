
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: MainMenuScreen.js
// Type of screen witch displays main menu

var MainMenuScreen = function() {

  this.mainMenuDiv = null;

  // public
  this.init = function() {
    // generate screen html and behavor
    this.mainMenuDiv = select('#mainMenuScreenDiv');
    this.mainMenuDiv.show();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
    // disable all event reactions ...
  }

  this.draw = function() {
    // real time reaction ...
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.mainMenuDiv.hide();
  }

  this.show = function () {
    // code to restorre hiden screen
    this.mainMenuDiv.show();
  }
}
