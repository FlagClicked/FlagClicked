const fetch = require("node-fetch");
const crypto = require("crypto");

const db = require("monk")(process.env.MONGODB_URL);
const users = db.get("users");
const sessions = db.get("sessions");
const tokens = db.get("verify");

users.createIndex("name", { unique: true });
const Auth = {};
Auth.rawTokenDB = tokens;

Auth.createUser = async function (username) {
  if (await Auth.getUser(username)) {
    throw `User ${username} has already been created!`;
  }

  let res = await fetch(`https://api.scratch.mit.edu/users/${username}`).then(
    (res) => res.json()
  );

  if (res.code == "NotFound") {
    throw `User ${username} is not a valid scratch user!`;
  }

  let User = {
    id: res.id,
    username: res.username,
    admin: false,
  };

  console.log(`Creating user: ${res.username}..`);

  await users.insert(User);

  console.log(`Finished creating user: ${res.username}..`);

  return User;
};

Auth.getUser = async function (name) {
  let user = await users.findOne({
    username: { $regex: new RegExp(`^${escapeRegExp(name)}$`, "i") },
  });
  return user ? user : null;
};

Auth.createSession = async function (user) {
  let sessionToken = await generateToken();

  await sessions.insert({ user, session: sessionToken });

  return sessionToken;
};

Auth.getSession = async function (sessionToken) {
  let sessionUser = await sessions.findOne({
    session: { $regex: new RegExp(`^${escapeRegExp(sessionToken)}$`, "i") },
  });

  if (sessionUser) {
    return await Auth.getUser(sessionUser.user);
  } else return null;
};

Auth.deleteSession = async function (sessionToken) {
  await sessions.remove({ session: sessionToken });
  return true;
};

Auth.getCurrentUserCount = async function () {
  return (await users.find()).length;
};

Auth.registerToken = async function (token, private) {
  await tokens.insert({
    token,
    private,
    timestamp: Date.now(),
  });
  // Remove old sessions
  let all = await tokens.find();

  for (let j in all) {
    if (Date.now() - all[j].timestamp >= 600000) {
      await tokens.remove(all[j]);
    }
  }

  return;
};

Auth.middleware = function (type) {
  return async function (req, res, next) {
    let sessionUser = await Auth.getSession(req.cookies.token);

    if (
      (sessionUser && sessionUser.admin && type == "admin") ||
      (sessionUser && type == "authenticated")
    ) {
      req.user = sessionUser;

      next();
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  };
};

function escapeRegExp(string) {
  if (!string) return undefined;
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

async function generateToken() {
  let buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(256, (ex, buffer) => {
      if (ex) return reject("error generating token");
      resolve(buffer);
    });
  });

  let token = crypto.createHash("sha1").update(buffer).digest("hex");

  return token;
}

module.exports = Auth;
