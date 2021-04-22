import "./src/css/variables.css";
import "./src/css/darkModeSwitch.css";
import "./src/css/imageStyles.css";
import "./src/css/dataExploration.css";
import "./src/css/queries.css";
import "./src/css/modeling.css";
import "./src/css/charts.css";
import "./src/css/main.css";
import "./src/css/menuResizing.css";
import "./src/css/bootstrapOverrides.css";
import "./src/css/third-party/nouislider.min.css";
import "./src/css/third-party/bootstrap4-toggle.min.css";
import "./src/css/third-party/bootstrap.min.css";
import "./src/css/third-party/MarkerCluster.css";
import "./src/css/third-party/MarkerCluster.Default.css";
import "./src/css/third-party/chart.css";

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import ChartSystem from "./src/js/library/charting/chartSystem"
import ModelMenu from "./src/js/ui/modeling/components/ModelMenu";
import PreloadingMenu from "./src/js/ui/preloading-menu/components/PreloadingMenu"
import AutoQuery from "./src/js/library/autoQuery.js";
import RenderInfrastructure from "./src/js/library/renderInfrastructure.js";
import AutoMenu from "./src/js/library/autoMenu.js";
import MenuGenerator, { updateLayers } from "./src/js/ui/menuGenerator.js";
import DefensiveOptimization from "./src/js/ui/DefensiveOptimization";

//idek what to do with theses files, things break if I try to make them import specific things
import "./src/js/third-party/leaflet.markercluster.js";
require("./src/js/third-party/popper.min.js");
require("./src/js/third-party/bootstrap4-toggle.min.js");
require("bootstrap");
require("./src/js/library/smartQuerier.js");

const PAGE_URL = window.location.href;
const DEV = PAGE_URL.includes("localhost") || PAGE_URL.includes("127.0.0.1");
if (DEV && !localStorage.getItem("noDev")) {
    console.log("Aperture client set to DEV mode.")
    AutoQuery.minCountyZoom = 1;
    AutoQuery.minTractZoom = 1;
}

//--------------
const standardTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
});

const topoTiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
});

const satelliteTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
});

const baseMaps = {
    "Default": standardTiles,
    "Topography": topoTiles,
    "Satellite": satelliteTiles
};

const map = L.map('map2', {
    renderer: L.canvas(),
    minZoom: 3,
    fullscreenControl: true,
    inertia: false,
    timeDimension: false,
    zoomControl: false
});
window.map = map;
map.setView([40.573733, -105.086559], 11);

L.control.layers(baseMaps).addTo(map);
standardTiles.addTo(map);

const zoomControl = L.control.zoom({ position: "topright" }).addTo(map);

var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 55,
    animate: false
});
map.addLayer(markers);

const dataExplorationGroup = L.layerGroup().addTo(map);
const dataModelingGroup = L.layerGroup();
window.dataExplorationGroup = dataExplorationGroup;
window.dataModelingGroup = dataModelingGroup;

import Worker from "./src/js/library/geometryLoaderWorker.js"
const preloadStatusContainer = document.getElementById("preloadStatus");
let bgTractId = "bgTract";
let bgCountyId = "bgCounty";
const backgroundTract = new Worker();
const backgroundCounty = new Worker();
ReactDOM.render((<PreloadingMenu 
    loaders={[
        {
            id: bgTractId,
            loader: backgroundTract,
            collection: "tract_geo_140mb_no_2d_index"
        },
        {
            id: bgCountyId,
            loader: backgroundCounty,
            collection: "county_geo_30mb_no_2d_index"
        }
    ]}/>), 
preloadStatusContainer);
window.backgroundTract = backgroundTract;
window.backgroundCounty = backgroundCounty;

const overwrite = { //leaving this commented cause it explains the schema really well 
    // "covid_county": {
    //     "group": "Tract, County, & State Data",
    //     "subGroup": "County Level",
    //     "constraints": {
    //         date_range: {
    //             "type": "slider",
    //             "label": "Date Range",
    //             "range": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
    //             "default": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
    //             "step": 1000 * 60 * 60 * 24,
    //             "isDate": true
    //         }
    //     },
    //     "onConstraintChange": function (layer, constraintName, value) {
    //         console.log(layer + "-" + constraintName + "-");
    //         COVID.dateStart = Number(value[0]);
    //         COVID.dateEnd = Number(value[1]);
    //         COVID.changeFlag = true;
    //         COVID.makeQuery(map);
    //     },
    //     "onAdd": function () {
    //         COVID.allowRender = true;
    //     },
    //     "onRemove": function () {
    //         COVID.allowRender = false;
    //         COVID.clear();
    //     },
    //     "onUpdate": function () {
    //         COVID.makeQuery(map);
    //     },
    //     "noAutoQuery": true
    // },
}

window.renderInfrastructure = new RenderInfrastructure(map, markers, dataExplorationGroup, overwrite, {
    queryAlertText: document.getElementById('queryInfoText'),
    maxElements: 10000,
    maxLayers: 20,
    simplifyThreshold: 0.0001
});
window.chartSystem = new ChartSystem(map, "src/json/graphPriority.json", window.renderInfrastructure);

//where the magic happens
$.getJSON("src/json/menumetadata.json", async function (mdata) { //this isnt on the mongo server yet so query it locally
    const finalData = await AutoMenu.build(mdata, overwrite);
    MenuGenerator.generate(finalData, document.getElementById("sidebar-container"));
});

const modelContainer = document.getElementById("model-container");
ReactDOM.render((<ModelMenu/>), modelContainer);

const queryBlockContainer = document.getElementById("query-block-container");
ReactDOM.render((<DefensiveOptimization />), queryBlockContainer);

map.on("moveend", function (e) {
    updateLayers();
});

import {closeNav} from "./src/js/static/navButtons";
import "./src/js/static/darkMode.js";
import "./src/js/library/charting/chartBtnNewChartWindow.js";

map.on('click', function () {
    closeNav();
});

