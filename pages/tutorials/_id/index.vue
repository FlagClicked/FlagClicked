<template>
  <div class="margined">
    <div class="tutorial-container">
      <Tutorial :id="id" :content="content" />
    </div>
  </div>
</template>
<script>
import * as fetch from "node-fetch";
export default {
  head() {
    return {
      title: "Tutorial",
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      content: [],
    };
  },
  async asyncData({ req, params, error }) {
    var res = await fetch(`${process.env.backendURL}/tutorial/${params.id}`);

    if (res.error !== 200)
      return error({
        statusCode: 404,
        message: "This tutorial cannot be found",
      });

    res = await res.json();

    this.content = res.body;
    this.title = `${res.title}`;
  },
};
</script>
<style>
.tutorial-container {
  width: 100%;
  height: auto;
  padding: 22px 22px;
}
</style>
