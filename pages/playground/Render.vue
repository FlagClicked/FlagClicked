<template>
  <div class="margined">
    <h1>{{ title }}</h1>
    <h3>by {{ author.user }}</h3>
    <Renderer :content="page" />
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Render Playground",
    };
  },
  data() {
    return {
      author: {
        user: "9gr",
        scratch: "9gr",
      },
      title: "Render Playground",
      page: `# JS
\`\`\`javascript
console.log("Hello, World!")
\`\`\`

# Scratchblocks
\`\`\`scratchblocks
when gf clicked
say [Hello, world!]
\`\`\`
`,
    };
  },
};
</script>
