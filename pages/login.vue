<template>
  <div>
    <div v-if="error">
      <p>
        There was an error trying to login.
        <a :href="link">Click here to try again</a>
      </p>
    </div>
    <div v-else>
      <p>You should be redirected to FluffyScratch Auth shortly...</p>
      <p>
        If you do not get redirected shortly, click <a :href="link">here</a>.
      </p>
    </div>
  </div>
</template>

<script>
import cookies from "js-cookie";
export default {
  data() {
    return {
      link: null,
      error: false,
      backEndURL: "//hly3v.sse.codesandbox.io",
    };
  },
  mounted() {
    if (cookies.get("auth")) {
      window.location = "/";
      return;
    }
    if (this.$route.query.error) {
      this.error = true;
      return;
    } else if (this.$route.query.token) {
      cookies.set("auth", this.$route.query.token);
      return;
    }
    this.link = `${process.env.backendURL}/auth/begin`
    window.location.href = this.link;
  },
};
</script>
