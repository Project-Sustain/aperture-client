import React, { useState, useEffect } from 'react';
import { ChartingType, DataSourceType } from '../../library/charting/chartSystem';
import ChartFrameComponent from "./ChartFrameComponent";
import Histogram from "./Histogram";

export default function Frame(props) {
    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);

    let frame;
    switch (props.type.name) {
        case "histogram":
           frame = <Histogram size={props.size}></Histogram>; break;
        default: break;
    }

    return (
        <div style={{
            width: "100%",
            height: props.size.height - 50,
            border: "1px solid red"
        }}>
            {frame}
        </div>
    );
}
