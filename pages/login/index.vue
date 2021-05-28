<template>
  <div>
    <p>You should be redirected to FluffyScratch Auth shortly...</p>
    <p>If you do not get redirected shortly, click <a :href="link">here</a>.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: null,
    };
  },
  mounted() {
    this.link = `https://fluffyscratch.hampton.pw/auth/getKeys/v2?redirect=${Buffer.from(
      window.location.host + "/login/finish",
      "utf-8"
    ).toString("base64")}`;
    window.location = this.link;
  },
};
</script>