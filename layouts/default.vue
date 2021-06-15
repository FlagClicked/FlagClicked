<template>
  <div class="container">
    <Navbar />
    <div class="main-content">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {};
</script>
<style>
*:not(code) {
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

.margined {
  margin-left: 88.5px;
}

@media only screen and (max-width: 500px) {
  .margined {
    margin-left: 5px;
  }
}
</style>
