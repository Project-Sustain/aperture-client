const assert = require('assert');
const grpcQuerier = require('../../../../src/Iframe/Dependencies/Sketch_Visualization/grpc_querier');
const {TargetedQueryServiceClient} = require('../../../../src/Iframe/Dependencies/Sketch_Visualization/targeted_query_service_grpc_web_pb.js');

describe('grpc_querier()', function() {
    it('should initialize the grpc_querier with a targeted query service', function() {
        const gq = grpcQuerier.grpc_querier();
        assert.notDeepEqual(gq, undefined);
        assert.deepEqual(gq.service, new TargetedQueryServiceClient("http://" + window.location.hostname + ":9092"));
    });
});

describe('grpc_querier._getTemporalExpresion()', function() {
    it('should return a temporal expression with the given bounds', function() {
        const gq = grpcQuerier.grpc_querier();
        const te = gq._getTemporalExpresion(0, 1);
        assert.notDeepEqual(te, undefined);
        assert.equal(te.array[1][te.array[1].length - 1], 0);
        assert.equal(te.array[4][te.array[4].length - 1], 1);
    });
});

describe('grpc_querier._getSpatialScopePredicate()', function() {
    it('should return a spatial scope predicate with the given scopes', function() {
        const gq = grpcQuerier.grpc_querier();
        const ssp = gq._getSpatialScopePredicate(["", "9", "9x"]);
        assert.notDeepEqual(ssp, undefined);
        assert.equal(ssp[0].array[ssp[0].array.length - 1],  "");
        assert.equal(ssp[1].array[ssp[0].array.length - 1],  "9");
        assert.equal(ssp[2].array[ssp[0].array.length - 1],  "9x");
    });
});

describe('grpc_querier.getStreamForQuery()', function() {
    it('should return a stream with appropriate query bounds', function() {
        const gq = grpcQuerier.grpc_querier();
        const s = gq.getStreamForQuery("test", ["", "9", "9x"], 0, 1);
        assert.notDeepEqual(s, undefined);
    });
});