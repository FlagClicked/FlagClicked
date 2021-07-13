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
      error: !!this.$route.query.error || false,
      code: "",
    };
  },
  async mounted() {
    let res = await fetch(`/api/auth/init`, { method: "PUT" });
    let json = await res.json();
    this._private = json.private;
    this.code = json.token;
  },
  methods: {
    async finishAuth() {
      let res = await fetch(`/api/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          private: this._private,
          public: this.code,
        }),
      });


      this.$store.dispatch("auth/refreshUserDetails");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
