<template>
  <div>
    <p v-if="this.error">There was an error logging in.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
    };
  },
  async asyncData(data) {
    //console.log(data.app);
    const privateCode = data.route.query.privateCode;
    if (privateCode) {
      const fluffyUser = await (
        await fetch(
          `https://fluffyscratch.hampton.pw/auth/verify/v2/${privateCode}`
        )
      ).json();
      if (fluffyUser.valid) {
        console.log(fluffyUser.user);
        // TODO: elegantly store the private code in a cookie
      } else {
        this.error = true;
      }
    }
  },
};
</script>