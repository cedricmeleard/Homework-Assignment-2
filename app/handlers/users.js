//Dependencies
const _lib = require("../lib/data");
const helpers = require("../lib/helpers");
const result = require("../lib/result");

// Handling user's requests
const users = {
  lib: _lib
};

// Users - post
// Requiered data : firstName, lastnNme, phone, password, tosAgreement
// Optional data : none
users.post = async data => {
  let { firstName, lastName, phone, password, tosAgreement } = helpers.getUser(
    data.payload
  );
  // Check payload value are correctly filled
  if (firstName && lastName && phone && password && tosAgreement) {
    let user = await users.lib.read("users", phone);
    if (!user.success) {
      // Hash the password
      let hashedPassword = helpers.hash(password);
      if (hashedPassword) {
        // Create the user object
        let userObject = {
          firstName,
          lastName,
          phone,
          hashedPassword,
          tosAgreement: true
        };
        // Create that user
        let userCreate = await users.lib.create("users", phone, userObject);
        if (userCreate.success) {
          return result.Ok;
        } else {
          return result.Error;
        }
      }
    } else {
      return result.BadRequest;
    }
  } else {
    return result.BadRequest;
  }
};

// Users - get
// Requiered data : queryStringObject.phone
// Optional data : none
users.get = async data => {
  if (!data.queryStringObject) {
    return result.BadRequest;
  }
  let phone = helpers.getUser({
    phone: data.queryStringObject.phone
  }).phone;

  if (phone) {
    try {
      let user = await users.lib.read("users", phone);
      if (user.success) {
        return result.OkData(user.datas);
      } else {
        return result.NotFound;
      }
    } catch {
      return result.Error;
    }
  } else {
    return result.BadRequest;
  }
};

// Users - put
// Requiered data : firstName, lastnNme, phone, password, tosAgreement
// Optional data : none
users.put = async data => {
  return result.BadRequest;
};
// Users - delete
// Requiered data : queryStringObject.phone
// Optional data : none
users.delete = async data => {
  return result.BadRequest;
};

module.exports = users;
