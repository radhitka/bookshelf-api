const responseSuccess = (h, { code = 200, message = 'Success', data = {} }) => {
  const response = h.response({
    status: 'success',
    message: message,
    data: data,
  });

  response.code(code);

  return response;
};

const responseNotFound = (h, { code = 404, message = 'Not Found' }) => {
  const response = h.response({
    status: 'not found',
    message: message,
  });

  response.code(code);

  return response;
};

const responseError = (h, { code = 500, message = 'Error' }) => {
  const response = h.response({
    status: 'false',
    message: message,
  });

  response.code(code);

  return response;
};

export { responseError, responseNotFound, responseSuccess };
