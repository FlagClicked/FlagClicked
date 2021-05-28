<template>
  <div class="container">
    <Navbar />
    <Nuxt class="content" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: { Navbar },
};
</script>
<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  color: white;
}

body {
  margin: 0px;
  background: #21bcff;
}

.content {
  padding-top: 80px;
}
</style>
