<template>
  <div class="margined">
    <h1>{{ page.title }}</h1>
    <h3>by {{ page.author }}</h3>
    <nuxt-content :document="page" />
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: this.page.title,
    };
  },
  data() {
    return {
      author: "FlagClicked Team",
    };
  },
  async asyncData({ $content, params, error }) {
    const page = await $content("blog", params.slug || "index")
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "This page could not be found" });
      });

    return { page };
  },
};
</script>