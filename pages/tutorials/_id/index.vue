<template>
  <div class="container">
    <Navbar />
    <div class="margined">
      <div class="tutorial-container">
        <Tutorial :id="id" :content="content" />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
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
  async fetch() {
    let res = await fetch(`${process.env.backendURL}/tutorial/${id}`).then(
      (r) => r.json()
    );
    this.content = res;
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
