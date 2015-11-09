var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var login_popup = require("sdk/panel").Panel({
  contentURL: self.data.url("popup.html"),
  contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"),self.data.url("js/bootstrap.min.js"),self.data.url("js/cookie.js"),self.data.url("js/auth.js")],
  contentStyleFile: self.data.url("css/popup.css"),
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

  if(tab.url=="https://web.facebook.com"){

    console.log("Browser is on facebook.com");

  }
}

function runScript(tab) {


  if(tab.url.search("https://web.facebook.com")!= -1){

    console.log("Hello Facebook*********");

    tab.attach({
      contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"),self.data.url("js/fbInject.js"),self.data.url("js/Chart.min.js")],
      contentScriptOptions: {
        claimPng: [self.data.url("resources/icons/claimC.png"),self.data.url("resources/icons/claimR.png"),self.data.url("resources/icons/claimT.png")],
        profPng:[self.data.url("resources/icons/profC.png"),self.data.url("resources/icons/profR.png"),self.data.url("resources/icons/profT.png")],
        sidChart:self.data.load("html/sidAnalytics.html")
      }
     // contentStyleFile: [self.data.url("css/fbInject.css"),self.data.url("css/dropdown.css")]

    });

  }

}

login_popup.port.on("logout_popup", function handleMyMessage(myMessagePayload) {
  console.log("----------------On Message(Auth Success)----------------");
  if(login_popup){
    login_popup.destroy();
  }

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

