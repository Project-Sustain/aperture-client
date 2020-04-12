const {TargetQueryRequest, Expression, Predicate} = require("./targeted_query_service_pb.js")
const {TargetedQueryServiceClient} = require('./targeted_query_service_grpc_web_pb.js');

GRPCQuerier = {
    initialize: function () {
        this.service = new TargetedQueryServiceClient("http://" + window.location.hostname + ":9092");
        return this;
    },

    _getTemporalExpresion: function (startEpochMilli, endEpochMilli) {
        const temporalLower = new Predicate();
        temporalLower.setComparisonop(Predicate.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO);
        temporalLower.setIntegervalue(startEpochMilli);
        const temporalUpper = new Predicate();
        temporalUpper.setComparisonop(Predicate.ComparisonOperator.LESS_THAN);
        temporalUpper.setIntegervalue(endEpochMilli);
        const temporal = new Expression();
        temporal.setPredicate1(temporalLower);
        temporal.setPredicate2(temporalUpper);
        temporal.setCombineop(Expression.CombineOperator.AND);
        return temporal
    },

    _getSpatialScopePredicate: function (geohashList) {
        const geohashes = [];
        for (const geo of geohashList) {
            const geohash = new Predicate();
            geohash.setStringvalue(geo);
            geohashes.push(geohash)
        }
        return geohashes
    },

    getStreamForQuery: function (datasetName, geohashList, startEpochMilli, endEpochMilli) {
        const request = new TargetQueryRequest();
        const temporal = this._getTemporalExpresion(startEpochMilli, endEpochMilli);
        const geohashes = this._getSpatialScopePredicate(geohashList);
        request.setDataset(datasetName);
        request.setSpatialscopeList(geohashes);
        request.setTemporalscope(temporal);
        return this.service.query(request, {});
    },
};

grpc_querier = function() {
    const grpcQuerier = GRPCQuerier;
    grpcQuerier.initialize();
    return grpcQuerier;
};

try{
    module.exports = {
        grpc_querier: grpc_querier
    }
} catch(e) { }