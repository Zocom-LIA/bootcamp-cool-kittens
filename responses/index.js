function sendResponse(statusCode, response) {
  return {
    statusCode: statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
}

module.exports = { sendResponse };
