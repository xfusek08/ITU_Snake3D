
// object bar
var ObjectBar = function (parent) {
  this.Objects = [];

  this.ParentElement = parent;

  this.addObject = function (worldObject) {
    if (!(worldObject instanceof WorldObject))
      throw "ObjectBar.addObject() parameter has to be instance of worldObject";

    if (this.Objects.length > 0)
      createDiv().parent(this.ParentElement).class("delimiter");

    var objDiv = createDiv();
    objDiv.class("objectBarItemDiv");
    objDiv.parent(this.ParentElement);
    this.Objects.push(new ObjectBarItem(worldObject, objDiv));
    this.bindSelectionEvent(objDiv, worldObject);
  }

  this.pause = function () {
    this.Objects.forEach(obj => { obj.pause(); });
  }

  this.unPause = function () {
    this.Objects.forEach(obj => { obj.unPause(); });
  }

  this.bindSelectionEvent = function (objDiv, worldObj) {
    var objs = this.Objects;
    objDiv.mouseClicked(function () {
      var clickedOnSelected = objDiv.class().includes("selected");
      var obj = null;
      objs.forEach(element => element.Parent.removeClass("selected"));
      if (!clickedOnSelected) {
        objDiv.addClass("selected");
        obj = worldObj;
      }
      onSelectionEvent(obj);
    });
  }

  this.onObjectSelection = function (onSelectionfunc) {
    if (typeof onSelectionfunc !== "function")
      throw "ObjectBar.onObjectSelection() can take only functions";

    onSelectionEvent = onSelectionfunc;
  };

  // internal event handlers
  var onSelectionEvent = function () { };

}