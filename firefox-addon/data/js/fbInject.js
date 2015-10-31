var timeLineCName = document.getElementById('fb-timeline-cover-name');		//element to identify fb profile
var UpStatBtn = document.getElementsByClassName('uiIconText _51z7')[0];		//element to identify fb wall
var membersBtn = document.getElementsByClassName('_2l5d')[1];				//element to identify fb group
var timeLineHLine = document.getElementById('fbTimelineHeadline');			//element to identify fb page
var sidId = document.getElementById('sidId');

//if(getCookie("sidSession")==="true"){	/*check whether user is logged in*/
    identify();	/*identify web page*/
//}

function identify(){
    if(timeLineCName!=null && timeLineHLine!=null && sidId === null){
        manipulate();	/*if an fb profile, and haven't modified before, then add sid elements*/
    }
}

function manipulate(){
    updateProfPic();

    var claimCount = document.getElementsByClassName("_1zw6 _md0 _5vb9").length;
    for(var i=0;i<claimCount;i++){
        scoreClaimsOnTimeLine(i);
    }

    //TODO:Load Pie Chart

    sidId = document.createElement("DIV");
    sidId.innerHTML = "<p id='sidId' style = 'display:none'></p>";
    document.getElementsByClassName('photoContainer')[0].appendChild(sidId);

    //var node = document.createElement("DIV");

    document.getElementsByClassName('_6_7 clearfix')[0].insertAdjacentHTML('afterbegin',self.options.sidChart);
    commitChart();

   // document.getElementsByClassName('_6_7 clearfix')[0].appendChild(node);



}

/** Appends sid-rating state over fb profile picture*/
function updateProfPic(){
    var profPic = document.getElementsByClassName("photoContainer")[0];
    var icon = document.createElement("DIV");
    var imgURL;var profID = extract_UserID();
    icon.innerHTML = "<img id ='verif' class = 'profIcon'>"
    profPic.appendChild(icon);

    $.post("https://id.projects.mrt.ac.lk:9000/profRating",
        {
            targetUser: profID
        },
        function(data, status){
            switch (data.rating){
                case 'C':
                    document.getElementById('verif').src=self.options.profPng[0];
                    break;
                case 'R':
                    document.getElementById('verif').src=self.options.profPng[1];
                    break;
                case 'T':
                    document.getElementById('verif').src=self.options.profPng[2];
                    break;
                default :
                    break;

            }

            $("#verif").fadeIn(2000);
        });
}

function scoreClaimsOnTimeLine(arrIndex){

    var profID = extract_UserID();
    var cla = document.getElementsByClassName("_1zw6 _md0 _5vb9")[arrIndex].getElementsByClassName("_50f3")[0];
    var claim = document.createElement("DIV");
    var iconID = 'claimR'+arrIndex;
    var iconClass = 'claim';
    var claimScore = 'T';

    claim.innerHTML = "<img id = '" + iconID + "' class = '" + iconClass + "' >"
    cla.appendChild(claim);
    arrIndex+=23;

    $.post("https://id.projects.mrt.ac.lk:9000/claimScore",{
            targetUser : profID,
            claimID : arrIndex
        },
        function(data,status){
            claimScore = data.rating;
            alert("data rating is"+claimScore);

            switch (claimScore){
                case 'C':
                    document.getElementById(iconID).src=self.options.claimPng[0];
                    break;
                case 'R':
                    document.getElementById(iconID).src=self.options.claimPng[1];
                    break;
                case 'T':
                    document.getElementById(iconID).src=self.options.claimPng[2];
                    break;
                default :
                    break;

            }

        });

}

/**Returns logged in user id as a string*/
function extract_UserID(){
    var str;
    var profID;
    try{
        str = document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt");
        var a = str.indexOf('{');
        var b = str.indexOf('}');
        var profElementStr = str.substring(++a, b).split(',')[0].split(':')[1];
        profID = profElementStr.substring(1,profElementStr.length-1);
    }catch(e){
        console.log("Synchronization Issue. Page will be reloded");
        window.location.reload();
    }
    return profID;

}

/**Get a cookie from main browser*/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

/*TODO Move post request to solve loading time issues*/
function drawPieChart(){
    var verified =50;
    var rejected =50;
    var uncertain=50;
    $.post("https://id.projects.mrt.ac.lk:9000/claimRating",{
            sender : 12,
            target : 12,
            cClass : 12,
            claimId :12
        },
        function(data,status){
            verified = data.positive;
            rejected = data.negative;
            uncertin = data.uncertain;

            var pieData = [
                {
                    value: rejected,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Rejected"
                },
                {
                    value: verified,
                    color: "#46BF7D",
                    highlight: "#5AD391",
                    label: "Verified"
                },
                {
                    value: uncertain,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Uncertain"
                }
            ];

            var ctx = document.getElementById("myChart").getContext("2d");
            try{
                window.myPie = new Chart(ctx).Pie(pieData,{
                    animation: true,
                    animationEasing: "easeInOutQuart"
                    //add more chart configs here as needed
                });
            }catch(err){
                console.log(err);
            }

        });

}
function commitChart(){
    var sidDropdown = document.getElementById('sidDropdown');
    sidDropdown.addEventListener('mouseover', function() {
        drawPieChart();
    });
}







