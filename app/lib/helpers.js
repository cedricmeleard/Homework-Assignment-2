// Dependencies
const crypto = require("crypto");
const config = require("../config");
// Helper
const helpers = {};
// Parse a JSON string to an object in all case without throwing
helpers.parseJsonToObject = str => {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
};

// Centralized error handling
helpers.handleError = exception => {
  let message = "Internal server error";
  switch (exception.code) {
    case "ENOENT":
      message = "File does not exist";
      break;
    case "EEXIST":
      message = "Could not create new file it may already exist";
      break;
    default:
      //non trapped error, will log to console
      console.log(exception);
  }
  return message;
};

// try get user data values
helpers.getUser = data => {
  if (!data) {
    return {
      firstName: false,
      lastName: false,
      phone: false,
      password: false,
      tosAgreement: false
    };
  }
  // Check that all required fields are filled out
  let firstName =
    typeof data.firstName === "string" && data.firstName.trim().length > 0
      ? data.firstName.trim()
      : false;
  let lastName =
    typeof data.lastName === "string" && data.lastName.trim().length > 0
      ? data.lastName.trim()
      : false;
  let phone =
    typeof data.phone === "string" && data.phone.trim().length == 10
      ? data.phone.trim()
      : false;
  let password =
    typeof data.password === "string" && data.password.trim().length > 0
      ? data.password.trim()
      : false;
  let tosAgreement =
    typeof data.tosAgreement === "boolean" && data.tosAgreement == true
      ? true
      : false;
  return { firstName, lastName, phone, password, tosAgreement };
};

// Create SHA 256 hash
helpers.hash = str => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");

    return hash;
  } else {
    return false;
  }
};
module.exports = helpers;
