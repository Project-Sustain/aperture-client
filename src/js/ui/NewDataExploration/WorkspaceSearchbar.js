import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import IconButton from "@material-ui/core/IconButton";
import {componentIsRendering} from "../TabSystem";
import {isGraphable} from "./Helpers";
import {Tooltip} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';

const icon = <CheckBoxOutlineBlankIcon color="primary" fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

function findLayerIndex(layerLabel, layerTitles) {
    for(let i = 0; i < layerTitles.length; i++) {
        if(layerTitles[i] === layerLabel) {
            return i;
        }
    }
}

// const CustomTooltip = withStyles((theme) => ({
//     tooltip: {
//         fontSize: 14,
//     },
// }))(Tooltip);

function graphIcon(layer, graphableLayers) {
    if(isGraphable(layer, graphableLayers)) {
        // return <CustomTooltip title="This dataset can be graphed" placement="right" arrow><IconButton><EqualizerIcon color="primary" /></IconButton></CustomTooltip>
        return <Tooltip title="This dataset can be graphed" placement="right" arrow><IconButton><EqualizerIcon color="primary" /></IconButton></Tooltip>
    }
}

function infoIcon(layerInfo) {
    if(layerInfo) {
        // return <CustomTooltip title={layerInfo} placement="right" arrow><IconButton><InfoIcon color="primary" /></IconButton></CustomTooltip>
        return <Tooltip title={layerInfo} placement="right" arrow><IconButton><InfoIcon color="primary" /></IconButton></Tooltip>
    }
}

function updateWorkspace(workspace, index) {
    let newWorkspace = [...workspace];
    newWorkspace[index] = !newWorkspace[index];
    return newWorkspace;
}

function clearWorkspace(length) {
    return new Array(length).fill(false);
}

let oldLayers = [];

export default function WorkspaceSearchbar(props) {

    if(componentIsRendering) {console.log("|WorkspaceSearchbar Rerending|")}
    return (
        <div>
            <Autocomplete
                className='float-right'
                multiple
                disableCloseOnSelect
                id="dataset-searchbar"
                options={props.layerTitles}
                onChange={(e, layers) => {
                    if(layers.length > oldLayers.length) {
                        const indexOfAddedLayer = findLayerIndex(layers[layers.length - 1], props.layerTitles);
                        props.setWorkspace(updateWorkspace(props.workspace, indexOfAddedLayer));
                    }
                    else if(layers.length === 0) {
                        oldLayers = [];
                        props.setWorkspace(clearWorkspace(props.workspace.length));
                    }
                    else if(layers.length < oldLayers.length) {
                        let setOfLayers = new Set(layers);
                        const removedLayer = oldLayers.filter(x => !setOfLayers.has(x));
                        const indexOfRemovedLayer = findLayerIndex(removedLayer[0], props.layerTitles);
                        props.setWorkspace(updateWorkspace(props.workspace, indexOfRemovedLayer));
                    }
                    oldLayers = layers;
                }}
                renderOption={(option, state) => {
                    const optionIndex = findLayerIndex({option}.option, props.layerTitles);
                    return (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                color="primary"
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={props.workspace[optionIndex]}
                            />
                            {option}
                            <span className='float-right'>{graphIcon(props.layers[optionIndex], props.graphableLayers)}</span>
                            <span className='float-right'>{infoIcon(props.layers[optionIndex].info)}</span>
                        </React.Fragment>
                    );
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Explore Datasets..."
                    />
                )}
            />
        </div>
    );
}