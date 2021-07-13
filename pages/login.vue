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
    let res = (await this.$axios.$put(`/api/auth/init`));
    this._private = res.private;
    this.code = res.token;
  },
  methods: {
    async finishAuth() {
      await this.$axios.$put(`/api/auth/login`, {
          private: this._private,
          public: this.code,
        });

      this.$store.dispatch("auth/refreshUserDetails");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
