exports.handler = async (event) => {
  console.log(event);
  let response = {
    isAuthorized: false,
  };

  if (event.headers.authorization === "secretToken") {
    response = {
      isAuthorized: true,
    };
  }

  return response;
};
