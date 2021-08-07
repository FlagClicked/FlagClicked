<template>
  <div class="post">
    <Renderer :content="data.body" />
  </div>
</template>
<script>
export default {
  props: ["id", "data"],
  data() {
    return {
      author: "",
      body: ""
    };
  },
  async fetch() {
    if (this.data) return;
    let res = await fetch(`/api/tutorials/${this.id}`);
    let json = await res.json();
    this.data = json;
  }
};
</script>
