import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DESearchBar from './DESearchBar';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from "@material-ui/icons/Add";
import Util from "../../library/apertureUtil";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    cardSpace: {
        margin: theme.spacing(1),
    },
}));

export default function LayerNavigationControl(props) {
    const classes = useStyles();

    if(props.isWorkspace) {
        return (
            <div className={classes.root}>
                {/*<DESearchBar datasets={props.datasets} workspace={props.workspace} setWorkspace={props.setWorkspace} />*/}
                <DESearchBar isWorkspace={true} datasets={props.workspace} workspace={props.workspace} setWorkspace={props.setWorkspace} />
                <Grid container direction="row" justify="center" alignItems="center">
                    <ButtonGroup>
                        {/*<Button variant="outlined" startIcon={<AddIcon/>} onClick={() => props.setWorkspace(props.datasets)}>Add All Datasets</Button>*/}
                        <Button variant="outlined" onClick={() => {
                            props.setWorkspace([]);
                            const temp = new Array(19).fill(false);
                            props.setBooleanWorkspace(temp);
                        }} startIcon={<ClearIcon/>}>Clear Workspace</Button>
                        <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                        <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                    </ButtonGroup>
                </Grid>
            </div>
        )
    }

    else {
        return(
            <div className={classes.root}>
                <DESearchBar datasets={props.datasets} workspace={props.workspace} setWorkspace={props.setWorkspace} />
                <Grid container direction="row" justify="center" alignItems="center">
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                        props.setWorkspace(props.datasets);
                        const temp = new Array(19).fill(true);
                        props.setBooleanWorkspace(temp);
                    }}>Add All Datasets To Workspace</Button>
                </Grid>
            </div>
        )
    }

}