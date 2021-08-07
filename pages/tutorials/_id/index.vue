<template>
  <div class="margined">
    <div class="tutorial-container">
      <Tutorial v-if="fetched" :id="id" :data="fetched" />
    </div>
  </div>
</template>
<script>
import * as fetch from "node-fetch";
export default {
  head() {
    return {
      title: this.title,
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      fetched: null,
    };
  },
  async asyncData({ params, error, $tutorials }) {
    var tutorial;
    if ($tutorials) {
      tutorial = await $tutorials.get(params.id);
    } else {
      let res = await fetch(`/api/tutorial/${params.id}`);
      if (res.error == 404) this.layout = "error";

      tutorial = await res.json();
    }

    return { fetched: tutorial };
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
