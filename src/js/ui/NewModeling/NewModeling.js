import React from 'react';
import {componentIsRendering} from "../TabSystem"
import Typography from "@material-ui/core/Typography";

import {makeStyles} from "@material-ui/core/styles";

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
export default function NewModeling() {
    const classes = useStyles();

    if(componentIsRendering) console.log("|NewModeling|");
    return (
        <Typography className={classes.centerText}>Modeling</Typography>
    )
}