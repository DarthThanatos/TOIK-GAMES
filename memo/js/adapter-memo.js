var config_endpoint = "/memo/config" //"http://192.168.0.100:8082/memo/config"
var postScore_endpoint = "/game/end" //"http://192.168.0.100:8082/game/end"

function main(){
    getJSON(config_endpoint, afterConfigFetched);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getJSON(link, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', link, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function afterConfigFetched(configJSON){
    console.log("Got response: " + configJSON);
    var csrftoken = getCookie('csrftoken');
    var JSESSIONID = getCookie('JSESSIONID');
    console.log("csrftoken: " + csrftoken + " JSESSIONID: " + JSESSIONID)
    window.name = configJSON
}

function sendScoreAndReturnControl(score){
    var adapterData = JSON.parse(window.name); 
    postScoreJson(postScore_endpoint, score);
    // postModelAttr(postScore_endpoint, score);
}

function postScoreJson(link, score) {
    var data = JSON.parse(window.name);

    var xobj = new XMLHttpRequest();
    xobj.open('POST', link, true);
    xobj.overrideMimeType("application/json");
    xobj.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xobj.withCredentials = true

    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            console.log(xobj.responseText)
            window.location = xobj.responseText
        }
    };

    var sentPayload = 
        JSON.stringify(
            {   
                group : data["group"],
                nick : data["nick"],
                age : data["age"],
                result: score
            }
        );
    console.log(sentPayload)
    xobj.send(sentPayload);
}

function postModelAttr(link, score){
    var data = JSON.parse(window.name);

    var xobj = new XMLHttpRequest();
    xobj.open('POST', link + "?group=" + data["group"] + "&nick=" + data["nick"] + "&age=" + data["age"] + "&result=" + score, true);

    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            console.log(xobj.responseText)
            window.location = xobj.responseText
        }
    };

    xobj.send(null);
}



//===============================================================================================================
//OLD ADAPTING FUNCTIONALITY

var host = "localhost"
var component_location_prefix = "http://" + host + "/memo/" 
var client_location = "http://" + host  + "/client.html"


function main_memo(parsedManifest){
    if(main_memo.userName != "" &&  main_memo.roomName != "" && main_memo.userAge != -1){
        onRun(parsedManifest)
    }
    else{
        alert(
            "Main setup: error, required initial setup has not happened. "
            + "Set userName, roomName and userAge with correct values"
        )
    }
}

function setAgeOfUSer(age){
    main_memo.userAge = age
    console.log("age: " + main_memo.userAge)
}

function setNameOfUser(name){
    main_memo.userName = name
    console.log("name: " + main_memo.userName)
}

function setServerRoom(serverRoomName){
    main_memo.roomName = serverRoomName
    console.log("room: " + main_memo.roomName)
}

function onRun(parsedManifest){
    persistAdapterData();
    var location_ = component_location_prefix +  parsedManifest["main-html-dir"] + parsedManifest["main-html-file"]
    console.log("Moving to: " + location_ + " from main")
    window.location = location_;
}

function persistAdapterData(){
    window.name = JSON.stringify(
        { 
            userName: main_memo.userName,
            userAge : main_memo.userAge,
            roomName: main_memo.roomName
        }
    );
}
