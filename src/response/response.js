const responseJustMessage = (
  h,
  { code = 200, status = 'success', message = 'Sukses' }
) => {
  const response = h.response({
    status: status,
    message: message,
  });

  response.code(code);

  return response;
};

const responseSuccess = (h, { code = 200, data = {} }) => {
  const response = h.response({
    status: 'success',
    data: data,
  });

  response.code(code);

  return response;
};

const responseCreated = (h, { code = 201, message = 'Success', data = {} }) => {
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
    status: 'fail',
    message: message,
  });

  response.code(code);

  return response;
};

const responseError = (h, { code = 500, message = 'Error' }) => {
  const response = h.response({
    status: 'fail',
    message: message,
  });

  response.code(code);

  return response;
};

const responseBadRequest = (h, { code = 400, message = 'Error' }) => {
  const response = h.response({
    status: 'fail',
    message: message,
  });

  response.code(code);

  return response;
};

export {
  responseBadRequest,
  responseCreated,
  responseError,
  responseJustMessage,
  responseNotFound,
  responseSuccess,
};
