import React from 'react';
import {Button, ButtonGroup, Paper, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TuneIcon from '@material-ui/icons/Tune';
import AdvancedConstraints from "./AdvancedConstraints";
import {componentIsRendering} from "../TabSystem";
import {isGraphable} from "./Helpers";
import Grid from "@material-ui/core/Grid";

function graphIcon(layer, graphableLayers) {
    if(isGraphable(layer, graphableLayers)) {
        return <Button startIcon={<EqualizerIcon />}>
            Graph Me
        </Button>
    }
    return;
}

function getLayerText(layerInfo) {
    if(layerInfo) {
        return (
            <Grid item>
                <Typography>{layerInfo}</Typography>
                <br/>
            </Grid>
        )
    }
}

export default function LayerControls(props) {
    if(componentIsRendering) {console.log("|LayerControls Rerending|")}
    return (
        <Paper elevation={3} className='layer-controls'>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {getLayerText(props.layer.info)}
                <Grid item>
                    <ButtonGroup variant="outlined">
                        <AdvancedConstraints allLayerConstraints={props.allLayerConstraints} layerIndex={props.layerIndex}
                                             activeLayerConstraints={props.activeLayerConstraints} setActiveLayerConstraints={props.setActiveLayerConstraints} />
                        <Button startIcon={<RotateLeftIcon />}>
                            Reset Constraints
                        </Button>
                        <Button startIcon={<TuneIcon />} onClick={() => {
                            props.setActiveLayerConstraints(props.defaultLayerConstraints);
                        }}>
                            Default Constraints
                        </Button>
                        {graphIcon(props.layer, props.graphableLayers)}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Paper>
    )
}