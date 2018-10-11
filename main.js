
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: project.js
// Main entry point to aplication - game screen management

// stack of game screens, active (redrawed) screen is always the one on top
var screenStack = new function() {
  this.stack = [];

  this.pushScreen = function(screen) {
    var topScreen = this.topScreen();
    if (topScreen)
      topScreen.hide();
    this.stack.push(screen);
    screen.init();
  }

  this.popScreen = function (screen) {
    var topScreen = this.topScreen();
    if (topScreen)
    {
      topScreen.deinit();
      this.stack.pop();
      topScreen = this.topScreen();
      if (topScreen)
        topScreen.show();
    }
  }

  this.topScreen = function() {
    if (this.stack.length > 0)
      return this.stack[this.stack.length - 1];
    return false;
  }

  this.size = function () {
    return this.stack.length;
  }
};

function setup() {
  createCanvas(1240, 720).remove();
  screenStack.pushScreen(new MainMenuScreen(canvas));
}

function draw() {
  screenStack.topScreen().draw();
}
