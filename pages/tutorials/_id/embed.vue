<template>
  <div class="container">
    <Tutorial :id="id" />
  </div>
</template>
<script>
  export default {
    head() {
      return { title: 'Embed Tutorial' }
    },
    
    data() {
      return {
        id: this.$route.params.id
       }
     }
  }
</script>
<style>
  .container { width: 100%; height: auto;}
</style>
