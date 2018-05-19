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
    alert(
        "Sending " + score + " and returning control to user from sudoku: " + adapterData['userName']
         + " room: " + adapterData['roomName']
         + " age: " + adapterData['userAge']
    )
    // window.location = client_location
    postScore("http://192.168.0.100:8082/gameEnd", score);
}

function postScore(link, score) {
    var data = JSON.parse(window.name);
    
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('POST', link, false);
    xobj.setRequestHeader("Content-Type", "application/json");
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
