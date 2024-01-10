exports.handler = async (event) => {
  let response = {
    isAuthorized: false,
  };

  if (event.headers.authorization === process.env.AUTH_API_KEY) {
    response = {
      isAuthorized: true,
    };
  }

  return response;
};
