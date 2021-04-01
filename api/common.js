exports.errorResponse = function (type, message ,errors) {
    switch (type) {
      case "badRequest":
        return {
          success: false,
          message: message,
          errors : (errors) ? errors : [],
        };
        break;
      case "unauthorized":
        return {
          statusCode: 401,
          error: "Unauthorized",
          message: message,
        };
        break;
      case "forbidden":
        return {
          statusCode: 403,
          error: "Forbidden",
          message: message,
        };
        break;
      case "notFound":
        return {
          statusCode: 404,
          error: "Not Found",
          message: message,
        };
        break;
      case "badImplementation":
        return {
          statusCode: 500,
          error: "Internal Server Error",
          message: message,
        };
        break;
      default:
    }
  };
  
  
  exports.successResponse = function (message, data) {
    return {
      success: true,
      message: message,
      data: data,
    };
  };
  
  exports.createdResponse = function (message, data) {
    return {
      statusCode: 201,
      data: data,
      message: message,
    };
  };


  exports.createErrorResponse = function (message, params) {

    return [{
      'msg' : message,
      'params': (params) ? params : '',
      'location': 'body'
    }]
  };


  module.exports;