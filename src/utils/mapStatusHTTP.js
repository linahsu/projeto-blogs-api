const mapHttp = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
};

module.exports = (status) => mapHttp[status] || 500;