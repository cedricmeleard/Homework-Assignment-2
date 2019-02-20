// Dependencies
const _users = require("./users");
const result = require("../lib/result");
// Define handlers
const handlers = {};

// Respond to ping
handlers.ping = async () => result.Ok;

// Not found handler
handlers.notFound = async () => result.NotFound;

// handling users request
// will return a promise resolve by [statusCode, payload]
handlers.users = async data => {
  let acceptableMetods = ["post", "get", "put", "delete"];
  if (acceptableMetods.includes(data.method)) {
    // await returning tab [status code, datas]
    let result = await handlers._users[data.method](data);
    return result;
  } else {
    return result.MethodNotAllowed;
  }
};
handlers._users = _users;

module.exports = handlers;
