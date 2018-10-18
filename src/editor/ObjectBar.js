
// object bar
var ObjectBar = function (parent) {
  this.Objects = [];

  var parentElement = parent;

  this.addObject = function (worldObject) {
    if (!(worldObject instanceof WorldObject))
      throw "ObjectBar.addObject() parameter has to be instance of worldObject";
    this.Objects.push(new ObjectBarItem(worldObject, parentElement));
  }

  this.pause = function() {
    array.forEach(obj => { obj.pause(); });
  }

  this.unPause = function() {
    array.forEach(obj => { obj.upPause(); });
  }
}