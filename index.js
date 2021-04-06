const express = require("express");
const fs = require("fs");
const readDir = require("./libs/readDir");
const Database = require("@replit/database");
const db = new Database();
const addLibs = require("./libs/add-libs");


// db.list().then((keys) => {
//   for (key of keys) {
//     db.delete(key);
//   }
// });

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
pageDir = "/assets/";
readDir("/assets/", {
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
    console.log(pages[page].split(".")[1]);
    if (pages[page].split(".")[1] === "html") {
      const html = fs.readFileSync("." + pages[page], "utf8");
      res.setHeader("Content-type", "text/html");
      res.send(addLibs(html));
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
  const html = fs.readFileSync("./pages/tutorials/index.html", "utf8");
  res.setHeader("Content-type", "text/html");
  res.send(addLibs(html));
});

app.post("/api/new", (req, res) => {
  // This commented code should be modified to accept the CURRENT domian... this code wouldn't work on works.
  // res.set(
  //   "Access-Control-Allow-Origin",
  //   "https://flagclicked.colabersecret.repl.co/"
  // );
  res.set("Access-Control-Allow-Methods", "POST");
  if ("POST" !== req.method) return res.sendStatus(403);
  console.log(req.body);
  let allowKey = false;
  db.list("tutorial-").then((matches) => {
    db.set(`tutorial-${matches.length + 1}`, req.body).then(() => {
      res.send({ tutorialId: matches.length + 1 });
    });
  });
});

app.listen(3000, () => console.log("server started"));
