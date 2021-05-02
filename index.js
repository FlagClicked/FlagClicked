const REPLIT_URL = "www.whenflagclicked.org"; // Please change this URL to your replit URL before starting!
const express = require("express");
const fs = require("fs");
const readDir = require("./libs/readDir");
const Database = require("@replit/database");
const db = new Database();
const addLibs = require("./libs/add-libs");
const auth = require("./libs/auth");
const fetch = require("node-fetch");

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
  res.header("Access-Control-Allow-Origin", REPLIT_URL)
  res.set("Access-Control-Allow-Methods", "POST")

  if ("POST" !== req.method) return res.status(403).json({error: 'invalid method'})
  var cookie = auth.getCookie("token", req.headers.cookie)
  if (!cookie) return res.status(403).json({error: "no token"})

  auth.getSession(cookie)
  .catch(err => {
    res.status(403).json({error: "invalid token"})
    throw ""
  })
  .then(res => {
    db.list("tutorial-").then((matches) => {
      db.set(`tutorial-${matches.length + 1}`, req.body)
      .then(() => {
        res.json({tutorialId: matches.length + 1})
      })
    })
  })
});

app.get("/login", (req, res) => {
  res.redirect(
    `https://fluffyscratch.hampton.pw/auth/getKeys/v2?redirect=${Buffer.from(
      REPLIT_URL + "/login/finish",
      "utf-8"
    ).toString("base64")}`
  );
});

// /login/finish - Finishes the logging-in process from FluffyScratch. It issues a cookie to the user
app.get("/login/finish", async (req, res) => {
  if (!req.query.privateCode) return res.json({error: "failed FluffyScratch auth"})
  var username = await auth
    .checkIfFluffyResponseValid(req.query.privateCode)
    .catch((err) => {
      res.json({error: "failed FluffyScratch auth"})
      throw "";
    });

  if (username) {
    var session = await auth.createSession(username);

    res.cookie("token", session.token);

    res.redirect("/");
  }
});

app.get("/login/me", (req, res) => {
  // Returns <user> object.
  if (!req.query.token) return res.json({ error: "no token provided" });
  auth
    .getSession(req.query.token)
    .catch((err) => {
      return res.json({ error: "invalid token" });
    })
    .then((resp) => {
      if (!resp) return;
      resp.sessions = null; // remove this so we mask it away from da client
      res.json(resp);
    });
});

app.get("/login/delete", (req, res) => {
  var cookie = auth.getCookie("token", req.headers.cookie)
  if (!cookie) return res.status(403).json({error: "invalid token"})
  auth
    .deleteSession(cookie)
    .catch((err) => {
      return res.json({ error: "invalid token" });
    })
    .then(() => {
      res.clearCookie("token") // doesnt work... we need to clear the cookie from the client
      res.redirect("/?clearCookie=true");
    });
});

app.listen(3000, () => console.log("server started"));
