import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {Button, Paper} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AdvancedConstraintCheckbox from "./AdvancedConstraintCheckbox";
import {componentIsRendering} from "../TabSystem";
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";

export default function AdvancedConstraints(props) {
    const [open, setOpen] = useState(false);

    if(componentIsRendering) {console.log("|AdvancedConstraints Rerending|")}
    return (
        <div>
            <Button variant="outlined" startIcon={<SettingsIcon/>} onClick={() => setOpen(true)}>
                Advanced...
            </Button>
            <Modal
                //FIXME According to https://material-ui.com/api/modal/ these should prevent the modal from 'focusing' but they don't
                // disableEnforceFocus={true}
                // disableAutoFocus={true}
                aria-labelledby="adv-constraints"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Grid
                    id="adv-constraints"
                    className='modal'
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item>
                        <Paper className='close-button-section' elevation={3}>
                            <Button
                                className='full-width'
                                startIcon={<CloseIcon/>}
                                variant="outlined"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={3} className='constraint-section'>
                            {props.allLayerConstraints.map((constraint, index) => {
                                return (
                                    <div key={index}>
                                        <AdvancedConstraintCheckbox activeLayerConstraints={props.activeLayerConstraints} setActiveLayerConstraints={props.setActiveLayerConstraints}
                                                                    constraintIndex={index} constraint={constraint}/>
                                    </div>)
                            })}
                        </Paper>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}