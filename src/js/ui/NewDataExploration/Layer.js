import React, {useState, useEffect} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {componentIsRendering} from "../TabSystem";
import AutoQuery from '../../library/autoQuery';
import IndividualConstraint from "./IndividualConstraint"

function extractLayerConstraints(layer) {
    let defaultLayerConstraints = [];
    let allLayerConstraints = [];
    for(const constraint in layer.constraints) {
        defaultLayerConstraints.push(!layer.constraints[constraint].hide);
        layer.constraints[constraint].label = layer.constraints[constraint]?.label ?? constraint;
        layer.constraints[constraint].name = constraint;
        allLayerConstraints.push(layer.constraints[constraint]);
    }
    return [defaultLayerConstraints, allLayerConstraints];
}

function createConstraints(activeLayerConstraints, allLayerConstraints, querier) {
    let constraints = [];
    activeLayerConstraints.forEach((constraint, index) => {
        if(constraint) {
            constraints.push(
                <div key={index}>
                    <Paper elevation={3}>
                        <IndividualConstraint constraint={allLayerConstraints[index]} querier={querier} />
                    </Paper>
                </div>
            );
        }
    });
    return constraints;
}

export default function Layer(props) {
    const [check, setCheck] = useState(false);
    const [layerExpanded, setLayerExpanded] = useState(false);

    const [defaultLayerConstraints, allLayerConstraints] = extractLayerConstraints(props.layer);
    const [activeLayerConstraints, setActiveLayerConstraints] = useState(defaultLayerConstraints);

    const [ querier ] = useState(new AutoQuery(props.layer));

    useEffect(() => {
        return () => {
            querier.onRemove();
        }
    }, [querier]);

    const constraints = createConstraints(activeLayerConstraints, allLayerConstraints, querier);

    if(componentIsRendering) console.log("|Layer|");
    return (
        <div className='layer'>
            <Paper elevation={3}>
                <Accordion
                    color="primary"
                    expanded={layerExpanded}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" />}
                        onClick={() => setLayerExpanded(!layerExpanded)}
                    >
                        <FormControlLabel
                            aria-label="CheckLayer"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            onChange={() => { 
                                setCheck(!check)
                                !check && querier.onAdd();
                                !check || querier.onRemove();
                            }}
                            control={
                                <Switch
                                        color="primary"
                                />
                            }
                            label={props.layerTitles[props.layerIndex]}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column">
                            <Grid item>
                                <LayerControls layer={props.layer} graphableLayers={props.graphableLayers}
                                               allLayerConstraints={allLayerConstraints} defaultLayerConstraints={defaultLayerConstraints}
                                               activeLayerConstraints={activeLayerConstraints} setActiveLayerConstraints={setActiveLayerConstraints}
                                               layerIndex={props.layerIndex} />
                            </Grid>
                            {constraints}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </div>
    );
}