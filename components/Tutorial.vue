<template>
  <Renderer :content="body" />
</template>
<script>
export default {
  props: ["id", "data"],
  data() {
    return {
      author: "",
      body: "",
    };
  },
  async fetch() {
    if (this.data) {
      this.body = this.data.body;
      this.author = this.data.author;
      return
    }
    let res = await fetch(`${process.env.backendURL}/tutorials/${this.id}`);
    let json = await res.json();
    this.body = json.body;
    this.author = json.author;
  },
};
</script>
