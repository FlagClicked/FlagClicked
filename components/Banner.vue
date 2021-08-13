<template>
  <div class="grid">
    <div class="col">
      <Logo />
    </div>
    <div class="col col-2">
      <h3>is currently in development. Please keep an open mind!</h3>
      <h5>Please give feedback and report bugs in the forum topic.</h5>
    </div>
    <div class="col">
      <a class="button" href="https://scratch.mit.edu/discuss/topic/494379/"
        >Forum Topic</a
      >
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.grid {
  display: grid;
  width: 100%;
  height: 120px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.col-2 {
  grid-column: span 2;
}
</style>
