var view = { lat: 40.7580, lng: 286.0145 };
var zoomLevel = 3;

var setterFunctions = []; //these are added at the end of each map's html

//flags which prevent other maps from moving the moused map
var map1IsBeingMoved = false;
var map2IsBeingMoved = false;
var map3IsBeingMoved = false;
var map4IsBeingMoved = false;

var map1IsMoused = false;
var map2IsMoused = false;
var map3IsMoused = false;
var map4IsMoused = false;

//create update event
var updateEvent = new CustomEvent("updateMaps");


/*
function setGlobalZoom(_zoomLevel, mapNumber) { //this isnt used but its here anyways
    if (checkIfAnyCanMove()) {
        initializeMap(mapNumber, true);
    }
    if (!verifyCorrectMap(mapNumber)) {
        //console.log("map " + mapNumber + " wasnt the corrent map");
        return;
    }
    //console.log("setting global zoom to map " + mapNumber);
    //zoomLevel = _zoomLevel;
    //updateMaps(mapNumber);
}*/

function setGlobalPosition(_view, mapNumber) {
    if (checkIfAnyCanMove()) {
        initializeMap(mapNumber, true);
        //console.log("map " + mapNumber + " set to true");
    }
    if (!verifyCorrectMap(mapNumber)) {
        //console.log("map1 wasnt ready for move");
        return;
    }
    //console.log("setting postion of 1");
    view = _view;
    updateMaps(mapNumber);
}

function setGlobalPositionFORCE(_view, mapNumber) {
    view = _view;
    updateMaps(mapNumber);
    updateAll();
}

function updateMaps(mapNumber) {
    for (var i = 1; i <= setterFunctions.length; i++) {
        if (setterFunctions[i - 1].mapNum != mapNumber) {
            setterFunctions[i - 1].setterFunc(view, zoomLevel);
        }
    }
}

function checkIfAnyCanMove() { //checks if any map can start moving at the current moment
    if (map1IsBeingMoved || map2IsBeingMoved || map3IsBeingMoved || map4IsBeingMoved) {
        return false;
    }
    else {
        return true;
    }
}

function initializeMap(mapNumber, TorF) { //sets mapNumber to True or False, this also checks if the map is being moused as verification
    //console.log("setting map " + mapNumber + " to true");
    switch (mapNumber) {
        case 1:
            map1IsBeingMoved = TorF && map1IsMoused;
            break;
        case 2:
            map2IsBeingMoved = TorF && map2IsMoused;
            break;
        case 3:
            map3IsBeingMoved = TorF && map3IsMoused;
            break;
        case 4:
            map4IsBeingMoved = TorF && map4IsMoused;
            break;
        default:
            return;
    }
}


function verifyCorrectMap(mapNumber) {
    if (map1IsBeingMoved || map2IsBeingMoved || map3IsBeingMoved || map4IsBeingMoved) { //check if any map is being moved currently
        switch (mapNumber) { //checks if the map that is calling the function is the one being moved, returns true if it is, false if it isnt
            case 1:
                return map1IsBeingMoved;
            case 2:
                return map2IsBeingMoved;
            case 3:
                return map3IsBeingMoved;
            case 4:
                return map4IsBeingMoved;
            default:
                return false;
        }
    }
    else {
        return false;
    }
}

//mouse control functions
document.addEventListener('mousedown', function (event) { //since these two being called means the mouse is not on any map, set all to false
    mouseUp();
});
document.addEventListener('mouseup', function (event) {
    mouseUp();
});

function mouseUp() { //called whenever a mouse comes up or isnt over a map when clicked
    map1IsMoused = false;
    map2IsMoused = false;
    map3IsMoused = false;
    map4IsMoused = false;
    map1IsBeingMoved = false;
    map2IsBeingMoved = false;
    map3IsBeingMoved = false;
    map4IsBeingMoved = false;
    updateAll();
}

function mouseDown(mapNumber) { //called from iframe of map, allows map to be moved
    switch (mapNumber) {
        case 1:
            map1IsMoused = true;
            break;
        case 2:
            map2IsMoused = true;
            break;
        case 3:
            map3IsMoused = true;
            break;
        case 4:
            map4IsMoused = true;
            break;
        default:
            return;
    }
}

function updateAll() {
    window.dispatchEvent(updateEvent);
}

var loadCount = 0;
function loaded(){
    loadCount++;
    if(loadCount >= 3){
        document.getElementById("loadCover").style.display = "none";
    }
}

try {
    module.exports = {
        verifyCorrectMap: verifyCorrectMap,
        mouseDown: mouseDown,
        initializeMap: initializeMap,
        mouseUp: mouseUp,
        checkIfAnyCanMove: checkIfAnyCanMove
    };
} catch(e) { }
