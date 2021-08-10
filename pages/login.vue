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
    let res = await fetch("/api/auth/init", {
      method: "PUT",
    }).then((res) => res.json());
    this._private = res.private;
    this.code = res.token;
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
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    },
    async finishAuth() {
      await fetch("/api/auth/login", {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          private: this._private,
          code: this.code,
        }),
        method: "PUT",
      });

      this.scratchWindow?.close();
      this.$store.dispatch("auth/refreshUserDetails");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
