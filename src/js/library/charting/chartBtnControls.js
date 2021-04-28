import Feature from "./feature"
import ControlDropdown from "./controlDropdown"
import FeatureDropdown from "./featureDropdown"
import { FeatureChartMessageType } from "./featureChartMessageType"
import { LineChartMessageType } from "./lineChartManager"
import { reduceTotalGraphs, checkNumberOfGraphs } from "./chartBtnCreateChart"

export function createChartControl(chart, graphBox, type) {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control row justify-content-md-center";
    let col1 = createEmptyColumn();
    let col2 = createEmptyColumn();
    let col3 = createEmptyColumn();
    col2.className = "col-sm-auto";
    
    let controls = getControlsForType(chart, type);
    for (let control of controls) {
        col2.appendChild(control.getDOMNode());
    }

    chart.addNewFeatureCallback(activeFeatures => {
        for (let control of controls) {
            control.setOptions(activeFeatures.map(feature => {
                return { 
                    name: Feature.getFriendlyName(feature),
                    onclick: () => {
                        chart.passMessage({ 
                            type: FeatureChartMessageType.SET_AXIS, 
                            axis: control.getLinkedAxis(), 
                            feature: feature,
                        });
                        window.setTimeout(chart.update, 100);
                    },
                };
            }));
        }
    });

    col3.appendChild(createCloseButton(graphBox));
    chartControl.appendChild(col1);
    chartControl.appendChild(col2);
    chartControl.appendChild(col3);
    return chartControl;
}

function getControlsForType(chart, type) {
    let controls = [];
    switch (type) {
         case 'scatterplot': {
            controls.push(new FeatureDropdown(chart, "X-Axis", 'x'));
            controls.push(new FeatureDropdown(chart, "Y-Axis", 'y'));
            break;
        } case 'histogram': {
            controls.push(new FeatureDropdown(chart, "Feature", 'x'));
            break;
        } case 'linegraph': {
            controls.push(new ControlDropdown(chart, "Feature"));
            controls[0].setOptions([{
                    name: "Cases",
                    onclick: () => {
                        chart.passMessage({
                            type: LineChartMessageType.CHANGE_PARAMETERS,
                            newType: 'cases',
                        });
                        chart.update();
                    },
                }, {
                    name: "Mortality",
                    onclick: () => {
                        chart.passMessage({
                            type: LineChartMessageType.CHANGE_PARAMETERS,
                            newType: 'deaths',
                        });
                        chart.update();
                    },
                },
            ]);
            break;
        }
    }
    return controls;
}

function createEmptyColumn() {
    let emptyCol = document.createElement("div");
    emptyCol.className = "col-sm";
    return emptyCol;
}

function createChartAxisControlGroup(chart, axis, dropdownTitle) {
    let chartControlButtonGroup = createChartControlButtonGroup();
    let leftToggle = createSideToggle(chart, axis, '<');
    let chartDropdown = createFeatureDropdown(chart, dropdownTitle, axis);
    let rightToggle = createSideToggle(chart, axis, '>');
    chartControlButtonGroup.appendChild(leftToggle);
    chartControlButtonGroup.appendChild(chartDropdown);
    chartControlButtonGroup.appendChild(rightToggle);
    return chartControlButtonGroup;
}

function createChartControlButtonGroup() {
    let chartControlButtonGroup = document.createElement("div");
    chartControlButtonGroup.className = "btn-group chart-control-button";
    chartControlButtonGroup.setAttribute("role", "group");
    return chartControlButtonGroup;
}


function createSideToggle(chart, axis, arrowDirection) {
    let sideToggle = document.createElement("button");
    sideToggle.className = "btn btn-outline-dark";
    sideToggle.type = "button";
    sideToggle.innerText = arrowDirection;
    sideToggle.onclick = arrowDirection === '<' ? 
        () => { chart.passMessage({ type: FeatureChartMessageType.CYCLE_AXIS, axis: axis, direction: 'previous' }); } : 
        () => { chart.passMessage({ type: FeatureChartMessageType.CYCLE_AXIS, axis: axis, direction: 'next'}); };
    return sideToggle;
}

function createDropdown(chart, title, axis) {
    let chartDropdown = createChartDropdown();
    let dropdownButton = createDropdownButton(title);
    let dropdownMenu = createDropdownMenu();

    chart.addNewFeatureCallback((activeFeatures) => {
        while(dropdownMenu.firstChild) {
            dropdownMenu.removeChild(dropdownMenu.firstChild);
        }
        activeFeatures.forEach(feature => {
            let dropdownItem = document.createElement("a");
            dropdownItem.className = "dropdown-item dropdown-menu-item-custom";
            dropdownItem.onclick = ()=> {
                chart.passMessage({ type: FeatureChartMessageType.SET_AXIS, axis: axis, feature: feature });
            }
            dropdownItem.innerText = Feature.getFriendlyName(feature);
            dropdownMenu.appendChild(dropdownItem);
        });
    });

    chartDropdown.appendChild(dropdownButton);
    chartDropdown.appendChild(dropdownMenu);

    $(function () {
        $('[data-toggle="dropdown"]').dropdown()
    })

    return chartDropdown;
}

function createChartDropdown() {
    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.setAttribute("role", "group");
    return chartDropdown;
}

function createDropdownButton(title) {
    let dropdownButton = document.createElement("button");
    dropdownButton.id = "drop-it-down";
    dropdownButton.type = "button";
    dropdownButton.className = "btn btn-outline-dark dropdown-toggle";
    dropdownButton.setAttribute("data-toggle", "dropdown");
    dropdownButton.setAttribute("aria-haspopup", "true");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.innerText = title;
    return dropdownButton;
}

function createDropdownMenu() {
    let dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.setAttribute("aria-labelledby", "drop-it-down");
    return dropdownMenu;
}

function createCloseButton(graphBox) {
    let resizableBox = document.getElementById("box1");

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-outline-dark chart-control-button-close";
    closeButton.addEventListener('click', function() {
        resizableBox.removeChild(graphBox);
        reduceTotalGraphs(1);
        checkNumberOfGraphs();
    });
    closeButton.innerText = "Close";
    return closeButton;
}
