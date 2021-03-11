
function createChartControl(graphBox) {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control";

    let chartControlGroup = document.createElement("div");
    chartControlGroup.className = "btn-group";
    chartControlGroup.role = "group";

    let leftToggle = document.createElement("button");
    leftToggle.className = "btn btn-outline-dark";
    leftToggle.type = "button";
    leftToggle.innerText = "<";

    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.role = "group";
    chartDropdown.innerHTML =
        "<button type='button' class='btn btn-outline-dark dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>\
            Variable\
        </button>\
        <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>\
            <a class='dropdown-item' href='#'>Constraint 1</a>\
            <a class='dropdown-item' href='#'>Constraint 2</a>\
            <a class='dropdown-item' href='#'>Constraint 3</a>\
        </div>";

    let rightToggle = document.createElement("button");
    rightToggle.className = "btn btn-outline-dark";
    rightToggle.type = "button";
    rightToggle.innerText = ">";

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
