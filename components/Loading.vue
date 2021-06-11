<template>
  <div class="container">
    <div class="spinner"></div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
  .spinner {
    animation: spin 4s infinite;
  }
  @keyframes spin {
    from { transform: rotate(0); }
    to { transform: rotate(360); }
  }
</style>
