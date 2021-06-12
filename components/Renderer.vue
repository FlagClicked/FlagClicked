<template>
  <div class="rendered" v-html="renderedContent"></div>
</template>
<script>
import * as marked from "marked";
import * as scratchblocks from "scratchblocks";
import * as linkedom from "linkedom";
export default {
  props: ["content"],
  data() {
    return {
      renderedContent: ""
    };
  },
  mounted() {
    let doc = (new window.DOMParser()).parseFromString(`<html><body>${this.content}</body></html>`, "text/html")
    
    let sbOptions = {
      style: "scratch3",
      inline: false,
      languages: ["en"],
      read: scratchblocks.read,
      parse: scratchblocks.parse,
      render: scratchblocks.render
    }
    
    let sb = Array.from(doc.querySelectorAll('code.lang-scratchblocks'))
    
    sb.forEach(blocks => {
      let code = options.parse(blocks, options)
      let parsed = options.parse(code, options)
      let svg = options.render(parsed, options)
      
      let container = doc.createElement('div')
      
      container.appendChild(svg)
      
      blocks.innerHTML = '';
      
      blocks.appendChild(container)
    })
    
    let codeblocks = Array.from(doc.querySelectorAll("code:not(.lang-scratchblocks)"))
    
    codeblocks.forEach(el => {
      el.setAttribute('data-language', el.classList[0]?.slice(5))
      // Rainbow.color(el.parentNode) // <<< TODO
    })
    
    this.renderedContent = doc.querySelector('body').innerHTML
  }
  ssr: false,
};
</script>
