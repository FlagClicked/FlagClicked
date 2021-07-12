/* >>>>> MODULES <<<<< */
const express = require("express");
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const auth = require("./auth.js");
const Tutorials = require(`./Tutorials.js`);
const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/auth/begin", (req, res) => {
  res.redirect(
    `https://fluffyscratch.hampton.pw/auth/getKeys/v2?redirect=${Buffer.from(
      `${req.get("Host")}/auth/handle`
    ).toString("base64")}`
  );
});

app.get("/auth/handle", async (req, res) => {
  // the user is back from hampton's thing.
  const privateCode = req.query.privateCode;

  let authResponse = await fetch(
    "http://fluffyscratch.hampton.pw/auth/verify/v2/" + privateCode
  );

  let authData = await authResponse.json();

  if (authData.valid) {
    var user = await auth.getUser(authData.username);
    if (!user) {
      user = await auth.createUser(authData.username);
    }

    let session = await auth.createSession(user.username);

    res.cookie("token", session, { path: "/" });

    res.redirect(`/`);
  } else {
    res.redirect(`/login?error=1`); // failed fluffyscratch auth
  }
});

app.get("/auth/me", auth.middleware("authenticated"), (req, res) => {
  res.json(req.user);
});

app.put("/auth/delete", auth.middleware("authenticated"), async (req, res) => {
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

app.get("/api/tutorial/featured", async (req, res) => {
  let tutorial = await Tutorials.raw.findOne({
    featured: true,
  });

  tutorial
    ? res.json(tutorial)
    : res.status(404).json({ error: "cannot find tutorial" });
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
        { $set: { featured: false } }
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
  let tutorial = await Tutorials.get(req.params.id);
  tutorial
    ? res.json(tutorial)
    : res.status(404).json({ error: "tutorial not found" });
});

app.put("/api/auth/init", async (req, res) => {
  // Generate a code
  let code = generateRandomID(20);
  let privateCode = generateRandomID(40);
  await auth.registerToken(code, privateCode);
  res.json({ token: code, private: privateCode });
});

app.put("/api/auth/login", async (req, res) => {
  let resp = await fetch(
    `https://api.scratch.mit.edu/studios/29872706/comments`
  );
  let json = await resp.json();
  let tk = await auth.rawTokenDB.find({ private: req.body.private });
  if (!tk[0]) return res.json({ error: "invalid token" });

  for (let j in json) {
    if (json[j].content == tk[0].token) {
      await auth.rawTokenDB.remove({ private: req.body.private });
      let author = json[j].author.username;

      var user = await auth.getUser(author);
      if (!user) {
        user = await auth.createUser(user);
      }

      let session = await auth.createSession(user.username);

      res.cookie("token", session, { path: "/" });

      res.json({ ok: true, token: session });
      return;
    }
  }

  res.json({ ok: false, error: "not found", data: json });
});

export default app;

function generateRandomID(len) {
  let ALPHA = "BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0";
  var str = "";
  var i = 0;
  while (i < len) {
    str += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
    i++;
  }
  return str;
}