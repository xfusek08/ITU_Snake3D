
// Project: ITU project: Game "Snake in 3D" (UX prototype)
// Author: Jaromir Franek
// File: MainMenuScreen.js
// Type of screen witch displays main menu

var MainMenuScreen = function (canvas) {

  this.mainMenuDiv = null;
  var mapArray = null;
  var myMaps = null;

  // public
  this.init = function () {
    // generate screen html and behavor
    this.mainMenuDiv = select('#mainMenuScreenDiv');
    this.mainMenuDiv.show();
    generateMenu();
    myMaps = createMaps();
    addEvents();
  }

  this.deinit = function () {
    // generate screen html and behavor
    this.hide();
  }

  this.hide = function () {
    // code to hide and pouse act screen
    this.mainMenuDiv.hide();
  }

  this.show = function () {
    // code to restorre hiden screen
    this.mainMenuDiv.show();
  }

  // unused functions
  this.draw = function () { }
  this.mouseWheenEvent = function(event) {}
  this.touchMovedEvent = function () { }
  this.touchStartedEvent = function () { }
  this.touchEndedEvent = function () { }
  this.keyPressedEvent = function () { }
  this.keyReleasedEvent = function () { }

  function generateMenu() {
    generateMenuMaps();
    generateAddButton();
  }

  function generateMenuMaps() {
    mapArray = loadMaps();
    this.mapArray = mapArray;
    var map;
    var play;
    var edit;
    var end;
    var mapImg;
    var nameHolder;
    var name;
    for (var i = 0; i < mapArray.length; ++i) {
      map = document.createElement("div");
      map.className = 'map';

      play = document.createElement("div");
      play.className = 'play';

      edit = document.createElement("div");
      edit.className = 'edit';

      end = document.createElement("div");
      end.className = 'deleteButton';

      mapImg = document.createElement("img");
      mapImg.className = 'mapImg';
      mapImg.src = mapArray[i].src;

      name = document.createTextNode(mapArray[i].name);
      nameHolder = document.createElement("p");
      nameHolder.appendChild(name);

      map.appendChild(play);
      map.appendChild(edit);
      map.appendChild(end);
      map.appendChild(mapImg);
      map.appendChild(nameHolder);
      document.getElementById("mapMenu").appendChild(map);
    }
  }

  function generateAddButton() {
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

  function addEvents() {
    var playButtons = document.getElementsByClassName("play");
    var editButtons = document.getElementsByClassName("edit");
    var deleteButtons = document.getElementsByClassName("deleteButton");
    var addButton = document.getElementsByClassName("addImg");

    for (var i = 0; i < playButtons.length; ++i) {
      playButtons[i].addEventListener("mouseover", playHover, false);
      playButtons[i].addEventListener("mouseleave", playLeave, false);
      playButtons[i].addEventListener("click", clickPlay, false);
      editButtons[i].addEventListener("mouseover", playHover, false);
      editButtons[i].addEventListener("mouseleave", playLeave, false);
      editButtons[i].addEventListener("click", clickEdit, false);
      deleteButtons[i].addEventListener("mouseover", deleteHover, false);
      deleteButtons[i].addEventListener("mouseleave", deleteLeave, false);
      deleteButtons[i].addEventListener("click", clickDelete, false);
    }
    addButton[0].addEventListener("mouseover", addHover, false);
    addButton[0].addEventListener("mouseleave", addLeave, false);
    addButton[0].addEventListener("click", clickAdd, false);
  }

  //will load from file later
  function loadMaps() {
    var mapArray = [];
    var map = { 'src': 'res/img/emptyMap.png', 'name': 'Empty' };
    mapArray.push(map);
    map = { 'src': 'res/img/notEmptyMap.png', 'name': 'Full' };
    mapArray.push(map);
    map = { 'src': 'res/img/userCreated.png', 'name': 'Custom' };
    mapArray.push(map);
    return mapArray;
  }

  function createMaps() {
    var mapArray = [];
    var map = new WorldMap(this.mapArray[0].name, 20, 30)
    map.placeObject(10,15,OBJ_START);
    mapArray.push(map);
    map = new WorldMap(this.mapArray[1].name, 20, 30)
    for(var i = 1; i < 31; i++){
      map.placeObject(1,i,OBJ_WALL);
      map.placeObject(20,i,OBJ_WALL);
    }
    for(var i = 1; i < 21; i++){
      map.placeObject(i,1,OBJ_WALL);
      map.placeObject(i,30,OBJ_WALL);
    }
    map.placeObject(10,15,OBJ_START);
    mapArray.push(map);
    map = new WorldMap(this.mapArray[2].name, 20, 30)
    for(var i = 1; i < 31; i++){
      map.placeObject(1,i,OBJ_WALL);
      map.placeObject(20,i,OBJ_WALL);
    }
    for(var i = 1; i < 21; i++){
      map.placeObject(i,1,OBJ_WALL);
      map.placeObject(i,30,OBJ_WALL);
    }
    map.placeObject(11,16,OBJ_WALL);
    map.placeObject(11,15,OBJ_WALL);
    map.placeObject(11,14,OBJ_WALL);
    map.placeObject(12,16,OBJ_WALL);
    map.placeObject(13,16,OBJ_WALL);
    map.placeObject(8,7,OBJ_START);
    mapArray.push(map);
    return mapArray;
  }

  function playHover(event) {
    var myTarget = event.target;

    if (myTarget.className == "play") {
      playSelected(myTarget);
    }
    else {
      editSelected(myTarget);
    }
  }

  function playSelected(myTarget) {
    var comrade;
    var playButtons;
    myTarget.style.backgroundImage = "url('res/img/selPLay.png')";
    myTarget.style.borderRight = "2px solid #d4d4d4";
    playButtons = document.getElementsByClassName("play");
    for (var i = 0; i < playButtons.length; ++i) {
      if (myTarget == playButtons[i]) {
        comrade = i;
      }
    }
    playButtons = document.getElementsByClassName("edit");
    playButtons[comrade].style.background = "rgba(0, 0, 0, 0.1)";
    playButtons[comrade].style.backgroundImage = "url('res/img/notSelEdit.png')";
    playButtons[comrade].style.borderLeft = "2px solid #d4d4d4";
  }

  function editSelected(myTarget) {
    var comrade;
    var playButtons;
    myTarget.style.backgroundImage = "url('res/img/selEdit.png')";
    myTarget.style.borderLeft = "2px solid #d4d4d4";
    playButtons = document.getElementsByClassName("edit");
    for (var i = 0; i < playButtons.length; ++i) {
      if (myTarget == playButtons[i]) {
        comrade = i;
      }
    }
    playButtons = document.getElementsByClassName("play");
    playButtons[comrade].style.background = "rgba(0, 0, 0, 0.1)";
    playButtons[comrade].style.backgroundImage = "url('res/img/notSelPLay.png')";
    playButtons[comrade].style.borderRight = "2px solid #d4d4d4";
    playButtons = document.getElementsByClassName("deleteButton");
    playButtons[comrade].style.backgroundImage = "url('res/img/cross.png')";
    playButtons[comrade].style.border = "2px solid #d4d4d4";
  }

  function playLeave(event) {
    var myTarget = event.target;
    var buttons;

    myTarget.style.backgroundImage = "";
    myTarget.style.border = "";
    myTarget.style.background = "";

    if (myTarget.className == "play")
      buttons = document.getElementsByClassName("play");
    else
      buttons = document.getElementsByClassName("edit");
    for (var i = 0; i < buttons.length; ++i)
      if (myTarget == buttons[i])
        comrade = i;
    if (myTarget.className == "edit")
      buttons = document.getElementsByClassName("play");
    else
      buttons = document.getElementsByClassName("edit");
    buttons[comrade].style.background = "";
    buttons[comrade].style.backgroundImage = "";
    buttons[comrade].style.border = "";
    if (myTarget.className == "edit") {
      buttons = document.getElementsByClassName("deleteButton");
      buttons[comrade].style.backgroundImage = "";
      buttons[comrade].style.border = "";
    }
  }

  function deleteHover(event) {
    event.target.style.backgroundImage = "url('res/img/cross.png')";
    event.target.style.border = "2px solid #d4d4d4";
  }

  function deleteLeave(event) {
    event.target.style.backgroundImage = "";
    event.target.style.border = "";
  }

  function addHover(event) {
    event.target.style.backgroundImage = "url('res/img/addButtonSel.png')";
  }

  function addLeave(event) {
    event.target.style.backgroundImage = "url('res/img/addButton.png')";
  }

  function clickPlay(event) {
    var myTarget = event.target;
    var pos = 0;
    buttons = document.getElementsByClassName("play");
    for (var i = 0; i < buttons.length; ++i)
      if (myTarget == buttons[i]) {
        pos = i;
      }
    screenStack.pushScreen(new GameScreen(canvas, myMaps[pos]));
  }

  function clickEdit(event) {
    var myTarget = event.target;
    var pos = 0;
    buttons = document.getElementsByClassName("edit");
    for (var i = 0; i < buttons.length; ++i)
      if (myTarget == buttons[i]) {
        pos = i;
      }
    screenStack.pushScreen(new EditorScreen(canvas, myMaps[pos]));
  }

  function clickDelete() {
    //deleting map
    //refresing menu (generateMenu, addEvents)
  }

  function clickAdd() {
    screenStack.pushScreen(new EditorScreen(canvas, new WorldMap('User map 1', 30, 20)));
  }
}
