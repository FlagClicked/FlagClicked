<template>
  <div class="margined">
    <div class="tutorial-container">
      <Tutorial :id="id" :data="fetched" />
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
      fetched: [],
    };
  },
  async asyncData({ req, params, error }) {
    req = process.server
      ? req
      : { protocol: window.location.protocol, Host: window.location.hostname };
    var res;
    var host = process.server ? `${req.protocol}://${req.get("Host")}` : "";

    try {
      res = await fetch(`${host}/api/tutorial/${params.id}`);
    } catch (ex) {
      this.layout = "error";
    }

    if (res.error == 404) this.layout = "error";

    res = await res.json();

    return { fetched: res };
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
