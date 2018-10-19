
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: project.js
// Main entry point to aplication - game screen management

// stack of game screens, active (redrawed) screen is always the one on top
var screenStack = new function() {
  this.stack = [];
  this.topScreen = null;

  this.pushScreen = function(screen) {
    if (this.topScreen !== null)
      this.topScreen.hide();
    this.stack.push(screen);
    this.topScreen = screen;
    screen.init();
  }

  this.popScreen = function (screen) {
    if (this.stack.length > 0)
    {
      this.topScreen.deinit();
      this.stack.pop();
      this.topScreen = this.stack[this.stack.length - 1];
      if (this.topScreen !== null)
        this.topScreen.show();
    }
  }

  this.size = function () {
    return this.stack.length;
  }
};

function setup() {
  var canvas = createCanvas(100, 100, WEBGL).hide();
  noLoop();

  screenStack.pushScreen(new MainMenuScreen());
  screenStack.pushScreen(new EditorScreen(canvas,
    new WorldMap('Vlastní mapa 1', 30, 20) // [map 30 x 30]
  ));
}

function draw() {
  screenStack.topScreen.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  screenStack.topScreen.mouseWheenEvent(event);
}

function touchMoved() {
  screenStack.topScreen.touchMovedEvent();
}

function touchStarted() {
  screenStack.topScreen.touchStartedEvent();
}

function touchEnded() {
  screenStack.topScreen.touchEndedEvent();
}

function keyPressed() {
  screenStack.topScreen.keyPressedEvent();
}

function keyReleased() {
  screenStack.topScreen.keyReleasedEvent();
}
