const readDir = require("./readDir");
const fs = require("fs");
const { JSDOM } = require("jsdom");
module.exports = (html) => {
  const jsDom = new JSDOM(html);
  const doc = jsDom.window.document;
  readDir("/files/", {
    callback({ dir, file, isFile }) {
      switch (file) {
        case "style.css":
          const styleElt = createElt("style", {
            textContent: fs.readFileSync("." + dir + file, "utf8"),
          });
          doc.head.append(styleElt);
          break;
        case "components.js":
          const navJsElt = createElt("script", {
            textContent: fs.readFileSync("." + dir + file, "utf8"),
          });
          doc.body.append(navJsElt);
          break;
      }
    },
  });
  const vueJsElt = createElt("script", {
    src: "https://unpkg.com/vue@next",
  });
  doc.head.prepend(vueJsElt);
  const markedJsElt = createElt("script", {
    src: "https://unpkg.com/marked@0.3.6",
  });
  doc.head.append(markedJsElt);
  const logoLinkElt = createElt("link", {
    href: "/assets/logo.svg",
    rel: "icon",
  });
  doc.head.append(logoLinkElt);
  doc.head.innerHTML += `
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://FlagClicked.thecolaber.repl.co">
    <meta property="og:site_name" content="When Flag Clicked">
    <meta property="og:locale" content="en_US">
    <meta property="og:image" content="https://FlagClicked.thecolaber.repl.co/assets/logo.jpg">
    <meta property="og:image:type" content="image/jpg">
    <script src="https://scratchblocks.github.io/js/scratchblocks-v3.4-min.js"></script>
  `;
  return jsDom.serialize();

  function createElt(name, attrs) {
    const elt = doc.createElement(name);
    for (const attr in attrs) {
      switch (attr) {
        case "textContent":
          elt[attr] = attrs[attr];
          break;
        default:
          elt.setAttribute(attr, attrs[attr]);
          break;
      }
    }
    return elt;
  }
};
