import * as d3 from "../../third-party/d3.min.js";

export default class KernelDensityEstimator {
    constructor() {
        // Default kernel is the epanechnikov kernel
        this.setKernel(this.epanechnikov);
        this.bandwidth = 0.4;
    }

    setKernel(kernel) {
        this.kernel = kernel;
    }

    setBandwidth(bw) {
        this.bandwidth = bw;
    }

    estimate(thresholds, data, maxY) {
        let normalize = d3.scaleLinear()
            .domain([thresholds[0], thresholds[thresholds.length - 1]])
            .range([0, 10]);

        let unnormalize = d3.scaleLinear()
            .domain([0, 10])
            .range([thresholds[0], thresholds[thresholds.length - 1]]);

        data = data.map(e => normalize(e));
        thresholds = thresholds.map(e => normalize(e));

        let estimate = thresholds.map(t => [t, d3.mean(data, d => this.kernel(this.bandwidth)(t - d))]);
        estimate = estimate.map(e => [unnormalize(e[0]), unnormalize(e[1])]);

        let maxEstimate = d3.max(estimate, d => d[1]);
        let minEstimate = d3.min(estimate, d => d[1]);
        let fit = d3.scaleLinear()
            .domain([minEstimate, maxEstimate])
            .range([0, maxY]);

        estimate = estimate.map(e => [e[0], fit(e[1])]);
        return estimate;
    }

    epanechnikov(bandwidth) {
        return x => {
            return Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }
    }
}
