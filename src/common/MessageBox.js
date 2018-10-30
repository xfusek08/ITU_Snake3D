
var MessageBox = function(message, buttonType) {

  this.isApproved = false;

  var messageDiv = null;

  this.show = function() {
    messageDiv = createDiv().parent("#mainbody").class("messageBoxBackgound");
    var innerDiv = createDiv().parent(messageDiv).class("messageBox");

    // display message
    createDiv(message).parent(innerDiv).class("text");

    // define buttons
    var buttonLine = createDiv().parent(innerDiv).class("buttonline");

    switch (buttonType) {
      case MS_BUTTONS_OK:
        createDiv("ok").parent(buttonLine).class("msButton");
        break;
      case MS_BUTTONS_OK_STORNO:
        createDiv("ok").parent(buttonLine).class("msButton");
        createDiv("storno").parent(buttonLine).class("msButton");
        break;
      case MS_BUTTONS_YES_NO:
        createDiv("yes").parent(buttonLine).class("msButton");
        createDiv("no").parent(buttonLine).class("msButton");
        break;
    }
  }

  this.hide = function() {
    messageDiv.remove();
  }
}
