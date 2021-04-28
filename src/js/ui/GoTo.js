import React, { Component, useEffect, useRef, useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import L from 'leaflet';
import $ from "jquery";

function goToLocation(pos, map) {
    map.flyTo({
        lat: pos.latitude,
        lng: pos.longitude
    });
}

const GEOCODING_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=pjson&outFields=Addr_type&forStorage=false&SingleLine=";
async function geocode(search) {
    return new Promise(resolve => {
        fetch(`${GEOCODING_URL}${search}`)
            .then((response) => {
                resolve(response.json());
            })
    });
}

let prevSearch = null;
let prevMapLoc = null;
async function search(searchFor, map) {
    const mapCenter = JSON.stringify(map.getCenter());
    if (searchFor.length && (searchFor !== prevSearch || mapCenter !== prevMapLoc)) {
        prevSearch = searchFor;
        const addrRes = await geocode(searchFor);
        const { xmin, xmax, ymin, ymax } = addrRes?.candidates[0]?.extent;
        xmin && map.flyToBounds(L.latLngBounds(L.latLng(ymin, xmin), L.latLng(ymax, xmax)));
        prevMapLoc = mapCenter;
    }
}

async function goHome() {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(pos => {
            goToLocation(pos.coords, map)
            resolve(true)
        },
            err => {
                resolve(false)
            });
    });
}

function renderGoHome(locationPerms) {
    if (locationPerms) {
        return <Button outline color="white" className="currentLocationButton" onClick={goHome}>
            🏠
        </Button>;
    }
}

export default function SearchLocation(props) {
    const locationSearchRef = useRef(null);
    const [locationPerms, setLocationPerms] = useState(false);
    useEffect(() => {
        goHome().then(res => { 
            setLocationPerms(res);
            if(!res){
                $(".leaflet-top.leaflet-right").css({ top: '49px' });
            }
         })
    }, []);
    return <div>
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <Button onClick={() => { search(locationSearchRef.current.value, props.map) }}>
                    🔍
                </Button>
            </InputGroupAddon>
            <Input 
                innerRef={locationSearchRef} 
                placeholder="Search for a location..." 
                onKeyPress={(e) => e.key === 'Enter' && search(locationSearchRef.current.value, props.map)} 
            />
        </InputGroup>
        {renderGoHome(locationPerms)}
    </div>;
}