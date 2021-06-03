import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {componentIsRendering} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, workspace, layerTitles, activeConstraints, setActiveConstraints) {
    let workspaceLayers = [];
    workspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <div key={index} id={`layer-div-${index}`}>
                    <Layer layer={layers[index]} layerIndex={index} graphableLayers={graphableLayers} layerTitles={layerTitles}
                           openLayers={openLayers} setOpenLayers={setOpenLayers}
                           activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
                </div>
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.layers, props.graphableLayers, props.openLayers, props.setOpenLayers,
                                                                props.workspace, props.layerTitles, props.activeConstraints, props.setActiveConstraints);

    if(componentIsRendering) {console.log("|WorkspaceLayers Rerending|")}
    return (
        <div className={classes.root}>
            {workspaceLayers}
        </div>
    );
}