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
.dark-mode body {
  background-color: #000000 !important;
  color: #ebf4f1;
}
.dark-mode option {
  background-color: black;
  color: #ebf4f1;
}
.dark-mode .blocks-image {
  filter: invert(1);
  opacity: 0;
}
option {
  color: black;
}
.dark-mode select {
  background: black;
  color: white;
}
select {
  color: black;
  border-radius: 3px;
}
[class*="hljs"] {
  font-family: monospace;
}
</style>
