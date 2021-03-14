
/**
  * A class that represents an HTML element which can hold and dynamically
  * display multiple charts.
  * 
  * @author Pierce Smith, Matt Young (mostly Pierce Smith)
  */
class SingleChartArea {
    static runningID = 0;

    constructor() {
        this.viewIndex = SingleChartArea.runningID;
        this.currentIndex = 0;
        this.charts = [];
    }

    attachTo(node) {
        this.parentNode = node;
        this.container = document.createElement("div");
        this.container.className = "single-chart-area";

        this.toggleAxisButton = document.createElement("div");
        this.toggleAxisButton.className = "btn btn-outline-dark btn-xs";
        this.toggleAxisButton.innerText = "Cycle X-Axis";
        // this.container.appendChild(this.toggleAxisButton);
            
        this.parentNode.appendChild(this.container);
    }

    setFeatureToggleCallback(cb) {
        this.toggleAxisButton.onclick = cb;
    }

    addChart(chart) {
        this.charts.push(chart);
        chart.addTo(this.container);
        chart.hide(this.viewIndex);
    }

    showChart(index) {
        this.hideAll();
        this.currentIndex = index;
        this.charts[index].unhide(this.viewIndex);
    }

    hideAll() {
        this.charts.forEach(chart => {
            chart.hide(this.viewIndex);
        })
    }

    rerender(newWidth, newHeight) {
        if (!this.hasNothingToRender) {
            this.charts.forEach(chart => {
                chart.rerender(newWidth, newHeight, this.viewIndex);
            });
        }
    }

    tellNumberOfCharts(chartCount) {
        this.possibleChartCount = chartCount;
    }

    tellEmptyCharts(inaccessibleList) {
        this.hasNothingToRender = inaccessibleList.length === this.possibleChartCount;
    }
    
    toggleVisible() {
        if (this.container.style.display === "none") {
            this.container.style.display = "block";
        } else {
            this.container.style.display = "none";
        }
    }
}
