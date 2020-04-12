/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./targeted_query_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.TargetedQueryServiceClient =
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
proto.TargetedQueryServicePromiseClient =
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
 *   !proto.TargetQueryRequest,
 *   !proto.TargetQueryResponse>}
 */
const methodDescriptor_TargetedQueryService_Query = new grpc.web.MethodDescriptor(
  '/TargetedQueryService/Query',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.TargetQueryRequest,
  proto.TargetQueryResponse,
  /**
   * @param {!proto.TargetQueryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TargetQueryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TargetQueryRequest,
 *   !proto.TargetQueryResponse>}
 */
const methodInfo_TargetedQueryService_Query = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TargetQueryResponse,
  /**
   * @param {!proto.TargetQueryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TargetQueryResponse.deserializeBinary
);


/**
 * @param {!proto.TargetQueryRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.TargetQueryResponse>}
 *     The XHR Node Readable Stream
 */
proto.TargetedQueryServiceClient.prototype.query =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/TargetedQueryService/Query',
      request,
      metadata || {},
      methodDescriptor_TargetedQueryService_Query);
};


/**
 * @param {!proto.TargetQueryRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.TargetQueryResponse>}
 *     The XHR Node Readable Stream
 */
proto.TargetedQueryServicePromiseClient.prototype.query =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/TargetedQueryService/Query',
      request,
      metadata || {},
      methodDescriptor_TargetedQueryService_Query);
};


module.exports = proto;

