const result = require("../../app/lib/result");

test("Check result Ok should return 200", () => {
  let sut = result.Ok;
  expect(sut.statusCode).toEqual(200);
});

test("Check result BadRequest should return 400", () => {
  let sut = result.BadRequest;
  expect(sut.statusCode).toEqual(400);
  expect(sut.message).toEqual("Bad request");
});

test("Check result NotFound should return 404", () => {
  let sut = result.NotFound;
  expect(sut.statusCode).toEqual(404);
  expect(sut.message).toEqual("Not found");
});

test("Check result Method Not Allowed should return 405", () => {
  let sut = result.MethodNotAllowed;
  expect(sut.statusCode).toEqual(405);
  expect(sut.message).toEqual("Method not allowed");
});

test("Check result Error should return 500", () => {
  let sut = result.Error;
  expect(sut.statusCode).toEqual(500);
  expect(sut.message).toEqual("Internal sever error");
});
