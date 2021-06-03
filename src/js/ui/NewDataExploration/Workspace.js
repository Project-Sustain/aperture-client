import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WorkspaceControls from "./WorkspaceControls";
import WorkspaceLayers from "./WorkspaceLayers";
import {prettifyJSON} from "./Helpers";
import AutoMenu from "../../library/autoMenu";
import {componentIsRendering} from "../TabSystem";
import Typography from "@material-ui/core/Typography";

function overwrite() {}
export const printHashes = false;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
    },
    centerText: {
        textAlign: 'center',
        fontSize: 25,
        margin: theme.spacing(2),
    },
}));

export default function Workspace() {
    const classes = useStyles();

    const [layers, setLayers] = useState([]);
    const [workspace, setWorkspace] = useState([]);
    const [openLayers, setOpenLayers] = useState([]);
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
        setOpenLayers(tempBoolean);
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
            const finalData = await AutoMenu.build(mdata, overwrite);
            extractLayers(finalData);
        });

        $.getJSON("src/json/graphPriority.json", async function (mdata) {
            const graphableLayers = await AutoMenu.build(mdata, overwrite);
            extractGraphableLayers(graphableLayers);
        });
    }, []);

    if(componentIsRendering) {console.log("|Workspace Rerending|")}
    return (
        <div className={classes.root}>
            <Typography className={classes.centerText}>Data Exploration</Typography>
            <WorkspaceControls layers={layers} graphableLayers={graphableLayers} layerTitles={layerTitles}
                               openLayers={openLayers} setOpenLayers={setOpenLayers}
                               workspace={workspace} setWorkspace={setWorkspace} />
            <WorkspaceLayers layers={layers} graphableLayers={graphableLayers} layerTitles={layerTitles}
                             openLayers={openLayers} setOpenLayers={setOpenLayers}
                             workspace={workspace} setWorkspace={setWorkspace} />
        </div>
    );
}