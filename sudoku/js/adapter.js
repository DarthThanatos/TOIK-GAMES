var host = "localhost"
var component_location_prefix = "http://" + host + "/sudoku/" 
var client_location = "http://" + host  + "/client.html"

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

function sendScoreAndReturnControl(score){
    var adapterData = JSON.parse(window.name); 
    alert(
        "Sending " + score + " and returning control to user from sudoku: " + adapterData['userName']
         + " room: " + adapterData['roomName']
         + " age: " + adapterData['userAge']
    )
    window.location = client_location

}