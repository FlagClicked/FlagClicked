<template>
  <div class="container">
    <!-- <Banner /> -->
    <Navbar />
    <div class="content"><Nuxt /></div>
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
}
*:not(code, button, input, textarea) {
  color: #fff;
}

body {
  margin: 0px;
  background: #21bcff;
  overflow-x: hidden;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
}

.margined {
  margin-left: 88.5px;
  margin-right: 88.5px;
}

@media only screen and (max-width: 500px) {
  .margined {
    margin-left: 5px;
    margin-right: 5px;
  }
}

[class*="hljs"] {
  font-family: monospace;
}

button {
  padding: 10px;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  background-color: #ffbf00;
  cursor: pointer;
  border-color: #fff;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
}
</style>
