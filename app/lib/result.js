const result = {
  get Ok() {
    return {
      statusCode: 200
    };
  },

  //TODO pas ouf, a revoir
  OkData: params => {
    return {
      data: params,
      statusCode: 200
    };
  },

  get BadRequest() {
    return {
      statusCode: 400,
      message: "Bad request"
    };
  },

  get NotFound() {
    return {
      statusCode: 404,
      message: "Not found"
    };
  },

  get MethodNotAllowed() {
    return {
      statusCode: 405,
      message: "Method not allowed"
    };
  },

  get Error() {
    return {
      statusCode: 500,
      message: "Internal sever error"
    };
  }
};

module.exports = result;
