
var MessageBox = function(message, buttonType) {
  this.show = function(onAproove, onCancel) {
    var messageDiv = createDiv().parent("#mainbody").class("messageBoxBackgound");
    var innerDiv = createDiv().parent(messageDiv).class("messageBox");

    // display message
    createDiv(message).parent(innerDiv).class("text");

    // define buttons
    var buttonLine = createDiv().parent(innerDiv).class("buttonline");

    switch (buttonType) {
      case MS_BUTTONS_OK:
        createDiv("Ok").parent(buttonLine).class("msButton").addClass("approve");
        break;
      case MS_BUTTONS_OK_STORNO:
        createDiv("Zrušit").parent(buttonLine).class("msButton").addClass("cancel");
        createDiv("Ok").parent(buttonLine).class("msButton").addClass("approve");
        break;
      case MS_BUTTONS_YES_NO:
        createDiv("Ne").parent(buttonLine).class("msButton").addClass("cancel");
        createDiv("Ano").parent(buttonLine).class("msButton").addClass("approve");
        break;
    }

    innerDiv.position(
      messageDiv.size().width / 2 - innerDiv.size().width / 2,
      messageDiv.size().height / 2 - innerDiv.size().height / 2
    );

    selectAll(".approve").forEach(element => {
      element.mouseClicked(function () {
        messageDiv.remove();
        if (typeof onAproove === "function")
        onAproove();
      });
    });

    selectAll(".cancel").forEach(element => {
      element.mouseClicked(function () {
        messageDiv.remove();
        if (typeof onCancel === "function")
          onCancel();
      });
    });
  }
}
