const fs = require("fs");
const path = require("path");
const users = require("../../app/handlers/users");
const result = require("../../app/lib/result");

users.lib.baseDir = path.join(__dirname, "/../.data/");

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

  deleteFolderRecursive(path.join(users.lib.baseDir, "/users"));
});

test("testing users.post when no agreement should return 400", async () => {
  let sut = await users.post({
    method: "post",
    payload: {
      firstName: "Cédric",
      lastName: "Méléard",
      phone: "0636600050",
      password: "mypath"
    }
  });
  expect(sut).toEqual(result.BadRequest);
});

test("testing users.post when agreement should return 200", async () => {
  let sut = await users.post({
    method: "post",
    payload: {
      firstName: "Cédric",
      lastName: "Méléard",
      phone: "0636600050",
      password: "mypath",
      tosAgreement: true
    }
  });
  expect(sut).toEqual(result.Ok);
});

test("tesing users.get when phone invlaid  should return 400", async () => {
  let sut = await users.get({
    method: "get",
    queryStringObject: {
      phone: ""
    }
  });
  expect(sut).toEqual(result.BadRequest);
});

test("tesing users.get when user does not exist should return 404", async () => {
  let sut = await users.get({
    method: "get",
    queryStringObject: {
      phone: "0636600050"
    }
  });
  expect(sut).toEqual(result.NotFound);
});

test("tesing users.get when user does exist should return 200 and user", async () => {
  let sut = await users.post({
    method: "post",
    payload: {
      firstName: "Cédric",
      lastName: "Méléard",
      phone: "0636600050",
      password: "mypath",
      tosAgreement: true
    }
  });
  expect(sut).toEqual(result.Ok);

  sut = await users.get({
    method: "get",
    queryStringObject: {
      phone: "0636600050"
    }
  });

  expect(sut.statusCode).toEqual(200);
  expect(sut.data.firstName).toEqual("Cédric");
  expect(sut.data.lastName).toEqual("Méléard");
  expect(sut.data.phone).toEqual("0636600050");
  //since it's sha
  expect(sut.data.password).not.toEqual("mypath");
});
