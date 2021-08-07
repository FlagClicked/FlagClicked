if (!process.server && process.client)
  throw new Error(
    `Unexpected Error: authorization.server.js has been ran in client context. This plugin must be ran in server context.`
  );
const db = require("monk")(
  process.env.mongoDBURL || process.env.MONGODB_URL || "localhost/flagclicked"
);
const auth = require("./auth.js");
let tutorials = db.get("tutorials");

tutorials.createIndex("id", { unique: true });

export var Tutorials = {
  get: async function (id) {
    let regex = "^" + escapeRegExp(id) + "$";
    var tutorial = {};

    try {
      tutorial = await tutorials.findOne({
        id: { $regex: new RegExp(regex, "i") },
      });
    } catch (ex) {
      tutorial = null;
    }

    return tutorial;
  },
  new: async function (body, author) {
    let allTutorials = await tutorials.find();
    let tutorial = {
      id: (allTutorials.length + 1).toString(),
      author,
      tags: [],
      body,
      history: {
        created: {
          time: Date.now(),
          user: author,
        },
        edited: {
          time: Date.now(),
          user: author,
        },
      },
    };
    await tutorials.insert(tutorial);

    return tutorial;
  },
  edit: async function (body, id, user) {
    let tutorial = await Tutorials.get(id);
    var editor = await auth.getUser(user);

    if (editor.id !== tutorial.author.id && !editor.admin) {
      throw "User cannot edit this tutorial!";
    }

    await tutorials.update(
      { id },
      {
        $set: {
          body,
          "meta.edited.user": editor,
          "meta.edited.time": Date.now(),
        },
      }
    );
  },
  raw: tutorials,
};

export default function ({}, inject) {
  inject("tutorials", Tutorials);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
