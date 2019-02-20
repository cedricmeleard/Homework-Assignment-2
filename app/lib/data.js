// Dependencies
const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");
const promisify = require("util").promisify;
// promisify fs functions for using async/aait instead of callback
const fsOpen = promisify(fs.open);
const fsWriteFile = promisify(fs.writeFile);
const fsClose = promisify(fs.close);
const fsReadFile = promisify(fs.readFile);
const fsTruncate = promisify(fs.ftruncate);
const fsUnlink = promisify(fs.unlink);

// Exported object for CRUD operation
const data = {};
data.baseDir = path.join(__dirname, "/../.data/");

// Attempt to create a new file on dir "dir"
data.create = async (dir, file, datas) => {
  try {
    const fileDescriptor = await fsOpen(
      `${data.baseDir}${dir}/${file}.json`,
      "wx"
    );
    let stringData = JSON.stringify(datas);
    await fsWriteFile(fileDescriptor, stringData);
    await fsClose(fileDescriptor);

    return { success: true };
  } catch (me) {
    let message = helpers.handleError(me);
    return { success: false, message: message };
  }
};

// Attempt to read file "file" on dir "dir"
data.read = async (dir, file) => {
  try {
    let datas = await fsReadFile(`${data.baseDir}${dir}/${file}.json`, "utf-8");
    let parsedData = helpers.parseJsonToObject(datas);
    return { success: true, datas: parsedData };
  } catch (me) {
    let message = helpers.handleError(me);
    return { success: false, message: message };
  }
};

// Attempt to update file "file" on dir "dir" with datas "datas"
data.update = async (dir, file, datas) => {
  try {
    let fileDescriptor = await fsOpen(
      `${data.baseDir}${dir}/${file}.json`,
      "r+"
    );
    await fsTruncate(fileDescriptor);
    let stringData = JSON.stringify(datas);
    await fsWriteFile(fileDescriptor, stringData);
    await fsClose(fileDescriptor);

    return { success: true };
  } catch (me) {
    let message = helpers.handleError(me);
    return { success: false, message: message };
  }
};

// Attempt to delete file
data.delete = async (dir, file) => {
  try {
    await fsUnlink(`${data.baseDir}${dir}/${file}.json`);
    return { success: true };
  } catch (me) {
    let message = helpers.handleError(me);
    return { success: false, message: message };
  }
};

module.exports = data;
