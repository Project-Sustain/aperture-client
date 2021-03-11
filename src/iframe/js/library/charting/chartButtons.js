const chartSystem = new ChartSystem(map, "json/graphPriority.json");
document.getElementById('nav-graph-button').addEventListener('click', showGraph);
let buttonsOn = false;
let maxGraphs = 4;
let totalGraphs = 0;
let maxGraphsReached = false;

function showGraph() {
	chartSystem.toggleVisible();
	if(!buttonsOn) {
		createAddChartArea();
		makeButtonsWork();
		buttonsOn = true;
	}
}

function createAddChartArea() {
	let addGraphBox = document.createElement("div");
	addGraphBox.className = "colorMode1 customBorder add-graph-box";
	addGraphBox.id = "graph-controller";
	let addGraphMessage = document.createElement("p");
	addGraphMessage.className = "add-graph-message";
	addGraphMessage.innerText = "Add a...";

	let graphButtonArea = document.createElement("div");
	graphButtonArea.id = "graph-button-area"
	let histogramButton = document.createElement("button");
	histogramButton.className = "btn btn-outline-dark graph-button";
	histogramButton.id = "histogram-button-id";
	histogramButton.innerText = "Histogram";
	let scatterplotButton = document.createElement("button");
	scatterplotButton.className = "btn btn-outline-dark graph-button";
	scatterplotButton.id = "scatterplot-button-id";
	scatterplotButton.innerText = "Scatterplot";
	let lineGraphButton = document.createElement("button");
	lineGraphButton.className = "btn btn-outline-dark graph-button";
	lineGraphButton.id = "linegraph-button-id";
	lineGraphButton.innerText = "Line Graph";

	graphButtonArea.appendChild(histogramButton);
	graphButtonArea.appendChild(scatterplotButton);
	graphButtonArea.appendChild(lineGraphButton);

	addGraphBox.appendChild(addGraphMessage);
	addGraphBox.appendChild(graphButtonArea);
	document.getElementById('box1').appendChild(addGraphBox);
}

function makeButtonsWork() {
	document.getElementById('histogram-button-id').addEventListener('click', createHistogram);
	document.getElementById('scatterplot-button-id').addEventListener('click', createScatterplot);
	document.getElementById('linegraph-button-id').addEventListener('click', createLinegraph);
}

function createHistogram() {
	moreGraphsPossible();
	let box1 = document.getElementById("box1");

	let graphBox = document.createElement("div");
	graphBox.className = "colorMode1 customBorder temp-chart-box";
	graphBox.appendChild(createChartControl(graphBox));

	let chart = chartSystem.getChartFrame(ChartingType.HISTOGRAM);
	graphBox.appendChild(chart.getDOMNode());

    /* Some things that are currently in the catalog:
        0: "temp"
        1: "RPL_THEMES"  // SVI
                         // note: the chart system is stupid and can't tell
                         // the difference between county and tract level SVI
                         // at the moment, so this is only county SVI
                         // /shrug
        2: "2010_median_household_income"
        3: "median_age_total"
        4: "median_age_female"
        5: "median_age_male"
        6: "2010_total_population"
        7: "avgAQI"
     */
    chart.changeFeature("2010_median_household_income");
	box1.appendChild(graphBox);
}

function createScatterplot() {
	moreGraphsPossible();
	let box1 = document.getElementById("box1");

	let graphBox = document.createElement("div");
	graphBox.className = "colorMode1 customBorder temp-chart-box";
	graphBox.appendChild(createChartControl(graphBox));

	let chart = chartSystem.getChartFrame(ChartingType.SCATTERPLOT);
	graphBox.appendChild(chart.getDOMNode());
	box1.appendChild(graphBox);

}

function createLinegraph() {
	moreGraphsPossible();
	let box1 = document.getElementById("box1");

	let graphBox = document.createElement("div");
	graphBox.className = "colorMode1 customBorder temp-chart-box";
  	graphBox.appendChild(createChartControl(graphBox));

  	let chart = chartSystem.getChartFrame(ChartingType.LINEGRAPH);
	graphBox.appendChild(chart.getDOMNode());
	box1.appendChild(graphBox);
}

// function createChartControl(graphBox) {
// 	let chartControl = document.createElement("div");
// 	chartControl.className = "chart-control";
//
// 	let chartControlGroup = document.createElement("div");
// 	chartControlGroup.className = "btn-group";
// 	chartControlGroup.role = "group";
//
// 	let leftToggle = document.createElement("button");
// 	leftToggle.className = "btn btn-outline-dark";
// 	leftToggle.type = "button";
// 	leftToggle.innerText = "<";
//
// 	let chartDropdown = document.createElement("div");
// 	chartDropdown.className = "btn-group";
// 	chartDropdown.role = "group";
// 	chartDropdown.innerHTML =
// 		"<button type='button' class='btn btn-outline-dark dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>\
// 			Variable\
// 		</button>\
// 		<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>\
// 			<a class='dropdown-item' href='#'>Constraint 1</a>\
// 			<a class='dropdown-item' href='#'>Constraint 2</a>\
// 			<a class='dropdown-item' href='#'>Constraint 3</a>\
// 		</div>";
//
// 	let rightToggle = document.createElement("button");
// 	rightToggle.className = "btn btn-outline-dark";
// 	rightToggle.type = "button";
// 	rightToggle.innerText = ">";
//
// 	let closeButton = document.createElement("button");
// 	closeButton.type = "button";
// 	closeButton.className = "btn btn-outline-dark";
// 	closeButton.addEventListener('click', function() {
// 		box1.removeChild(graphBox);
// 		totalGraphs--;
// 		checkNumberOfGraphs();
// 	});
// 	closeButton.innerText = "Close";
//
// 	chartControlGroup.appendChild(leftToggle);
// 	chartControlGroup.appendChild(chartDropdown);
// 	chartControlGroup.appendChild(rightToggle);
// 	chartControlGroup.appendChild(closeButton);
// 	chartControl.appendChild(chartControlGroup);
// 	graphBox.appendChild(chartControl);
//
// 	return chartControl;
// }

function moreGraphsPossible() {
	totalGraphs++;
	checkNumberOfGraphs();
}

function checkNumberOfGraphs() {
	if(totalGraphs >= maxGraphs) {
		maxGraphsReached = true;
	}
	else {
		maxGraphsReached = false;
	}
	buttonsOnOff();
}

function buttonsOnOff() {
	document.getElementById('histogram-button-id').disabled = maxGraphsReached;
	document.getElementById('scatterplot-button-id').disabled = maxGraphsReached;
	document.getElementById('linegraph-button-id').disabled = maxGraphsReached;
}
