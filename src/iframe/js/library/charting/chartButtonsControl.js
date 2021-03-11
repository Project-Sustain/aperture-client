
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

    let leftToggle = createRightToggle();
    let chartDropdown = createDropdown();
    let rightToggle = createRightToggle();

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-outline-dark";
    closeButton.addEventListener('click', function() {
        box1.removeChild(graphBox);
        totalGraphs--;
        checkNumberOfGraphs();
    });
    closeButton.innerText = "Close";

    chartControlGroup.appendChild(leftToggle);
    chartControlGroup.appendChild(chartDropdown);
    chartControlGroup.appendChild(rightToggle);
    chartControlGroup.appendChild(closeButton);
    chartControl.appendChild(chartControlGroup);
    graphBox.appendChild(chartControl);

    return chartControl;
}

function chartControlFor2Vars(graphBox) {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control";

    let chartControlGroup = document.createElement("div");
    chartControlGroup.className = "btn-group";
    chartControlGroup.role = "group";

    let leftToggle = createLeftToggle();
    let chartDropdown = createDropdown();
    let rightToggle = createRightToggle();

    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-outline-dark";
    closeButton.addEventListener('click', function() {
        box1.removeChild(graphBox);
        totalGraphs--;
        checkNumberOfGraphs();
    });
    closeButton.innerText = "Close";

    chartControlGroup.appendChild(leftToggle);
    chartControlGroup.appendChild(chartDropdown);
    chartControlGroup.appendChild(rightToggle);
    chartControlGroup.appendChild(closeButton);
    chartControl.appendChild(chartControlGroup);
    graphBox.appendChild(chartControl);

    return chartControl;
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

function createDropdown() {
    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.role = "group";
    chartDropdown.innerHTML =
        "<button type='button' class='btn btn-outline-dark dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>\
            x-axis\
        </button>\
        <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>\
            <a class='dropdown-item' href='#'>Constraint 1</a>\
            <a class='dropdown-item' href='#'>Constraint 2</a>\
            <a class='dropdown-item' href='#'>Constraint 3</a>\
        </div>";
    return chartDropdown;
}
