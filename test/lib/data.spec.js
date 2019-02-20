const fs = require("fs");
const path = require("path");
const data = require("../../app/lib/data");
//init test directory
data.baseDir = path.join(__dirname, "/../.data/");

//empty folder
afterEach(() => {
  const deleteFolderRecursive = folder => {
    let dir = folder;
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((file, index) => {
        let curPath = dir + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          deleteFolderRecursive(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
    }
  };

  deleteFolderRecursive(path.join(data.baseDir, "/users"));
});

test("creating a file to directory should be ok when file does not exist", async () => {
  let result = await data.create("users", "new", { foo: "bar" });
  expect(result.success).toBeTruthy();
});

test("creating a file to directory should not be ok when datas JSON should fail", async () => {
  const circularReference = {};
  circularReference.myself = circularReference;
  let result = await data.create("users", "new", circularReference);

  expect(result.success).toBeFalsy();
  expect(result.message).toEqual("Internal server error");
});

test("creating a file to directory should be not ok when file already exist", async () => {
  //prepare create a file
  await data.create("users", "new", {});
  //act
  let result = await data.create("users", "new", {});
  expect(result.success).toBeFalsy();
  expect(result.message).toEqual(
    "Could not create new file it may already exist"
  );
});

test("reading a file from directory should be ok and return datas object from file", async () => {
  await data.create("users", "new", { foo: "bar" });
  let result = await data.read("users", "new");
  expect(result.success).toBeTruthy();
  expect(result.datas).toEqual({ foo: "bar" });
});

test("reading a file from directory whn file empty should be ok and return object {} from file", async () => {
  await data.create("users", "new");
  let result = await data.read("users", "new");
  expect(result.success).toBeTruthy();
  expect(result.datas).toEqual({});
});

test("reading a file from directory when not exist should not be ok", async () => {
  let result = await data.read("users", "new");
  expect(result.success).toBeFalsy();
  expect(result.message).toEqual("File does not exist");
});

test("update a file should be ok and file updated", async () => {
  await data.create("users", "new", { foo: "bar" });
  let result = await data.read("users", "new");
  expect(result.success).toBeTruthy();
  expect(result.datas).toEqual({ foo: "bar" });
  result = await data.update("users", "new", { fizz: "buzz" });
  expect(result.success).toBeTruthy();
  result = await data.read("users", "new");
  expect(result.datas).toEqual({ fizz: "buzz" });
});

test("update an unexisting file should fail", async () => {
  let result = await data.update("users", "new", { fizz: "buzz" });
  expect(result.success).toBeFalsy();
  expect(result.message).toEqual("File does not exist");
});

test("delete a file should be ok", async () => {
  await data.create("users", "new", { foo: "bar" });
  let result = await data.read("users", "new");
  expect(result.success).toBeTruthy();
  expect(result.datas).toEqual({ foo: "bar" });
  result = await data.delete("users", "new");
  expect(result.success).toBeTruthy();
  result = await data.read("users", "new");
  expect(result.success).toBeFalsy();
});

test("delete an unexisting file should fail", async () => {
  let result = await data.delete("users", "new");
  expect(result.success).toBeFalsy();
  expect(result.message).toEqual("File does not exist");
});
