<template>
  <div class="renderedContent" v-html="renderedContent"></div>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {}
  },
  computed: {
    renderedContent() {
      const renderCodeBlocks = () => {
        if (!document.querySelector(".scratchblocks")) {
          scratchblocks.renderMatching("code.lang-scratchblocks", {
            style: "scratch3"
          })
        }
        let codeblocks = Array.from(document.querySelectorAll("code:not(.lang-scratchblocks)"));

        codeblocks.forEach((el) => {
          el.setAttribute("data-language", el.classList[0]?.slice(5));
          Rainbow.color(el.parentNode);
        })
      };
      renderCodeBlocks()

      return (marked(this.content, { sanitize: true }))
    }
  }
}
</script>
