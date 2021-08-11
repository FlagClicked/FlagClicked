<template>
  <div class="margined">
    <h1>Tutorials</h1>
    <p>TODO <NuxtLink to="/tutorials/1">hi</NuxtLink></p>
  </div>
</template>

<script>
export default {
  async mounted() {
    // console.log(await this.$axios.$get("/api/tutorials"));
  },
};
</script>
