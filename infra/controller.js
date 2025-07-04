import { MethodNotAllowedError, InternaServerError } from "infra/error.js";

function onNoMatch(request, response) {
  const publicError = new MethodNotAllowedError();
  response.status(publicError.statusCode).json(publicError);
}

function onError(error, request, response) {
  const publicError = new InternaServerError(error, error.status);
  response.status(publicError.statusCode).json(publicError);
}

const controller = {
  errorHandlers: {
    onNoMatch,
    onError,
  },
};

export default controller;
