import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {componentIsRendering} from "../TabSystem";
import { DatePicker } from '@material-ui/pickers'
import Grid from "@material-ui/core/Grid";

const configs = {
    year: {
        views: ["year"]
    },
    day: {
        views: ["year", "month", "day"],
        format: "MM/DD/yyyy"
    }
}

const epochToDate = (epoch) => {
    const refrenceTime = new Date(epoch);
    return new Date(epoch + refrenceTime.getTimezoneOffset() * 60000);
}

const dateToEpoch = (date) => {
    return date.valueOf() - date.getTimezoneOffset() * 60000;
}

export default function ConstraintDate({constraint, querier}) {
    const min = constraint.range[0];
    const max = constraint.range[1];
    const [minMaxDate, setMinMaxDate] = useState([epochToDate(min), epochToDate(max)]);
    const config = configs[constraint.step];


    useEffect(() => {
        const minMaxCommited = [dateToEpoch(minMaxDate[0]), dateToEpoch(minMaxDate[1])]
        querier.updateConstraint(constraint.name, minMaxCommited);
    }, [minMaxDate]);

    useEffect(() => {
        querier.constraintSetActive(constraint.name, true);
        return () => {
            querier.constraintSetActive(constraint.name, false);
        }
    }, []);

    if(componentIsRendering) {console.log("|ContraintSlider Rerending|")}
    return (
        <div className='full-width' id={`constraint-div-${constraint.label}`}>
            {/*<Grid container direction="row" justify="center" alignItems="center">*/}
            {/*    <Grid item>*/}
            {/*        <Typography className='center-text' id={`date-picker-${constraint.label}`} gutterBottom>*/}
            {/*            /!*<strong>{constraint.label}:</strong> &nbsp;*!/*/}
            {/*            <span className='no-wrap'>{minMaxDate[0].toDateString()} - {minMaxDate[1].toDateString()}</span>*/}
            {/*        </Typography>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            {/*<Grid container direction="row" justify="center" alignItems="center">*/}
            {/*    <Grid item className='half-width'>*/}
            {/*        <DatePicker*/}
            {/*            className='three-quarter-width'*/}
            {/*            {...config}*/}
            {/*            label="Min Date"*/}
            {/*            value={minMaxDate[0]}*/}
            {/*            minDate={epochToDate(min)}*/}
            {/*            maxDate={minMaxDate[1]}*/}
            {/*            onChange={(e) => {*/}
            {/*                setMinMaxDate([new Date(e.valueOf()), minMaxDate[1]])*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </Grid>*/}
            {/*    <Grid item className='half-width'>*/}
            {/*        <DatePicker*/}
            {/*            className='three-quarter-width'*/}
            {/*            {...config}*/}
            {/*            label="Max Date"*/}
            {/*            value={minMaxDate[1]}*/}
            {/*            minDate={minMaxDate[0]}*/}
            {/*            maxDate={epochToDate(max)}*/}
            {/*            onChange={(e) => {*/}
            {/*                setMinMaxDate([minMaxDate[0], new Date(e.valueOf())])*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
         </div>
    );
}