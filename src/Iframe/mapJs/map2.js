osmMap2 = L.map('map2', {renderer: L.canvas(), minZoom: 3, 
    fullscreenControl: true,
    inertia: false,
    timeDimension: false
});

osmMap2.on("load", function () {
    parent.loaded();
});

osmMap2.setView(parent.view, parent.zoomLevel);


var tiles2 = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png ', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
    maxBounds: [[],[]]
}).addTo(osmMap2);

var sidebar = L.control.sidebar('sidebar', {
    position: 'right'
}).addTo(map);


L.icon = function (option) {
    console.log("option: " + option);
    switch(option){
        case "drinking_water":
            return new L.Icon({
                iconUrl: "../../images/drinking_fountain.png",
                iconSize: [25, 25]
            });
        case "fountain":
            return new L.Icon({
                iconUrl: "../../images/fountain.png",
                iconSize: [20, 20]
            });
        case "fire_hydrant":
            return new L.Icon({
                iconUrl: "../../images/fire_hydrant.png",
                iconSize: [20, 20]
            });
        case "dam":
            return new L.Icon({
                iconUrl: "../../images/dam.png",
                iconSize: [25, 25]
            });
        case "water_tap":
            return new L.Icon({
                iconUrl: "../../images/tap_water.png",
                iconSize: [25, 25]
            });
        case "water_tower":
            return new L.Icon({
                iconUrl: "../../images/water_tower.png",
                iconSize: [25, 25]
            });
        case "water_well":
            return new L.Icon({
                iconUrl: "../../images/water_well.png",
                iconSize: [25, 25]
            });
        case "water_works":
            return new L.Icon({
                iconUrl: "../../images/water_works.png",
                iconSize: [25, 25]
            });
        case "wastewater_plant":
            return new L.Icon({
                iconUrl: "../../images/sewage.png",
                iconSize: [25, 25]
            });
        
    }
};


function getNewOverPassLayer(query){
    var splitQuery = query.split('=');
    var option;
    option = splitQuery[1].split(']')[0]; //gets the part before the ] but after the =
    //console.log(option);
    return new L.OverPassLayer({
                minZoom:  15,
                query: query,
                markerIcon: L.icon(option),
                id: "OverPassLayer",
                minZoomIndicatorOptions: {
                    position: 'bottomleft',
                    minZoomMessage: 'Current zoom: CURRENTZOOM - Data at: MINZOOMLEVEL'
                }
    });
}

var selectedObjects = [];

function mapObjectGetter(objectName){
    //console.log(selectedObjects);
    let query;
    switch(objectName){
        case "drinking_water":
            query = 'node [amenity=drinking_water][man_made!=water_tap]({{bbox}}); out;';
            break;
        case "fountain":
            query = 'node [amenity=fountain] ({{bbox}}); out;';
            break;
        case "fire_hydrant":
            query = 'node [emergency=fire_hydrant] ({{bbox}}); out;';
            break;
        case "dam":
            query = 'way[waterway=dam]({{bbox}}); foreach((._;>;);out 1;); node[waterway=dam]({{bbox}}); out;'
            break;
        case "tap_water":
            query = 'node[man_made=water_tap]({{bbox}}); out;';
            break;
        case "water_tower":
            query = 'way[man_made=water_tower]({{bbox}}); foreach((._;>;);out 1;); node[man_made=water_tower]({{bbox}}); out;';
            break;
        case "water_well":
            query = 'way[man_made=water_well]({{bbox}}); foreach((._;>;);out 1;); node[man_made=water_well]({{bbox}}); out;';
            break;
        case "water_works":
            query = 'way[man_made=water_works]({{bbox}}); foreach((._;>;);out 1;); node[man_made=water_works]({{bbox}}); out;';
            break;
        case "sewage_plant":
            query = 'way[man_made=wastewater_plant]({{bbox}}); foreach((._;>;);out 1;); node[man_made=wastewater_plant]({{bbox}}); out;';
            break;
        
    }
    return getNewOverPassLayer(query);
}

selectedObjects.push(mapObjectGetter("drinking_water"));
selectedObjects.push(mapObjectGetter("fountain"));
selectedObjects.push(mapObjectGetter("fire_hydrant"));
selectedObjects.push(mapObjectGetter("dam"));
selectedObjects.push(mapObjectGetter("tap_water"));
selectedObjects.push(mapObjectGetter("water_tower"));
selectedObjects.push(mapObjectGetter("water_well"));
selectedObjects.push(mapObjectGetter("water_works"));
selectedObjects.push(mapObjectGetter("sewage_plant"));
selectedObjects.forEach(object => osmMap2.addLayer(object));


function updateOverPassLayer(map){
    let whitelist = [];
    map.eachLayer(function(layer){
        //console.log(layer.options);
        if(layer.options.id === "OverPassLayer"){
            if(layer.options.minZoom > map.getZoom()){
                map.removeLayer(layer);
            }
            else{
                whitelist.push(layer.options.query);
            }
        }
        else if(15 > map.getZoom()){
            if(layer.options.icon != null){
                map.removeLayer(layer);
            }
        }
    });
    //console.log(whitelist);
    for(let i = 0; i < selectedObjects.length; i++){
        //console.log(selectedObjects[i]);
        if(selectedObjects[i].options.minZoom <= map.getZoom() && !whitelist.includes(selectedObjects[i].options.query)){
            map.addLayer(selectedObjects[i]);
            //markers.addLayers(selectedObjects[i].);
        }
    }
}

function removeOverpassLayer(map, removeLayer){
    map.eachLayer(function(layer){
        //console.log(layer.options);
        if(layer.options.id === "OverPassLayer" && layer.options.query == removeLayer.options.query){
            map.removeLayer(layer);
        }
    });
}

function changeChecked(element){
    if(element.checked){
        onCheck(element);
    }
    else{
        onUnchecked(element);
    }
}

function onCheck(element){
    selectedObjects.push(mapObjectGetter(element.id));
    updateOverPassLayer(osmMap2);
}

function onUnchecked(element){
    //console.log(selectedObjects);
    let idx;
    for(let i = 0; i < selectedObjects.length; i++){
        if(mapObjectGetter(element.id).options.query == selectedObjects[i].options.query){
            idx = i;
            break;
        }
    }
    selectedObjects.splice(idx,1);
    removeOverpassLayer(osmMap2,mapObjectGetter(element.id));
    //console.log(selectedObjects);
}

parent.addEventListener('updateMaps', function () {
    updateOverPassLayer(osmMap2);
});

osmMap2.on("move", function (e) {
    parent.setGlobalPosition(osmMap2.getCenter(),MAPNUMBER);
});
osmMap2.on("zoomend", function () {
    parent.setGlobalPositionFORCE(osmMap2.getCenter(),MAPNUMBER);
}); 

module.exports = {
    getNewOverPassLayer: getNewOverPassLayer,
    mapObjectGetter: mapObjectGetter
}