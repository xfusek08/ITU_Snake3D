
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Petr Fusek
// File: MainMenuScreen.js
// Type of screen witch displays main menu

var MainMenuScreen = function() {

  this.mainMenuDiv = null;

  // public
  this.init = function() {
    // generate screen html and behavor
    this.mainMenuDiv = select('#mainMenuScreenDiv');
    this.mainMenuDiv.show();
    generateMenu();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
    // disable all event reactions ...
  }

  this.draw = function() {
    // real time reaction ...
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.mainMenuDiv.hide();
  }

  this.show = function () {
    // code to restorre hiden screen
    this.mainMenuDiv.show();
  }

  function generateMenu() {
    //generating maps
    var mapArray = loadMaps();
    var map;
    var play;
    var edit;
    var mapImg;
    var nameHolder;
    var name;
    for(var i = 0; i < mapArray.length; ++i) {
      map = document.createElement("div");
      map.className = 'map';

      play = document.createElement("div");
      play.className = 'play';

      edit = document.createElement("div");
      edit.className = 'edit';

      mapImg = document.createElement("img");
      mapImg.className = 'mapImg';
      mapImg.src = mapArray[i].src;

      name = document.createTextNode(mapArray[i].name);
      nameHolder = document.createElement("p");
      nameHolder.appendChild(name);

      map.appendChild(play);
      map.appendChild(edit);
      map.appendChild(mapImg);
      map.appendChild(nameHolder);
      document.getElementById("mapMenu").appendChild(map);
    }

    //generating add button
    var addButton;
    var addImg;
    var textHolder;

    addButton = document.createElement("div");
    addButton.className = 'addButton';

    addImg = document.createElement("div");
    addImg.className = 'addImg';

    textHolder = document.createElement("p");
    textHolder.appendChild(document.createTextNode("Add button"));

    addButton.appendChild(addImg);
    addButton.appendChild(textHolder);
    document.getElementById("mapMenu").appendChild(addButton);
  }

  //will load from file later
  function loadMaps() {
    var mapArray = [];
    var map = {'src': 'resources/emptyMap.png', 'name': 'Empty'};
    mapArray.push(map);
    map = {'src': 'resources/notEmptyMap.png', 'name': 'Full'};
    mapArray.push(map);
    map = {'src': 'resources/userCreated.png', 'name': 'Custom'};
    mapArray.push(map);
    return mapArray;
  }
}
