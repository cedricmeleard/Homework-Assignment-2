const handlers = require("../../app/handlers/handlers");
const result = require("../../app/lib/result");
test("testing handlers when requesting notfound should return 404", async () => {
  let sut = await handlers.notFound();
  expect(sut).toEqual(result.NotFound);
});

test("testing handlers when requesting ping should return 200", async () => {
  let sut = await handlers.ping();
  expect(sut).toEqual(result.Ok);
});

test("testing handlers when requesting users list should return 405", async () => {
  let sut = await handlers.users({ method: "list" });
  expect(sut).toEqual(result.MethodNotAllowed);
});

test("testing handlers when requesting users post invalid should return 400", async () => {
  let sut = await handlers.users({ method: "post", payload: {} });
  expect(sut).toEqual(result.BadRequest);
});

test("testing handlers when requesting users get invalid should return 400", async () => {
  let sut = await handlers.users({ method: "get", payload: {} });
  expect(sut).toEqual(result.BadRequest);
});

test("testing handlers when requesting users put invalid should return 400", async () => {
  let sut = await handlers.users({ method: "put", payload: {} });
  expect(sut).toEqual(result.BadRequest);
});

test("testing handlers when requesting users delete invalid should return 400", async () => {
  let sut = await handlers.users({ method: "delete", payload: {} });
  expect(sut).toEqual(result.BadRequest);
});
