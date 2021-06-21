import React from 'react';
import Layer from "./Layer";
import {componentIsRendering} from "../TabSystem";

function createWorkspace(workspace, layers, graphableLayers, layerTitles) {
    let workspaceLayers = [];
    workspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <div key={index} id={`layer-div-${index}`}>
                    <Layer layer={layers[index]} layerIndex={index} graphableLayers={graphableLayers} layerTitles={layerTitles} />
                </div>
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const workspaceLayers = createWorkspace(props.workspace, props.layers, props.graphableLayers, props.layerTitles);

    if(componentIsRendering) {console.log("|WorkspaceLayers Rerending|")}
    return (
        <div className='full-width'>
            {workspaceLayers}
        </div>
    );
}