<template>
  <div class="margined">
    <h1>Login</h1>
    <h2>Login to FlagClicked</h2>
    <h3>Your authentication code is: {{ code }}</h3>
    <h4>Comment this code in the <a @click="openStudioComments()" class="studioLink">Authentication Studio</a> to complete login.</h4>
    <h2>When you're done, press the below button.</h2>
    <button @click="finishAuth()" v-if="code">Login</button>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  middleware: ['notauthenticated'],
  data() {
    return {
      link: null,
      error: !!this.$route.query.error || false,
      code: ""
    };
  },
  async mounted() {
    let res = await fetch(`/api/auth/init`, { method: "PUT" })
    let json = await res.json()
    this._private = json.private
    this.code = json.token
  },
  methods: {
    openStudioComments() {
      window.open(`https://scratch.mit.edu/studios/${process.env.studioId}/comments#frc-compose-3392903`, 'Authentication Studio - When Flag Clicked')
    },
    async finishAuth() {
      let res = await fetch(`/api/auth/login`, {
        headers: {"Content-Type": "application/json"},
        method: "PUT",
        body: JSON.stringify({
          private: this._private,
          public: this.code
        })
      })

      let { token } = await res.json()

      cookie.set('token', token)

      this.$store.dispatch("auth/refreshUserDetails", { token })
      this.$router.push({path: "/"})
    }
  }
};
</script>
<style>
.studioLink {
  cursor: pointer;
}
</style>
