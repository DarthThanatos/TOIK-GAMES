var host = "localhost"
var component_location_prefix = "http://" + host + "/sudoku/" 
var client_location = "http://" + host  + "/client.html"

function main(){
    getJSON("http://192.168.0.100:8082/sudoku/config", afterConfigFetched);
}

function getJSON(link, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', link, true);
    xobj.withCredentials = false;
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function afterConfigFetched(configJSON){
    console.log("Got response: " + configJSON);
    window.name = configJSON
}

function sendScoreAndReturnControl(score){
    var adapterData = JSON.parse(window.name); 
    // window.location = client_location
    // postScoreJson("http://192.168.0.100:8082/gameEnd", score);
    postModelAttr("http://192.168.0.100:8082/gameEnd", score);
}


function postScoreJson(link, score) {
    var data = JSON.parse(window.name);

    var xobj = new XMLHttpRequest();
    xobj.setRequestHeader("Content-Type", "application/json");
    xobj.open('POST', link, false);
    xobj.send(
        JSON.stringify(
            {   
                group : data["group"],
                nick : data["nick"],
                age : data["age"],
                result: score
            }
        )
    );
}


function postModelAttr(link, score){
    var data = JSON.parse(window.name);

    var xobj = new XMLHttpRequest();
    xobj.open('POST', link + "?group=" + data["group"] + "&nick=" + data["nick"] + "&age=" + data["age"] + "&result=" + score, false);
    xobj.send(null);
}





function main_sudoku(parsedManifest){
    if(main_sudoku.userName != "" &&  main_sudoku.roomName != "" && main_sudoku.userAge != -1){
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
    main_sudoku.userAge = age
    console.log("age: " + main_sudoku.userAge)
}

function setNameOfUser(name){
    main_sudoku.userName = name
    console.log("name: " + main_sudoku.userName)
}

function setServerRoom(serverRoomName){
    main_sudoku.roomName = serverRoomName
    console.log("room: " + main_sudoku.roomName)
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
            userName: main_sudoku.userName,
            userAge : main_sudoku.userAge,
            roomName: main_sudoku.roomName
        }
    );
}
