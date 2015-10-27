var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var login_popup = require("sdk/panel").Panel({
  contentURL: self.data.url("popup.html"),
  contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"),self.data.url("js/bootstrap.min.js"),self.data.url("js/cookie.js"),self.data.url("js/auth.js")],
  contentScriptWhen:"ready"
});

require("sdk/tabs").on("ready", logURL);
require("sdk/tabs").on("ready", runScript);



var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});



function handleClick(state) {
  login_popup.show({
    position:{
      top:0,
      right: 0

    }

  });


}

function logURL(tab) {

  console.log(tab.url);

  if(tab.url=="https://www.facebook.com/"){

    console.log("Browser is on facebook.com");

  }
}

function runScript(tab) {


  if(tab.url.search("https://www.facebook.com")!= -1){

    console.log("Hello Facebook*********");

    tab.attach({
      contentScriptFile: self.data.url("js/fbInject.js")
    });

  }

}

login_popup.port.on("myMessage", function handleMyMessage(myMessagePayload) {
  console.log("----------------On Message(Auth Success)----------------");

  var panel = require("sdk/panel").Panel({
  	contentURL: require("sdk/self").data.url("main.html"),
    contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"),self.data.url("js/bootstrap.min.js"),self.data.url("js/cookie.js"),self.data.url("js/auth.js")],
    contentScriptWhen:"ready"
  });

  panel.show({
  	position:{
  		top:0,
  		right: 0

  	}

  });
});

