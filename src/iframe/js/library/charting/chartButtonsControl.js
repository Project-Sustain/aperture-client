let box1 = document.getElementById("box1");

function createChartControl(graphBox, type) {
    if(type == 'scatterplot') {
        return chartControlFor2Vars(graphBox);
    }
    else if (type == 'histogram' || type == 'linegraph'){
        return chartControlFor1Var(graphBox);
    }
}

function chartControlFor1Var(graphBox) {
    let chartControl = createChartControlArea();
    chartControl.appendChild(createChartControlGroup("Constraint"));
    chartControl.appendChild(createCloseButton(graphBox));
    graphBox.appendChild(chartControl);
    return chartControl;
}

function chartControlFor2Vars(graphBox) {
    let chartControl = createChartControlArea();
    chartControl.appendChild(createChartControlGroup("X-Axis"));
    chartControl.appendChild(createChartControlGroup("Y-Axis"));
    chartControl.appendChild(createCloseButton(graphBox));
    graphBox.appendChild(chartControl);
    return chartControl;
}

function createChartControlArea() {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control";
    return chartControl;
}

function createChartControlGroup(dropdownTitle) {
    let chartControlGroup = document.createElement("div");
    chartControlGroup.className = "btn-group chart-control-button";
    chartControlGroup.role = "group";
    let leftToggle = createSideToggle("<");
    let chartDropdown = createDropdown(dropdownTitle);
    let rightToggle = createSideToggle(">");
    chartControlGroup.appendChild(leftToggle);
    chartControlGroup.appendChild(chartDropdown);
    chartControlGroup.appendChild(rightToggle);
    return chartControlGroup;
}

function createCloseButton(graphBox) {
    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-outline-dark chart-control-button-close";
    closeButton.addEventListener('click', function() {
        box1.removeChild(graphBox);
        totalGraphs--;
        checkNumberOfGraphs();
    });
    closeButton.innerText = "Close";
    return closeButton;
}

function createSideToggle(arrowDirection) {
    let sideToggle = document.createElement("button");
    sideToggle.className = "btn btn-outline-dark";
    sideToggle.type = "button";
    sideToggle.innerText = arrowDirection;
    return sideToggle;
}

function createDropdown(title) {
    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.setAttribute("role", "group");

    let dropdownButton = document.createElement("button");
    dropdownButton.id = "drop-it-down";
    dropdownButton.type = "button";
    dropdownButton.className = "btn btn-outline-dark dropdown-toggle";
    dropdownButton.setAttribute("data-toggle", "dropdown");
    dropdownButton.setAttribute("aria-haspopup", "true");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.innerText = title;

    let dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.setAttribute("aria-labelledby", "drop-it-down");

    for(let i = 0; i < 3; i++) {
        let dropdownItem = document.createElement("a");
        dropdownItem.className = "dropdown-item";
        dropdownItem.href = "#";
        dropdownItem.innerText = "Constraint " + i;
        dropdownMenu.appendChild(dropdownItem);
    }

    chartDropdown.appendChild(dropdownButton);
    chartDropdown.appendChild(dropdownMenu);

    return chartDropdown;
}
