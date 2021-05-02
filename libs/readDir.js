const fs = require("fs");
module.exports = function readDir(
  dir,
  { callback, deep = true, pageDir = "/" }
) {
  console.log("a")
  const files = fs.readdirSync("." + dir);
  for (const file of files) {
    const isFile = fs.lstatSync("." + dir + file).isFile();
    callback({ dir, file, isFile, pageDir });
    if (!isFile && deep)
      readDir(dir + file + "/", {
        callback,
        deep,
        pageDir: pageDir + file + "/",
      });
  }
};
