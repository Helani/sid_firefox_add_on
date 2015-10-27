var timeLineCName = document.getElementById('fb-timeline-cover-name');
var timeLineHLine = document.getElementById('fbTimelineHeadline');

console.log("Inside fbInject.js -------"+timeLineCName+"---"+timeLineHLine);

if(timeLineCName!=null && timeLineHLine!=null) {
    console.log("Inside fbInject.js ----&&&&&&&&&&---");
    var profPic = document.getElementsByClassName("photoContainer")[0];
    var icon = document.createElement("DIV");
    icon.innerHTML = "<img id ='verif' class = 'profIcon'>"
    profPic.appendChild(icon);
    document.getElementById('verif').src = "profR.png";
   // $("#verif").fadeIn(2000);
}


