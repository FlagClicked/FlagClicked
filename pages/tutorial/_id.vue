<template>
  <div class="container">
    <Navbar />
    <div class="margined">
      <div class="tutorial-container">
        <Tutorial :id="id" />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  head() {
    title: "Loading Tutorial";
  },
  data() {
    id: this.$route.params.id;
  },
  async fetch() {
    let res = await fetch(
      `${process.env.backendURL}/tutorial/${id}/title`
    ).then((r) => r.text());
    this.title = `${res} - When Flag Clicked`;
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
