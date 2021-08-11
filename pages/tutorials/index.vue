<template>
  <div class="margined">
    <h1>Tutorials</h1>
    <a :href="tutorial.id" v-for="tutorial of tutorials" :key="tutorial.id">
      Id: {{ tutorial.id }}
      <br />
      Created: {{ new Date(tutorial.history.created.time) }} <br /><br />
    </a>
    <a href="new">
      <button>New</button>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tutorials: [],
    };
  },
  async mounted() {
    let { data } = await this.$axios.get("/api/tutorials/me");
    this.tutorials = data;
  },
};
</script>
