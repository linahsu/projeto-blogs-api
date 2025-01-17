const mapHttp = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_IMPLEMENTED: 501,
  NO_CONTENT: 204,
};

module.exports = (status) => mapHttp[status] || 500;