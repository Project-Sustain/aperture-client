import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {layerTitles} from "../TabSystem";
import theme from "../global/GlobalTheme";
import {buildWorkspace} from "./LayerNavigationControl";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchBarSection(props) {
    return (
        <div>
            <Autocomplete
                multiple
                disableCloseOnSelect
                id="dataset-searchbar"
                options={layerTitles}
                onChange={(e, dataset) => {
                    props.setSelectedDatasets(dataset);
                }}
                renderOption={(option, state) => {
                    const selectDatasetIndex = props.selectedDatasets.findIndex(
                        dataset => dataset.toLowerCase() === "all"
                    );
                    if (selectDatasetIndex > -1) {
                        state.selected = true;
                    }
                    return (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                color="primary"
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={state.selected}
                            />
                            {option}
                        </React.Fragment>
                    );
                }}
                style={{ width: '100%', margin: theme.spacing(1) }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Browse Datasets..."
                    />
                )}
            />
        </div>
    );
}