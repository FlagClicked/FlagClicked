<template>
  <client-only>
    <div class="rendered" v-html="renderedContent"></div>
  </client-only>
</template>
<script>
import allowedLanguages from "../assets/allowed-lang.js";
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
        if (!allowedLanguages.includes(lang)) lang = "markdown";
        el.setAttribute("data-language", lang);
        el.classList.add("CODE+" + Math.random()); // Unique ID
        el.source = el.innerHTML;
        el.innerHTML = Rainbow.highlight(el.innerHTML, {
          language: el.getAttribute("data-language"),
        }).value;
        el.classList.add("code");

        const code = el.outerHTML;

        const toReplace = el.parentNode.outerHTML;

        el.parentNode.parentNode.innerHTML.replace(toReplace, code);
      });
      return doc.body.innerHTML;
    },
  },
};
</script>
<style>
.rendered {
  background: white;
}
.rendered * {
  color: black;
}
code {
  padding: 20px;
  width: auto;
  height: auto;
  background-color: rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow: auto;
}
</style>
