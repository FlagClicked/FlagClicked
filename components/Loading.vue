<template>
  <div class="container">
    <img src="/greenflag.svg" class="spinner" />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.spinner {
  animation: spin 1s infinite;
  width: 50px;
  height: 50px;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
