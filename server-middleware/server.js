/* >>>>> MODULES <<<<< */
import * as module from "../plugins/authorization.server.js";
import * as tutorials from "../plugins/tutorials.server.js";
const auth = module.module;
const Tutorials = tutorials.Tutorials;
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());

const axios = require("axios");

app.get("/auth/me", auth.middleware("authenticated"), (req, res) => {
  res.json(req.user);
});

app.delete("/auth/me", auth.middleware("authenticated"), async (req, res) => {
  await auth.deleteSession(req.cookies.token);

  res.clearCookie("token", { path: "/" });
  res.status(200).json({ ok: "logged out" });
});

app.get("/api/users/:user", async (req, res) => {
  let user = await auth.getUser(req.params.user.replace(/\*/g, "$1"));

  user ? res.json(user) : res.status(404).json({ error: "user not found" });
});

app.put(
  "/api/tutorial/new",
  auth.middleware("authenticated"),
  async (req, res) => {
    let tutorial = await Tutorials.new(req.body.body, req.user);

    res.json(tutorial);
  }
);

app.get("/api/tutorial/search", async (req, res) => {
  res.status(501).json({ error: "not implemented" });
});

app.get("/api/tutorial/featured", async (req, res) => {
  let tutorial = await Tutorials.raw.findOne({ featured: true });
  res.json(tutorial ?? { error: "no featured tutorial" });
});

app.put(
  "/api/tutorial/featured",
  auth.middleware("admin"),
  async (req, res) => {
    // Remove the last featured tutorial if found
    let tutorial = await Tutorials.raw.findOne({
      featured: true,
    });

    if (tutorial) {
      await Tutorials.raw.update(
        { id: tutorial.id },
        { $unset: { featured: "" } }
      );
    }

    await Tutorials.raw.update(
      { id: req.body.id },
      { $set: { featured: true } }
    );

    return res.json({ ok: "succesfully featured tutorial" });
  }
);

app.get("/api/tutorial/:id", async (req, res) => {
  let tutorial = await Tutorials.getById(req.params.id);
  tutorial
    ? res.json(tutorial)
    : res.status(404).json({ error: "tutorial not found" });
});

app.get(
  "/api/tutorials/me",
  auth.middleware("authenticated"),
  async (req, res) => {
    let tutorials = await Tutorials.getAll({
      "author.username": req.user.username,
    });
    res.json(tutorials);
  }
);

app.put("/api/auth/init", async (req, res) => {
  // Generate a code
  let code = generateRandomID(20);
  let privateCode = generateRandomID(40);
  await auth.registerToken(code, privateCode);
  res.json({ token: code, private: privateCode });
});

app.put("/api/auth/login", async (req, res) => {
  let { data: comments } = await axios.get(
    `https://api.scratch.mit.edu/studios/${
      process.env.studioId || 30078251
    }/comments?limit=40`
  );
  let tk = await auth.databases.tokens.findOne({ private: req.body.private });
  if (!tk) return res.json({ error: "invalid token" });

  for (const comment of comments) {
    if (comment.content == tk.token) {
      await auth.databases.tokens.remove({ private: req.body["private"] });
      let author = comment.author.username;

      var user = await auth.getUser(author);
      if (!user) {
        user = await auth.createUser(author);
      }

      let session = await auth.createSession(user.username);
      res.cookie("token", session, { path: "/" });

      res.json({ ok: true, token: session });
      return;
    }
  }

  res.json({ ok: false, error: "not found" });
});

export default app;

function generateRandomID(len) {
  let ALPHA = "BCDGHJLMNPQRSTVWXYZbcdghjlmnpqrstvwxyz*234567";
  var str = "";
  var i = 0;
  while (i < len) {
    str += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
    i++;
  }
  return str;
}
