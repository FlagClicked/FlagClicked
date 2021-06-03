<template>
  <Renderer :content="body" />
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      author: "",
      body: "",
    };
  },
  async fetch() {
    let res = await fetch(`${process.env.backendURL}/tutorials/${this.id}`);
    let json = await res.json();
    this.body = json.body;
    this.author = json.author;
  },
};
</script>
