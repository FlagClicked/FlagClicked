const db = require("monk")(process.env.MONGODB_URL);
const auth = require("./auth.js");
let tutorials = db.get("tutorials");

tutorials.createIndex("id", { unique: true });
var Tutorials = {};

Tutorials.raw = tutorials; // declare raw db

Tutorials.get = async function (id) {
  let regex = "^" + escapeRegExp(id) + "$";
  var tutorial = {};

  try {
    tutorial = await tutorials.findOne({ id: { $regex: new RegExp(regex) } });
  } catch (ex) {
    tutorial = null;
  }

  return tutorial;
};

Tutorials.new = async function (body, author) {
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
};

Tutorials.edit = async function (body, id, user) {
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
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

module.exports = Tutorials;
