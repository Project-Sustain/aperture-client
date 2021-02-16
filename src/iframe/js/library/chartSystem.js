
class ChartSystem {
    constructor(map, chartCatalogeFilename) {
        this.filter = new MapDataFilter();
        RenderInfrastructure.useFilter(this.filter);
        this.map = map;

        this.chart = new BarChart([], 1000, 300);
        //this.resizable = new resizable(1000, 300, "white");
        this.resizable.addChart(this.chart);

        $.getJSON(chartCatalogeFilename, (catalog) => {
            this.catalog = catalog;
            this.initialize();
        });

        this.doNotUpdate = false;
    }

    initialize() {
        this.map.on('move', (e) => {
            if (this.doNotUpdate) {
                return;
            }

            let graphable = this.catalog.map(e => Object.keys(e.constraints));
            graphable = graphable.flat();
            let values = this.filter.getModel(graphable, this.map.getBounds());
            this.chart.changeData(values.temp.map(e => e.data), 5);
            this.chart.setColors('#4200ea', '#ea0042');

            this.doNotUpdate = true;
            window.setTimeout(() => { this.doNotUpdate = false }, 200);
        });
    }
}
