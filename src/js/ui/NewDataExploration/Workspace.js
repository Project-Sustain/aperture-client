import React, {useEffect, useState} from 'react';
import WorkspaceControls from "./WorkspaceControls";
import WorkspaceLayers from "./WorkspaceLayers";
import AutoMenu from "../../library/autoMenu";
import {componentIsRendering} from "../TabSystem";
import Query from "../../library/Query";
import Util from "../../library/apertureUtil";
import Grid from "@material-ui/core/Grid";

function prettifyJSON(name) {
    return Util.capitalizeString(Util.underScoreToSpace(name));
}

export default function Workspace() {

    const [layers, setLayers] = useState([]);
    const [workspace, setWorkspace] = useState([]);
    const [layerTitles, setLayerTitles] = useState([]);
    function extractLayers(data) {
        let tempBoolean = [];
        let tempLayers = [];
        let tempLayerTitles = [];
        for(const layer in data) {
            const thisLayer = data[layer];
            tempLayers.push(data[layer]);
            const layerName = thisLayer?.label ?? prettifyJSON(thisLayer.collection);
            tempLayerTitles.push(layerName);
            tempBoolean.push(false);
        }
        setLayers(tempLayers);
        setWorkspace(tempBoolean);
        setLayerTitles(tempLayerTitles);
    }

    const [graphableLayers, setGraphableLayers] = useState([]);
    function extractGraphableLayers(data) {
        let tempGraphableLayers = [];
        for (const layer in data) {
            const thisLayer = data[layer];
            const layerName = thisLayer.collection;
            tempGraphableLayers.push(layerName);
        }
        setGraphableLayers(tempGraphableLayers);
    }

    useEffect(() => {
        $.getJSON("src/json/menumetadata.json", async function (mdata) {
            const finalData = await AutoMenu.build(mdata, () => {});
            Query.init(finalData);
            extractLayers(finalData);
        });

        $.getJSON("src/json/graphPriority.json", async function (mdata) {
            const graphableLayers = await AutoMenu.build(mdata, () => {});
            extractGraphableLayers(graphableLayers);
        });
    }, []);

    if(componentIsRendering) {console.log("|Workspace Rerending|")}
    return (
        <Grid
            className='workspace'
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item className='workspace'>
                <WorkspaceControls layers={layers} graphableLayers={graphableLayers} layerTitles={layerTitles}
                                   workspace={workspace} setWorkspace={setWorkspace} />
            </Grid>
            <Grid item className='workspace'>
                <WorkspaceLayers layers={layers} graphableLayers={graphableLayers} layerTitles={layerTitles} workspace={workspace} />
            </Grid>
        </Grid>
    );
}