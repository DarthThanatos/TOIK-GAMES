var host = "localhost"
var component_prefix = "http://" + host + "/"

function getRandomComponentHomeLink(){
    return component_prefix + ((Math.floor(Math.random() * 2) == 0 
        ? "sudoku/" 
        : "memo/")); 
}


function getJSON(link, home, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', link, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(home, xobj.responseText);
        }
    };
    xobj.send(null);
}


function clientMain(){
    var randomComponentHomeLink = getRandomComponentHomeLink();
    getJSON(randomComponentHomeLink + "manifest.json", randomComponentHomeLink, onManifestReady );
}

function onManifestReady(home, json){
    var parsedManifest = JSON.parse(json); 
    var component_game_name = parsedManifest["game-name"]
    removeCompIfExists(component_game_name)
    addComponentSrc(component_game_name, parsedManifest, home, function(){
            runComponent(home, parsedManifest)
    })
}

function runComponent(home, parsedManifest){
    setName(parsedManifest, "bob")
    setAge(parsedManifest, 26)
    setRoom(parsedManifest, "ab34")
    setupComponent(parsedManifest)
}

function setName(parsedManifest, name){
    evalFunFromManifest(parsedManifest, "set-name", "\"" + name +"\"");
}

function setAge(parsedManifest, age){
    evalFunFromManifest(parsedManifest, "set-age", age);
}

function setRoom(parsedManifest, room){
    evalFunFromManifest(parsedManifest, "set-room" , "\"" + room + "\"");
}

function evalFunFromManifest(parsedManifest, funKey, arg){
    var funName = parsedManifest["main-adapter-interface"][funKey]["funName"];
    var evaluationTxt = funName + "(" + arg + ")";
    console.log("Running one-arg method: eval: " + evaluationTxt)
    eval(evaluationTxt);
}

function setupComponent(parsedManifest){
    var funName = parsedManifest["main-adapter-interface"]["setup-fun"]["funName"]
    var evaluationTxt = funName + "(parsedManifest)" 
    console.log("Running: " + evaluationTxt)
    eval(evaluationTxt);
}

function removeCompIfExists(component_game_name){
    var element = document.getElementById(component_game_name);
    if(typeof element !== 'undefined' && element != null) {
        element.parentNode.removeChild(element);
        console.log("Removed old element: " + component_game_name);
    }

}

function addComponentSrc(component_game_name, parsedManifest, randomComponentHomeLink, callback){

    /*this function produces a e.g. tag: 
    <script 
        src="http://localhost/angular_sudoku-gh-pages/apps/js/adapter.js" 
        language="javascript" 
        type="text/javascript">
    </script>>   */

    var filename = randomComponentHomeLink + parsedManifest["main-adapter-dir"]  + parsedManifest["main-adapter-file"]

    var fileref=document.createElement('script')
    
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("id", component_game_name)
    fileref.setAttribute("src", filename)   
    fileref.setAttribute("language", "javascript")
    fileref.setAttribute("type", "text/javascript")
    fileref.onload = callback; 
    
    document.head.appendChild(fileref);   
    console.log("filename: " + filename)  
}

