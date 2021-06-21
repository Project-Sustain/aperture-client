import React from 'react';
import {Button, ButtonGroup, Grid, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import WorkspaceSearchbar from "./WorkspaceSearchbar";
import {componentIsRendering} from "../TabSystem";

export default function WorkspaceControls(props) {

    if(componentIsRendering) {console.log("|WorkspaceControls Rerending|")}
    return (
        <Paper className='workspace-controls' elevation={3}>
            <Grid container direction="row" justify="center" alignItems="center">
                <ButtonGroup className='workspace-control-buttons'>
                    <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                    <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                </ButtonGroup>
            </Grid>
            <WorkspaceSearchbar layers={props.layers} graphableLayers={props.graphableLayers} layerTitles={props.layerTitles}
                                workspace={props.workspace} setWorkspace={props.setWorkspace} />
        </Paper>
    )
}