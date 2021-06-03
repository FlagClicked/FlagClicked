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
        requestAnimationFrame(renderCodeBlocks);
        
        
        function addEmbeds(html) {
          return html.replace(/\$<a href="(.*?)">(.*?)<\/a>/g, (match, url, title) => `<iframe width="560" height="315" src="https://www.youtube.com/embed/${/(\/youtube\/|\?v=)(.*?)($|\/|&|#)/.exec(url[2]).replace(/"/g, '\\"')}" title="${title.replace(/"/g,'\\"')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`).replace(/<a href="(\d+)">(project|turbowarp)<\/a>/g,(match, id, website) =>`<iframe src="https://${website === "turbowarp"? "turbowarp.org": "scratch.mit.edu/projects"}/${id}/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>`;)
        };
        
        return addEmbeds(marked(this.content, { sanitize: true }))
      }
    }
  }
</script>
