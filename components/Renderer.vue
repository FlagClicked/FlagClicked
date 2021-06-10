<template>
  <div class="rendered" v-html="renderedContent"></div>
</template>
<script>
import * as marked from "marked";
import * as scratchblocks from "scratchblocks";

export default {
  props: ["content"],
  data() {
    return {};
  },
  computed: {
    renderedContent() {
      let parseHTML;
      if (process.server) return;
      // from https://github.com/jeffalo/ocular/blob/main/components/Render.vue
      let _document = parseHTML(
        `<html><body>${marked(this.content)}</body></html>`
      );

      let options = {
        style: "scratch3",
        inline: false,
        languages: ["en"],

        read: scratchblocks.read,
        parse: scratchblocks.parse,
        render: scratchblocks.render,
      };

      let results = Array.from(
        _document.querySelectorAll("code.lang-scratchblocks")
      );

      results.forEach((scratchblocks) => {
        let code = options.read(scratchblocks, options);
        let parsed = options.parse(code, options);
        let svg = options.render(parsed, options);

        let container = _document.createElement("div");
        container.classList.add("scratchblocks");

        container.appendChild(svg);

        scratchblocks.innerHTML = "";

        scratchblocks.appendChild(container);
      });

      let codeblocks = Array.from(
        document.querySelectorAll("code:not(.lang-scratchblocks)")
      );

      codeblocks.forEach((el) => {
        el.setAttribute("data-language", el.classList[0]?.slice(5));
        Rainbow.color(el.parentNode);
      });

      return _document.querySelector("body").innerHTML;
    },
  },
  ssr: false,
};
</script>
