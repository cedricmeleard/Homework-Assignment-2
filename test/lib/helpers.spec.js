const helpers = require("../../app/lib/helpers");

// parsing JSON object
test("helpers test parse json when json empty should return empty object", () => {
  let result = helpers.parseJsonToObject("");
  expect(result).toEqual({});
});

test("helpers test parse json when json ok should return object", () => {
  let result = helpers.parseJsonToObject(JSON.stringify({ foo: "bar" }));
  expect(result).toEqual({ foo: "bar" });
});
// handling errors
test("manage error when error is ENOENT", () => {
  let error = helpers.handleError({ code: "ENOENT" });
  expect(error).toEqual("File does not exist");
});

test("manage error when error is EEXIST", () => {
  let error = helpers.handleError({ code: "EEXIST" });
  expect(error).toEqual("Could not create new file it may already exist");
});

test("manage error when error is something else", () => {
  let error = helpers.handleError({ code: "" });
  expect(error).toEqual("Internal server error");
});
// get users data
test("get user object from data when data empty should return false on properties", () => {
  let sut = helpers.getUser();
  expect(sut.firstName).toBeFalsy();
  expect(sut.lastName).toBeFalsy();
  expect(sut.phone).toBeFalsy();
  expect(sut.password).toBeFalsy();
  expect(sut.tosAgreement).toBeFalsy();
});

test("get user object from data when data ok should return user", () => {
  let sut = helpers.getUser({
    firstName: "Cédric",
    lastName: "Méléard",
    phone: "0636600050",
    password: "mypath",
    tosAgreement: true
  });
  expect(sut.firstName).toBeTruthy();
  expect(sut.lastName).toBeTruthy();
  expect(sut.phone).toBeTruthy();
  expect(sut.password).toBeTruthy();
  expect(sut.tosAgreement).toBeTruthy();
});

test("get user object from data when incorrect phone should return user phone falsy", () => {
  let sut = helpers.getUser({
    phone: "06366000505"
  });
  expect(sut.phone).toBeFalsy();

  sut = helpers.getUser({
    phone: "123"
  });
  expect(sut.phone).toBeFalsy();
});

test("get user object from data when empty password should return password falsy", () => {
  let sut = helpers.getUser({
    password: ""
  });
  expect(sut.password).toBeFalsy();
});

test("get user object from data when term of Agreement false should return tos falsy", () => {
  let sut = helpers.getUser({});
  expect(sut.tosAgreement).toBeFalsy();

  sut = helpers.getUser({ tosAgreement: "dummy" });
  expect(sut.tosAgreement).toBeFalsy();
});

test("test hash function", () => {});
