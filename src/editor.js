
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: editor.js
// Screen with editor

var EditorScreen = function (canvas, worldMap) {

  if (!(worldMap instanceof WorldMap))
    throw "Editor have to take isntance of WorldMap object as parameter."

  var worldPam = worldMap;
  var canvas = canvas;
  var editorDivElement = null;
  var mapNameInputElement = null;
  var isPaused = false;

  var rotation = 0;

  // public
  this.init = function () {
    // init main div
    editorDivElement = select('#editorScreenDiv');
    editorDivElement.show();
    editorDivElement.style('background', 'transparent');

    // init canvas
    resizeCanvas(editorDivElement.size().width, editorDivElement.size().height);
    canvas.show();

    // define event on name changed
    mapNameInputElement = select('#worldMapName_input');
    mapNameInputElement.value(worldMap.Name);
    mapNameInputElement.input(this.nameChanged);

  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
    // disable all event reactions ...
  }

  this.draw = function () {
    if (isPaused)
      return;

    background("#26263A");
    stroke(255);
    noFill();
    rotateX(rotation)
    rotateY(rotation)
    box(50);

    rotation += 0.05;
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.editorDivElement.hide();
    canvas.hide();
    isPaused = true;
  }

  this.show = function () {
    // code to restorre hiden screen
    this.editorDivElement.show();
    canvas.hide();
    isPaused = false;
  }

  // process events
  this.nameChanged = function () {
    worldPam.Name = mapNameInputElement.value();
    console.log("name changed to: " + worldPam.Name);
  }
}
