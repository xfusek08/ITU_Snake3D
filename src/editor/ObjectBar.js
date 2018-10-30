
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: ObjectBar.js
// Bar ofselectible objects in editor

var ObjectBar = function (parent) {
  this.Objects = [];

  this.ParentElement = parent;

  var element = null;

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

  this.unSelectObject = function() {
    this.Objects.forEach(element => element.Parent.removeClass("selected"));
    onSelectionEvent(null)
  }

  this.onObjectSelection = function (onSelectionfunc) {
    if (typeof onSelectionfunc !== "function")
      throw "ObjectBar.onObjectSelection() can take only functions";

    onSelectionEvent = onSelectionfunc;
  }

  this.deinit = function () {
    selectAll(".objectBarItemDiv").forEach(element => {
      element.remove();
    });
    selectAll(".delimiter").forEach(element => {
      element.remove();
    });
  }

  // internal event handlers
  var onSelectionEvent = function (obj) { }

}