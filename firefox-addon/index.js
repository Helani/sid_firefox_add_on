var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");

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

function popupLogin() {

  /*
   *In this method popup.html(for login) is loaded together with its Content Scripts and Style Files.
   *The Session is checked inside auth.js and if it is a valid session it hides popup.html and shows logout(main.html)
   * instead of that.
   */

  //Create login popup with popup.html and content scripts.
  login_popup = require("sdk/panel").Panel({
    contentURL: self.data.url("popup.html"),
    contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"), self.data.url("js/bootstrap.min.js"), self.data.url("js/cookie.js"), self.data.url("js/auth.js")],
    contentStyleFile: self.data.url("css/popup.css"),
    contentScriptWhen: "start"
  });

  //shows popup for login
  login_popup.show({
    position: {
      top: 0,
      right: 0

    }

  });

  //executes when there is a message from auth.js.It hides login popup and shows logout popup.
  login_popup.port.on("logout_popup", function handleMyMessage(myMessagePayload) {
    console.log("----------------On Message(Auth Success)----------------");
    if (login_popup) {
      login_popup.hide();
    }

    panel = require("sdk/panel").Panel({
      contentURL: require("sdk/self").data.url("main.html"),
      contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"), self.data.url("js/bootstrap.min.js"), self.data.url("js/cookie.js"), self.data.url("js/main.js")],
      contentScriptWhen: "ready"
    });

    panel.show({
      position: {
        top: 0,
        right: 0

      }

    });

    panel.port.on("login_popup", function handleMyMessage(myMessagePayload) {
      console.log("-------------LOGOUT BUTTON CLICKED-----------------");
      if (panel) {
        panel.hide();
      }
      popupLogin();
    });



  });


};











function handleClick(state) {

  console.log("-------------ADON BUTTON CLICKED-----------------");

  popupLogin();


}






function logURL(tab) {

  console.log(tab.url);

  if(tab.url=="https://www.facebook.com" || tab.url=="https://web.facebook.com"){

    console.log("Browser is on facebook.com");

  }
}





function runScript(tab) {


  if (tab.url.search("https://www.facebook.com") != -1 || tab.url.search("https://web.facebook.com") != -1) {

    console.log("Hello Facebook*********");

    tab.attach({
      contentScriptFile: [self.data.url("js/jquery-1.11.3.min.js"),  self.data.url("js/Chart.min.js"),self.data.url("js/configs.js"),self.data.url("js/notie.js"),self.data.url("js/fbInject.js")],
      contentStyleFile: [self.data.url("css/fbInject.css"),self.data.url("css/dropdown.css"),self.data.url("css/popup.css"),self.data.url("css/popUpStyles.css")],
      contentScriptOptions: {
        //claimPng: [self.data.url("resources/icons/claimC.png"), self.data.url("resources/icons/claimR.png"), self.data.url("resources/icons/claimT.png")],
        claimPng:{'C':self.data.url("resources/icons/claimC.png"),'R':self.data.url("resources/icons/claimR.png"),'T':self.data.url("resources/icons/claimT.png"),'N':self.data.url("resources/icons/claimN.png")},
        //profPng: [self.data.url("resources/icons/profC.png"), self.data.url("resources/icons/profR.png"), self.data.url("resources/icons/profT.png"),self.data.url("resources/icons/profN.png")],
        profPng:{'C':self.data.url("resources/icons/profC.png"),'R':self.data.url("resources/icons/profR.png"),'T':self.data.url("resources/icons/profT.png"),'N':self.data.url("resources/icons/profN.png")},
        analytics_header:self.data.url("resources/images/analytics_header.png"),
        legend:self.data.url("resources/images/legend.png"),
        sidChart: self.data.load("html/sidAnalytics.html"),
        ratePopup:self.data.load("html/ratePopup.html"),
        popupBase:self.data.url("resources/icons/popupBase.png"),
        notRatedInfo:self.data.url('resources/images/notRatedInfo.png'),

      }


    });

  }

};

//This is the entry point of the application



