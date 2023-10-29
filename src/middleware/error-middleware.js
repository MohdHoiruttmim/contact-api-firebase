const ReponseError = require("../error/response-error");
const { ValidationError } = require("joi");

const errorMiddleware = async (err, request, response, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ReponseError) {
    response.status(err.status).json({
      error: err.message,
    }).end();
  } else if (err instanceof ValidationError) {
    response.status(400).json({
      error: err.message,
    }).end();
  } else {
    response.status(500).json({
      error: err.message,
    }).end();
  }
};

module.exports = errorMiddleware;
