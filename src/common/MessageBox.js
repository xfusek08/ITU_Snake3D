
var MessageBox = function(message, buttonType) {
  this.show = function(onAproove, onCancel) {
    var messageDiv = createDiv().parent("#mainbody").class("messageBoxBackgound");
    var innerDiv = createDiv().parent(messageDiv).class("messageBox");

    // display message
    createDiv(message).parent(innerDiv).class("text");

    // define buttons
    var buttonLine = createDiv().parent(innerDiv).class("buttonline");

    var approveBt = null;
    var cancelBt = null;
    switch (buttonType) {
      case MS_BUTTONS_OK:
        approveBt = createDiv("Ok").parent(buttonLine).class("generalButton").addClass("approve");
        break;
      case MS_BUTTONS_OK_STORNO:
        cancelBt = createDiv("Zrušit").parent(buttonLine).class("generalButton").addClass("cancel");
        approveBt = createDiv("Ok").parent(buttonLine).class("generalButton").addClass("approve");
        break;
      case MS_BUTTONS_YES_NO:
        cancelBt = createDiv("Ne").parent(buttonLine).class("generalButton").addClass("cancel");
        approveBt = createDiv("Ano").parent(buttonLine).class("generalButton").addClass("approve");
        break;
    }

    innerDiv.position(
      messageDiv.size().width / 2 - innerDiv.size().width / 2,
      messageDiv.size().height / 2 - innerDiv.size().height / 2
    );

    if (approveBt !== null) {
      approveBt.mouseClicked(function () {
        messageDiv.remove();
        if (typeof onAproove === "function")
          onAproove();
      });
    }

    if (cancelBt != null) {
      cancelBt.mouseClicked(function () {
        messageDiv.remove();
        if (typeof onCancel === "function")
          onCancel();
      });
    }
  }
}
