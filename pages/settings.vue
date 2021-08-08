<template>
  <div class="margined">
    <h1>Settings</h1>
    <button @click="logout()">Logout</button>
  </div>
</template>
<script>
import cookies from "js-cookie";
export default {
  middleware: ["authenticated"],
  data() {
    return {};
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
<style>
button {
  background: white;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
