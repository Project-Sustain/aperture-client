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

	// let histPic = document.createElement("img");
	// histPic.src = "../../images/Histogram_Black.png";
	// histPic.className = "temp-chart-pics";
	// graphBox.appendChild(histPic);

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

	// let scatPic = document.createElement("img");
	// scatPic.src = "../../images/Scatterplot_Black.png";
	// scatPic.className = "temp-chart-pics";
	// graphBox.appendChild(scatPic);

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

	// let linePic = document.createElement("img");
	// linePic.src = "../../images/Linegraph_Black.png";
	// linePic.className = "temp-chart-pics";
	// graphBox.appendChild(linePic);

	box1.appendChild(graphBox);
}

function createChartControl(graphBox) {
	let chartControl = document.createElement("div");
	chartControl.className = "chart-control";

	let chartDropdown = document.createElement("div");
	chartDropdown.className = "dropdown";
	chartDropdown.innerHTML = 
		"<button class='btn btn-outline-dark dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>\
			Constraint\
		</button>\
		<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>\
			<a class='dropdown-item' href='#'>Constraint 1</a>\
			<a class='dropdown-item' href='#'>Constraint 2</a>\
			<a class='dropdown-item' href='#'>Constraint 3</a>\
		</div>";
	chartControl.appendChild(chartDropdown);
	graphBox.appendChild(chartControl);

	// let leftToggle = document.createElement("button");
	// leftToggle.className = "btn btn-outline-dark";
	// leftToggle.innerHTML = "<img src='../../images/LeftToggle.png' class='left-toggle'";
	//
	// let rightToggle = document.createElement("button");
	// rightToggle.className = "btn btn-outline-dark";
	// rightToggle.innerHTML = "<img src='../../images/RightToggle.png' class='left-toggle'";
	//
	// chartControl.appendChild(leftToggle);
	// chartControl.appendChild(rightToggle);

	let closeButton = document.createElement("button");
	closeButton.type = "button";
	closeButton.className = "btn btn-outline-dark";
	closeButton.addEventListener('click', function() {
		box1.removeChild(graphBox);
		totalGraphs--;
		checkNumberOfGraphs();
	});
	closeButton.innerText = "Close Graph";
	chartControl.appendChild(closeButton);

	return chartControl;
}

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
