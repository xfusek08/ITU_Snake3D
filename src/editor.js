
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: editor.js
// Screen with editor

var EditorScreen = function(worldMap) {

  if (!(worldMap instanceof WorldMap))
    throw "Editor have to take isntance of WorldMap object as parameter."

  this.editorDiv = null;
  this.worldPam = worldMap;

  // public
  this.init = function () {
    // generate screen html and behavor
    this.editorDiv = select('#editorScreenDiv');
    // this.editorDiv = document.getElementById("editorScreenDiv");
    this.editorDiv.show();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
    // disable all event reactions ...
  }

  this.draw = function () {
    // real time reaction ...
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.editorDiv.hide();
  }

  this.show = function () {
    // code to restorre hiden screen
    this.editorDiv.show();
  }
}
