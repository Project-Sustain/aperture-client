/**
 * @fileoverview gRPC-Web generated client stub for census
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var other_datasets_pb = require('./other_datasets_pb.js')
const proto = {};
proto.census = require('./census_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.census.CensusClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.census.CensusPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.census.SpatialRequest,
 *   !proto.census.SpatialResponse>}
 */
const methodDescriptor_Census_SpatialQuery = new grpc.web.MethodDescriptor(
  '/census.Census/SpatialQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.census.SpatialRequest,
  proto.census.SpatialResponse,
  /**
   * @param {!proto.census.SpatialRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.census.SpatialResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.census.SpatialRequest,
 *   !proto.census.SpatialResponse>}
 */
const methodInfo_Census_SpatialQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.census.SpatialResponse,
  /**
   * @param {!proto.census.SpatialRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.census.SpatialResponse.deserializeBinary
);


/**
 * @param {!proto.census.SpatialRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.census.SpatialResponse>}
 *     The XHR Node Readable Stream
 */
proto.census.CensusClient.prototype.spatialQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/census.Census/SpatialQuery',
      request,
      metadata || {},
      methodDescriptor_Census_SpatialQuery);
};


/**
 * @param {!proto.census.SpatialRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.census.SpatialResponse>}
 *     The XHR Node Readable Stream
 */
proto.census.CensusPromiseClient.prototype.spatialQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/census.Census/SpatialQuery',
      request,
      metadata || {},
      methodDescriptor_Census_SpatialQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.census.TargetedCensusRequest,
 *   !proto.census.TargetedCensusResponse>}
 */
const methodDescriptor_Census_ExecuteTargetedCensusQuery = new grpc.web.MethodDescriptor(
  '/census.Census/ExecuteTargetedCensusQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.census.TargetedCensusRequest,
  proto.census.TargetedCensusResponse,
  /**
   * @param {!proto.census.TargetedCensusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.census.TargetedCensusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.census.TargetedCensusRequest,
 *   !proto.census.TargetedCensusResponse>}
 */
const methodInfo_Census_ExecuteTargetedCensusQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.census.TargetedCensusResponse,
  /**
   * @param {!proto.census.TargetedCensusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.census.TargetedCensusResponse.deserializeBinary
);


/**
 * @param {!proto.census.TargetedCensusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.census.TargetedCensusResponse>}
 *     The XHR Node Readable Stream
 */
proto.census.CensusClient.prototype.executeTargetedCensusQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/census.Census/ExecuteTargetedCensusQuery',
      request,
      metadata || {},
      methodDescriptor_Census_ExecuteTargetedCensusQuery);
};


/**
 * @param {!proto.census.TargetedCensusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.census.TargetedCensusResponse>}
 *     The XHR Node Readable Stream
 */
proto.census.CensusPromiseClient.prototype.executeTargetedCensusQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/census.Census/ExecuteTargetedCensusQuery',
      request,
      metadata || {},
      methodDescriptor_Census_ExecuteTargetedCensusQuery);
};


module.exports = proto.census;

