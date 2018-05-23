
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
