<template>
  <div class="margined">
    <div class="tutorial-container">
      <Tutorial v-if="tutorial" :id="id" :data="tutorial" />
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      tutorial: null,
      error: null
    };
  },
  async asyncData({ params, error, $tutorials }) {
    let tutorial;
    if ($tutorials) {
      tutorial = await $tutorials.get(params.id);
      if (!tutorial) error("Tutorial does not exist!");
    } else {
      let res = await fetch(`/api/tutorial/${params.id}`);
      if (res.status == 404) {
        error("Tutorial does not exist!");
      } else {
        tutorial = await res.json();
      }
    }

    return { tutorial };
  }
};
</script>
<style>
.tutorial-container {
  width: 100%;
  height: auto;
  padding: 22px 22px;
}
</style>
