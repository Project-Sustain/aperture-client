import React, { Component, useEffect, useState } from 'react';
import { Button, NavLink} from 'reactstrap';
import currentLocationIcon from '../../../images/current-location.png';

function goToLocation(pos, map) {
    map.flyTo({
        lat: pos.latitude,
        lng: pos.longitude
    });
}

export default function CurrentLocation(props) {
    return <Button color="link" className={"currentLocationButton"} onClick={() => {
        navigator.geolocation.getCurrentPosition(pos => { goToLocation(pos.coords, props.map) }, err => { console.error(err) });
    }}>
        <img src={currentLocationIcon} className={"icon"} />
    </Button>;
}