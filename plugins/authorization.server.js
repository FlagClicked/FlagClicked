if (!process.server && process.client)
  throw new Error(
    `Unexpected Error: authorization.server.js has been ran in client context. This plugin must be ran in server context.`
  );
// Server Authorization

import monk from "monk";
import fetch from "node-fetch";
import crypto from "crypto";

const db = monk(
  process.env.mongoDBURL || process.env.MONGODB_URL || "localhost/flagclicked"
);

const users = db.get("users");
const sessions = db.get("sessions");
const tokens = db.get("verify");

users.createIndex("username", { unique: true });

export var module = {
  async getSession(session) {
    const sessionObject = await sessions.findOne({
      session,
    });

    if (!sessionObject) return null;
    let user;
    if (sessionObject) {
      user = await this.getUser(sessionObject.user);
    }

    return sessionObject && user ? user : null;
  },
  async getUserById(id) {
    const user = await users.findOne({
      id: Number(id),
    });

    return user;
  },
  async getUser(name) {
    const user = await users.findOne({
      username: { $regex: new RegExp("^" + escapeRegExp(name) + "$", "i") },
    });

    return user ? user : null;
  },
  async createSession(username) {
    const token = await generateToken();
    const session = await sessions.insert({
      session: token,
      user: username,
    });

    return token;
  },
  async createUser(username) {
    if (await this.getUser(username)) {
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
  },
  async deleteSession(sessionToken) {
    await sessions.remove({ session: sessionToken });
    return;
  },
  async registerToken(token, privateCode) {
    await tokens.insert({
      token,
      private: privateCode,
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
  },
  middleware(type) {
    return async function (req, res, next) {
      let sessionUser = await module.getSession(req.cookies.token);
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
  },
  databases: { users, sessions, tokens },
};

export default function ({}, inject) {
  inject("db", module);
}

function escapeRegExp(string) {
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