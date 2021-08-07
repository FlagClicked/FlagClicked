<template>
  <div class="margined">
    <center>
      <div v-if="error.statusCode === 404">
        <h1>Our server is having issues finding this page</h1>
        <Error404 height="400" />
        <p>
          The server is having an issue finding this page. Make sure you've
          typed the URL correctly.
        </p>
      </div>
      <h1 v-else>An error occurred when trying to load this page.</h1>
      <h3>Error encountered: {{ error.message }}</h3>
      <p>Go back to the <NuxtLink to="/">Home page</NuxtLink></p>
    </center>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error",
};
</script>
