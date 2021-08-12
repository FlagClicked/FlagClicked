<template>
  <div class="container">
    <div class="margined">
      <div class="tutorial-editor">
        <div class="col">
          <input type="text" placeholder="Title" v-model="title" />
          <textarea v-model="input"></textarea>
          <button @click="createTutorial">Create Tutorial</button>
        </div>
        <Renderer :content="input" />
      </div>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
<script>
export default {
  middleware: ["authenticated"],
  head() {
    return {
      title: "Create Tutorial",
    };
  },
  data() {
    return {
      input: "",
      title: "",
      loading: false,
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
.tutorial-editor {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
}
.tutorial-editor .col textarea {
  resize: none;
  padding: 20px;
  font-family: "Monaco", courier, monospace;
  width: calc(100% - 60px);
  border: 1px black;
  border-radius: 10px;
  height: 90%;
}

.tutorial-editor .col textarea:hover {
  border: 1px lightblue;
}
input {
  padding: 10px;
}

.tutorial-editor .rendered {
  max-width: 90%;
  overflow: auto;
}
</style>
