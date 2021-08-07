<template>
  <div class="margined">
    <h1>Login</h1>
    <h3>Your authentication code is: {{ code }}</h3>
    Comment this code in the
    <a target="_blank" :href="studioLink">Authentication Studio</a>
    and when you're done, click
    <button @click="finishAuth" v-if="code">here</button>
  </div>
</template>

<script>
export default {
  middleware: ["notauthenticated"],
  data() {
    return {
      studioLink: `https://scratch.mit.edu/studios/${process.env.studioId}/comments#frc-compose-3392903`,
      code: "",
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
    async finishAuth() {
      await fetch("/api/auth/login", {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          private: this._private,
          code: this.code,
        }),
        method: "PUT",
      });

      this.$store.dispatch("auth/refreshUserDetails");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
