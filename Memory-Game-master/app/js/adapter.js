var host = "localhost"
var component_location_prefix = "http://" + host + "/Memory-Game-master/" 
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

function sendScoreAndReturnControl(score){
    var adapterData = JSON.parse(window.name); 
    alert(
        "Sending " + score + " and returning control to user from memo: " + adapterData['userName']
         + " room: " + adapterData['roomName']
         + " age: " + adapterData['userAge']
    )
    window.location = client_location
}