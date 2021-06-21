import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {componentIsRendering} from "../TabSystem";

export default function ConstraintSlider({constraint, querier}) {
    const min = constraint.range[0];
    const max = constraint.range[1];
    const step = constraint.step ? constraint.step : 1;
    const [minMax, setMinMax] = useState([min, max]);
    const [minMaxCommited, setMinMaxCommited] = useState([min, max]);
    
    useEffect(() => {
        querier.updateConstraint(constraint.name, minMaxCommited);
    }, [minMaxCommited]);

    useEffect(() => {
        querier.constraintSetActive(constraint.name, true);
        return () => {
            querier.constraintSetActive(constraint.name, false);
        }
    }, []);

    if(componentIsRendering) {console.log("|ContraintSlider Rerending|")}
    return (
        <div className='full-width' id={`constraint-div-${constraint.label}`}>
            <Typography className='center-text' id={`range-slider-${constraint.label}`} gutterBottom>
                {constraint.label} &nbsp;
                <span className='no-wrap'>{minMax[0]} - {minMax[1]}</span>
            </Typography>
            <Slider
                value={minMax}
                onChange={(event, newValue) => setMinMax(newValue)}
                onChangeCommitted={(event, newValue) => setMinMaxCommited(newValue)}
                aria-labelledby={`range-slider-${constraint.label}`}
                min={min}
                max={max}
                step={step}
                id={`${constraint.label}`}
                name={`${constraint.label}`}
            />
        </div>
    );
}