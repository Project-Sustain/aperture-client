import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintDate from "./ConstraintDate";
import ConstraintMultiSelect from "./ConstraintMultiSelect";

export default function IndividualConstraint(props) {
    if(props.constraint.type === "slider") {
        return (
            <Grid item className='individual-constraint'>
                {!props.constraint.isDate ?
                    <ConstraintSlider constraint={props.constraint} querier={props.querier} /> :
                    <ConstraintDate constraint={props.constraint} querier={props.querier} />
                }
            </Grid>
        );
    }

    else if(props.constraint.type === "multiselector") {
        return (
            <Grid item className='individual-constraint'>
                <Typography className='heading'>{props.constraint.label}</Typography>
                <ConstraintMultiSelect constraint={props.constraint} querier={props.querier}/>
            </Grid>
        );
    }
}
