
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

    var playButtons = document.getElementsByClassName("play");
    var editButtons = document.getElementsByClassName("edit");
    var addButton = document.getElementsByClassName("addImg");

    //adding events to elements
    for(var i = 0; i < playButtons.length; ++i) {
      playButtons[i].addEventListener("mouseover", playHover, false);
      playButtons[i].addEventListener("mouseleave", playLeave, false);
      editButtons[i].addEventListener("mouseover", playHover, false);
      editButtons[i].addEventListener("mouseleave", playLeave, false);
    }
    addButton[0].addEventListener("mouseover", addHover, false);
    addButton[0].addEventListener("mouseleave", addLeave, false);
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
    var map = {'src': 'res/emptyMap.png', 'name': 'Empty'};
    mapArray.push(map);
    map = {'src': 'res/notEmptyMap.png', 'name': 'Full'};
    mapArray.push(map);
    map = {'src': 'res/userCreated.png', 'name': 'Custom'};
    mapArray.push(map);
    return mapArray;
  }

  function playHover(event) {
    var myTarget = event.target;
    var comrade = null;
    var playButtons;
    var editButtons;

    if(myTarget.className == "play") {
      myTarget.style.backgroundImage = "url('res/selPLay.png')";
      myTarget.style.borderRight = "2px solid #d4d4d4";
      playButtons = document.getElementsByClassName("play");
      for(var i = 0; i < playButtons.length; ++i) {
        if(myTarget == playButtons[i]) {
          comrade = i;
        }
      }
      editButtons = document.getElementsByClassName("edit");
      editButtons[comrade].style.background = "rgba(0, 0, 0, 0.1)";
      editButtons[comrade].style.backgroundImage = "url('res/notSelEdit.png')";
      editButtons[comrade].style.borderLeft = "2px solid #d4d4d4";
    }
    else {
      myTarget.style.backgroundImage = "url('res/selEdit.png')";
      myTarget.style.borderLeft = "2px solid #d4d4d4";
      editButtons = document.getElementsByClassName("edit");
      for(var i = 0; i < editButtons.length; ++i) {
        if(myTarget == editButtons[i]) {
          comrade = i;
        }
      }
      playButtons = document.getElementsByClassName("play");
      playButtons[comrade].style.background = "rgba(0, 0, 0, 0.1)";
      playButtons[comrade].style.backgroundImage = "url('res/notSelPLay.png')";
      playButtons[comrade].style.borderRight = "2px solid #d4d4d4";
    }
  }

  function playLeave(event) {
    var myTarget = event.target;
    var buttons;

    myTarget.style.backgroundImage = "";
    myTarget.style.border = "";
    myTarget.style.background = "";

    if(myTarget.className == "play")
      buttons = document.getElementsByClassName("play");
    else
      buttons = document.getElementsByClassName("edit");
    for(var i = 0; i < buttons.length; ++i)
      if(myTarget == buttons[i])
        comrade = i;
    if(myTarget.className == "edit")
      buttons = document.getElementsByClassName("play");
    else
      buttons = document.getElementsByClassName("edit");
    buttons[comrade].style.background = "";
    buttons[comrade].style.backgroundImage = "";
    buttons[comrade].style.border = "";
  }

  function addHover(event) {
    event.target.style.backgroundImage = "url('res/addButtonSel.png')";
  }

  function addLeave(event) {
    event.target.style.backgroundImage = "url('res/addButton.png')";
  }
}
