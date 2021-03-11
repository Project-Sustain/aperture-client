let box1 = document.getElementById("box1");

function createChartControl(graphBox, type) {
    if(type == 'scatterplot') {
        return chartControlFor2Vars(graphBox);
    }
    else {
        return chartControlFor1Var(graphBox);
    }
}

function chartControlFor1Var(graphBox) {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control";

    let chartControlGroup = document.createElement("div");
    chartControlGroup.className = "btn-group";
    chartControlGroup.role = "group";

    let leftToggle = createLeftToggle();
    let chartDropdown = createDropdown("Constraint");
    let rightToggle = createRightToggle();

    let closeButton = createCloseButton(graphBox);

    chartControlGroup.appendChild(leftToggle);
    chartControlGroup.appendChild(chartDropdown);
    chartControlGroup.appendChild(rightToggle);
    chartControl.appendChild(chartControlGroup);
    chartControl.appendChild(closeButton);
    graphBox.appendChild(chartControl);

    return chartControl;
}

function chartControlFor2Vars(graphBox) {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control";

    let chartControlGroup = document.createElement("div");
    chartControlGroup.className = "btn-group";
    chartControlGroup.role = "group";

    let chartControlGroup2 = document.createElement("div");
    chartControlGroup2.className = "btn-group";
    chartControlGroup2.role = "group";

    let leftToggle = createLeftToggle();
    let chartDropdown = createDropdown("X-Axis");
    let rightToggle = createRightToggle();

    let leftToggle2 = createLeftToggle();
    let chartDropdown2 = createDropdown("Y-Axis");
    let rightToggle2 = createRightToggle();

    let closeButton = createCloseButton(graphBox);

    chartControlGroup.appendChild(leftToggle);
    chartControlGroup.appendChild(chartDropdown);
    chartControlGroup.appendChild(rightToggle);

    chartControlGroup2.appendChild(leftToggle2);
    chartControlGroup2.appendChild(chartDropdown2);
    chartControlGroup2.appendChild(rightToggle2);

    chartControl.appendChild(chartControlGroup);
    chartControl.appendChild(chartControlGroup2);
    chartControl.appendChild(closeButton);
    graphBox.appendChild(chartControl);

    return chartControl;
}

function createCloseButton(graphBox) {
    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-outline-dark";
    closeButton.addEventListener('click', function() {
        box1.removeChild(graphBox);
        totalGraphs--;
        checkNumberOfGraphs();
    });
    closeButton.innerText = "Close";
    return closeButton;
}

function createRightToggle() {
    let rightToggle = document.createElement("button");
    rightToggle.className = "btn btn-outline-dark";
    rightToggle.type = "button";
    rightToggle.innerText = ">";
    return rightToggle;
}
function createLeftToggle() {
    let leftToggle = document.createElement("button");
    leftToggle.className = "btn btn-outline-dark";
    leftToggle.type = "button";
    leftToggle.innerText = "<";
    return leftToggle;
}

function createDropdown(title) {
    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.role = "group";
    let firstPart = "<button type='button' class='btn btn-outline-dark dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> ";
    let namePart = title;
    let lastPart = " </button> <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>\
            <a class='dropdown-item' href='#'>Constraint 1</a>\
            <a class='dropdown-item' href='#'>Constraint 2</a>\
            <a class='dropdown-item' href='#'>Constraint 3</a>\
        </div>";
    chartDropdown.innerHTML = firstPart + namePart + lastPart;
    return chartDropdown;
}
