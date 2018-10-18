
var WorldObject = function(name, type, drawShape) {
  if (typeof name !== "string" || isNaN(type) || typeof drawShape !== "function")
    throw "ObjectBarItem has to take string and function(sketch) as parameter.";

  this.Name = name;
  this.Type = type;
  this.DrawShape = drawShape;
}
