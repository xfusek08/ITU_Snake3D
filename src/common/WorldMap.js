
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: camera.js
// Object por one map

var WorldMap = function (
  name,
  width = DEFAULT_WORLD_SIZE,
  height = DEFAULT_WORLD_SIZE
) {
  
  this.noCollision = true;

  this.Name = name;
  this.Width = width;
  this.Height = height;
  this.WallPlacement = {};
  this.SnakePlacement = [];
  this.SnakeHeadPos = null;
  this.SnakeDirect = 0;
  this.StartPosition = null;
  this.foodPosition = null;
  

  var startObject = (new WorldObjectFactory()).createStartObject();
  var foodObject = (new WorldObjectFactory()).createAppleObject();

  // light positions
  var mapCenterX = this.Width * TILE_SIZE / 2;
  this.PointLightPos  = createVector(mapCenterX, -300, 100)
  this.LightDirection = createVector(mapCenterX, 0, 0)
    .sub(createVector(mapCenterX, this.PointLightPos.y, 1000))
    .normalize();

  this.draw = function() {
    // lights
    pointLight(255, 255, 255, this.PointLightPos);
    directionalLight(200, 200, 200, this.LightDirection);
    ambientLight(255);

    push();
    stroke(100);

    // monolite floor
    ambientMaterial(40, 40, 80);
    specularMaterial(40, 40, 80);
    rect(0, 0, TILE_SIZE * this.Width, TILE_SIZE * this.Height);

    // lines
    for (var x = 0; x < this.Width; x++) {
      line(x * TILE_SIZE, 0, 0,
        x * TILE_SIZE, TILE_SIZE * this.Height, 0);
    }

    for (var y = 0; y < this.Height; y++) {
      line(0, y * TILE_SIZE, 0,
        TILE_SIZE * this.Width, y * TILE_SIZE, 0);
    }

    pop();

    if (this.StartPosition !== null) {
      push();
      translate(
        this.StartPosition.X * TILE_SIZE - TILE_SIZE / 2,
        this.StartPosition.Y * TILE_SIZE - TILE_SIZE / 2,
        0
      );
      startObject.DrawShape(null);
      pop();
    }

    if (this.foodPosition !== null) {
      push();
      translate(
        this.foodPosition.X * TILE_SIZE - TILE_SIZE / 2,
        this.foodPosition.Y * TILE_SIZE - TILE_SIZE / 2,
        TILE_SIZE / 2
      );
      foodObject.DrawShape(null);
      pop();
    }

    if (this.SnakeHeadPos !== null) {
      push();
      ambientMaterial(10, 250, 10);
      specularMaterial(10, 250, 10);
      translate(
        this.SnakeHeadPos.X * TILE_SIZE - TILE_SIZE / 2,
        this.SnakeHeadPos.Y * TILE_SIZE - TILE_SIZE / 2,
        this.SnakeHeadPos.Z + TILE_SIZE);
      noStroke();
      sphere(TILE_SIZE * 0.5);
      pop();
    }

    push();
    ambientMaterial(255, 100, 255);
    specularMaterial(255, 100, 255);
    stroke(100);
    translate(0, 0, TILE_SIZE * 0.55);
    for (var pos in this.WallPlacement) {
      if (this.WallPlacement[pos]) {
        var coors = pos.split(",");
        push();
        translate(
          coors[0] * TILE_SIZE - TILE_SIZE / 2,
          coors[1] * TILE_SIZE - TILE_SIZE / 2);
        box(TILE_SIZE);
        pop();
      }
    }
    pop();

    push();
    ambientMaterial(10, 250, 10);
    specularMaterial(10, 250, 10);
    translate(0, 0, TILE_SIZE * 0.55);
    for (var pos in this.SnakePlacement) {
      var coors = this.SnakePlacement[pos];
      push();
      translate(
        coors[0] * TILE_SIZE - TILE_SIZE / 2,
        coors[1] * TILE_SIZE - TILE_SIZE / 2);
      box(TILE_SIZE, TILE_SIZE, TILE_SIZE / 2);
      pop();
    }
    pop();
  }

  this.placeObject = function(x, y, obj) {
    var type = 0;
    if (obj instanceof WorldObject)
      type = obj.Type;
    else if (!isNaN(obj))
      type = obj;
    else
      throw "WorldMap has to take worldObj or worldObjtype as parameter";

    if (x <= 0 || x > this.Width  || y <= 0 || y > this.Height)
      return;

    switch (type) {
      case OBJ_WALL:
        if (this.StartPosition !== null)
          if (this.StartPosition.X == x && this.StartPosition.Y == y)
            this.StartPosition =  null;
        this.WallPlacement[[x, y]] = true;
        break;
      case OBJ_START:
        if (!(this.WallPlacement[[x, y]]))
          this.StartPosition = new WorldPosition(x, y);
        break;
      case OBJ_DELETE:
        if (this.StartPosition !== null) {
          if (this.StartPosition.X == x && this.StartPosition.Y == y)
            this.StartPosition = null;
        }
        if (this.WallPlacement[[x, y]])
          delete this.WallPlacement[[x, y]];
        break;
      case OBJ_APPLE:
        if (!(this.WallPlacement[[x, y]]))
          this.foodPosition = new WorldPosition(x, y);
        break;
    }
  }

  this.removeMissplacedObjects = function() {
    var todelete = [];
    for (var pos in this.WallPlacement) {
      if (this.WallPlacement[pos]) {
        var coors = pos.split(",");
        if ((1 * coors[0]) > this.Width || (1 * coors[1]) > this.Height)
          todelete.push(pos);
      }
    }
    todelete.forEach(pos => {
      delete this.WallPlacement[pos];
    });
  }

  this.prepareStart = function() {
    this.SnakeHeadPos = this.StartPosition;
    this.StartPosition = null;
    this.generateApple();
  }

  this.generateApple = function() {
    var empty = {};
    var topLimit = 0;
    for(var x = 1; x < this.Width; x++)
      for(var y = 1; y < this.Height; y++)
        if(this.WallPlacement[[x, y]] != true 
          && !(x == this.SnakeHeadPos.X && y == this.SnakeHeadPos.Y)) {
          empty[[x, y]] = true;
          topLimit++;
        }
    for(var pos in this.SnakePlacement) {
      var coors = this.SnakePlacement[pos];
      if(empty[coors[0], coors[1]] == true) {
        empty[coors[0], coors[1]] = false;
        topLimit--;
      }
    }
    var random = Math.floor((Math.random() * topLimit) + 1);
    for(var pos in empty) {
      if(empty[pos]) {
        random--;
        if(random == 0) {
          var coors = pos.split(",");
          this.foodPosition = new WorldPosition(coors[0], coors[1]);
        }
      }
    }
  }

  this.changeDirection = function(add) {
    this.SnakeDirect = add;
  }

  this.moveSnake = function() {
    this.SnakePlacement.push([this.SnakeHeadPos.X, this.SnakeHeadPos.Y]);
    this.checkVoid();
    switch(this.SnakeDirect) {
      case 0:
        this.SnakeHeadPos.Y--;
        break;
      case 1:
        this.SnakeHeadPos.X++;
        break;
      case 2:
        this.SnakeHeadPos.Y++;
        break;
      case 3:
        this.SnakeHeadPos.X--;
        break;
    }
    if(!this.checkApple())
      this.SnakePlacement.shift();
    
    this.checkCol();

    return this.noCollision;
  }

  this.checkApple = function() {
    if(this.SnakeHeadPos.X == this.foodPosition.X && this.SnakeHeadPos.Y == this.foodPosition.Y) {
      this.generateApple();
      return true;
    }
    else
      return false;
  }

  this.checkCol = function() {
    for (var pos in this.SnakePlacement) {
      var coors = this.SnakePlacement[pos];
      if(coors[0] == this.SnakeHeadPos.X && coors[1] == this.SnakeHeadPos.Y)
        this.noCollision = false;
    }
    for (var pos in this.WallPlacement) {
      if (this.WallPlacement[pos]) {
        var coors = pos.split(",");
        if(coors[0] == this.SnakeHeadPos.X && coors[1] == this.SnakeHeadPos.Y)
          this.noCollision = false;
      }
    }
  }
  
  this.checkVoid = function() {
    switch(this.SnakeDirect) {
      case 0:
        if(this.SnakeHeadPos.Y <= 1)
          this.SnakeHeadPos.Y = this.Height + 1;
        break;
      case 1:
        if(this.SnakeHeadPos.X >= this.Width)
          this.SnakeHeadPos.X = 0;
        break;
      case 2:
        if(this.SnakeHeadPos.Y >= this.Height)
          this.SnakeHeadPos.Y = 0;
        break;
      case 3:
        if(this.SnakeHeadPos.X <= 1)
          this.SnakeHeadPos.X = this.Width + 1;
        break;
    }
  }
}
