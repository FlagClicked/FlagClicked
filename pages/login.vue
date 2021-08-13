<template>
  <div class="margined">
    <h1>Login</h1>
    <h3>
      Your authentication code is: {{ code }}
      <button @click="copyCode">{{ copied ? "Copied" : "Copy" }}</button>
    </h3>
    Comment this code in the
    <button @click="openStudio">Authentication Studio</button>
    and when you're done, click
    <button @click="finishAuth" v-if="code">here</button>
  </div>
</template>

<script>
export default {
  middleware: ["notauthenticated"],
  data() {
    return {
      code: "",
      copied: false,
    };
  },
  async mounted() {
    let { data } = await this.$axios.put("/api/auth/init");
    this._private = data.private;
    this.code = data.token;
  },
  methods: {
    openStudio() {
      this.scratchWindow = window.open(
        `https://scratch.mit.edu/studios/${process.env.studioId}/comments`,
        "_blank",
        "height=600,width=780"
      );
    },
    copyCode() {
      navigator.clipboard.writeText(this.code);
      let self = this;
      this.copied = true;
      setTimeout(() => {
        self.copied = false;
      }, 3000);
    },
    async finishAuth() {
      await this.$axios.put(
        "/api/auth/login",
        {
          private: this._private,
          code: this.code,
        },
        {
          headers: { "content-type": "application/json" },
        }
      );

      this.scratchWindow?.close();
      this.$store.dispatch("auth/refreshUserDetails");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
