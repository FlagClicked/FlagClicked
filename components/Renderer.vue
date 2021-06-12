<template>
  <client-only>
    <div class="rendered" v-html="renderedContent"></div>
  </client-only>
</template>
<script>
import * as marked from "marked";

export default {
  props: ["content"],
  data() {
    return {
      renderedContent: "",
    };
  },
  mounted() {
    let doc = new window.DOMParser().parseFromString(
      `<html><body>${marked(this.content)}</body></html>`,
      "text/html"
    );

    let sbOptions = {
      style: "scratch3",
      inline: false,
      languages: ["en"],
      read: window.scratchblocks.read,
      parse: window.scratchblocks.parse,
      render: window.scratchblocks.render,
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
      el.setAttribute("data-language", el.classList[0]?.split("-")[1]);
      // Rainbow.color(el.parentNode) // <<< TODO
    });

    this.renderedContent = doc.querySelector("body").innerHTML;
  },
};
</script>
