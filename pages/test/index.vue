<template>
  <Renderer :content="data" />
</template>
<script>
export default {
  data() {
    return {
      data: `
        \`\`\`scratchblocks
        when green flag clicked
        \`\`\`
        `,
    };
  },
};
</script>
