
var EditorHelpScreen = function () {

  var editorHelpScreenDiv = null;
  var exited = false;

  // public
  this.init = function () {
    // generate screen html and behavor
    editorHelpScreenDiv = select('#editorHelpScreenDiv');
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
      editorHelpScreenDiv.hide();
    });
  }

  this.show = function () {
    // code to restorre hiden screen
    // editorHelpScreenDiv.show();
    this.fadeIn();
  }

  this.mouseWheenEvent = function(event) { }
  this.touchMovedEvent = function (event) { }
  this.touchStartedEvent = function (event) { }

  this.touchEndedEvent = function (event) {
    this.exit();
  }

  this.keyPressedEvent = function () { }

  this.keyReleasedEvent = function () {
    if (!exited) {
      exited = true;
      this.exit();
    }
  }

  this.exit = function() {
    screenStack.popScreen();
  }

  this.fadeOut = function (callback) {
    var elem = document.getElementById('editorHelpScreenDiv');
    elem.style.transition = "opacity 0.5s linear 0s";
    elem.style.opacity = 0;
    if (typeof callback == 'function')
      setTimeout(() => { callback(); }, 500);
  }

  this.fadeIn = function (callback) {
    var elem = document.getElementById('editorHelpScreenDiv');
    elem.style.display = "block";

    setTimeout(() => {
      elem.style.transition = "opacity 0.5s linear 0s";
      elem.style.opacity = 1;
      if (typeof callback == 'function')
        setTimeout(() => { callback(); }, 500);
    }, 100);
  }

}
