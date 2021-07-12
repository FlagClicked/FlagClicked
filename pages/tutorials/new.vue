<template>
  <div class="container">
    <div class="margined">
      <div class="tutorial-editor">
        <div class="col">
          <input
            type="text"
            placeholder="Title"
            v-model="title"
          />
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
      let res = await fetch(`/api/tutorial/new`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          body: this.input,
          title: this.title,
        }),
        credentials: "include",
      });

      this.loading = false;
      let json = await res.json();

      if (json.id) return this.$router.push({ path: `/tutorials/${json.id}` });
    },
  }
};
</script>
<style>
.tutorial-editor {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.125rem;
  width: 100%;
  height: 100%;
}

.tutorial-editor .col * {
  width: 100%;
}

.tutorial-editor .col textarea {
  resize: none;
  padding: 20px;
  background: black;
  font-family: "Monaco", courier, monospace;
  width: 100%;
  height: 100%;
}

</style>