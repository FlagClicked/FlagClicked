const express = require("express");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const readDir = require("./libs/readDir");
const Database = require("@replit/database");
const db = new Database();

db.list().then((keys) => {
  for (key of keys) {
    db.delete(key);
  }
});

//db.list().then(keys => {});
//db.list("prefix").then(matches => {});

const app = express();
app.use(express.text());

const pages = {};
readDir("/pages/", {
  callback({ dir, file, isFile, pageDir }) {
    if (file == "index.html") {
      pages[pageDir] = dir + file;
    }
  },
});
pageDir = "/global/";
readDir("/global/", {
  callback({ dir, file, isFile }) {
    if (!isFile) {
      pageDir += file + "/";
    } else {
      pages[dir + file] = dir + file;
    }
  },
});
console.log(pages);
for (const page in pages) {
  app.get(page, (req, res) => {
    if (pages[page].split(".")[1] === "html") {
      const html = fs.readFileSync("." + pages[page], "utf8");
      let fileContent = new JSDOM(html);
      fileContent = require("./libs/add-libs")(fileContent);
      res.setHeader("Content-type", "text/html");
      res.send(fileContent.serialize());
    } else {
      //res.contentType(__dirname + pages[page]);
      //res.setHeader('Content-type','image/jpg');

      res.sendFile(__dirname + pages[page]);
    }
  });
}

app.get("/api/tutorials/:id", (req, res) => {
  db.get(`tutorial-${req.params.id}`).then((value) => {
    res.send(value);
  });
});
app.get("/tutorials/:id", (req, res) => {
  res.sendFile(__dirname + "/pages/tutorials");
});

app.post("/api/new", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    "https://flagclicked.thecolaber.repl.co/"
  );
  res.set("Access-Control-Allow-Methods", "POST");
  if ("POST" !== req.method) return res.sendStatus(403);
  console.log(req.body);
  let allowKey = false;
  db.list("tutorial-").then((matches) => {
    db.set(`tutorial-${matches.length + 1}`, req.body).then(() => {
      res.send(matches.length + 1);
    });
  });
});

app.listen(3000, () => console.log("server started"));
