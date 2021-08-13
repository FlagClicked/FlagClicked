<template>
  <client-only>
    <div class="rendered" v-html="renderedContent"></div>
  </client-only>
</template>
<script>
import * as Rainbow from "highlight.js";
import "highlight.js/styles/github.css";
export default {
  props: ["content"],
  data() {
    return {};
  },
  computed: {
    renderedContent() {
      if (process.server) return;
      let html = `<html><body>${this.$md.render(this.content)}</body></html>`;
      let doc = new DOMParser().parseFromString(html, "text/html");

      let sbOptions = {
        style: "scratch3",
        inline: false,
        languages: ["en"],
        read: scratchblocks.read,
        parse: scratchblocks.parse,
        render: scratchblocks.render,
      };
      let sb = Array.from(doc.querySelectorAll("code.language-scratchblocks"));
      sb.forEach((blocks) => {
        let code = sbOptions.read(blocks, sbOptions);
        let parsed = sbOptions.parse(code, sbOptions);
        let svg = sbOptions.render(parsed, sbOptions);
        let container = doc.createElement("div");
        container.appendChild(svg);
        blocks.innerHTML = "";
        blocks.appendChild(container);
      });
      let codeblocks = Array.from(
        doc.querySelectorAll("code:not(.language-scratchblocks)")
      );
      codeblocks.forEach((el) => {
        let lang = el.classList[0]?.split("-")[1];
        el.setAttribute("data-language", lang);
        el.setAttribute("data-source", el.innerText);
        el.parentNode.classList.add("code-container");
        el.classList.add("code");
        let code = "";
        try {
          code = Rainbow.highlight(el.innerText, {
            language: el.getAttribute("data-language"),
          }).value;
        } catch (ex) {
          code = Rainbow.highlight(el.innerText, {
            language: "markdown",
          }).value;
        }

        el.innerHTML = code;
      });
      return doc.body.innerHTML;
    },
  },
};
</script>
<style>
div.rendered {
  padding: 10px;
}
.rendered {
  color: black;
}
div.rendered pre.code-container {
  padding: 20px;
  width: auto;
  height: auto;
  color: white;
  background-color: black;
  max-height: 400px;
  overflow: auto;
  border-radius: 5px;
}
</style>
