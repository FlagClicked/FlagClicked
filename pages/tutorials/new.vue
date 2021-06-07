<template>
  <div class="container">
    <Navbar />
    <div class="margined">
      <div class="tutorial-editor">
        <input
          type="text"
          placeholder="Title"
          @input="updateTitle"
          :value="title"
        />
        <textarea :value="input" @input="update"></textarea>
        <Renderer :content="input" />
      </div>
      <button @click="createTutorial">Create Tutorial</button>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
<script>
import cookies from "js-cookie";
export default {
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
    updateTitle(e) {
      this.title = e.target.value;
    },
    update(e) {
      this.input = e.target.value;
    },
    async createTutorial() {
      this.loading = true;
      let res = await fetch(`${process.env.backendURL}/tutorial/new`, {
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
  },
  mounted() {
    if (!cookies.get("auth")) this.$router.push({ path: "/login" });
  },
};
</script>
