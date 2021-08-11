<template>
  <div class="container">
    <div class="margined">
      <div class="tutorial-editor">
        <div class="col">
          <input type="text" placeholder="Title" v-model="title" />
          <textarea v-model="input"></textarea>
        </div>
        <Renderer :content="input" />
      </div>
      <button @click="createTutorial">Create Tutorial</button>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
<script>
export default {
  middleware: ["authenticated"],
  head() {
    return {
      title: "Create Tutorial"
    };
  },
  data() {
    return {
      input: "",
      title: "",
      loading: false
    };
  },
  methods: {
    async createTutorial() {
      this.loading = true;
      let { data } = await this.$axios.put(
        `/api/tutorial/new`,
        {
          body: this.input,
          title: this.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      this.loading = false;

      if (data.id) return this.$router.push({ path: `/tutorials/${data.id}` });
    },
  },
};
</script>
<style>
.tutorial-editor .col textarea {
  resize: none;
  padding: 20px;
  font-family: "Monaco", courier, monospace;
  width: 100%;
  height: 100%;
}
</style>
