<template>
  <div class="margined">
    <h1>Tutorials</h1>
    <NuxtLink
      :to="`/tutorials/${tutorial.id}`"
      v-for="tutorial of tutorials"
      :key="tutorial.id"
    >
      <div class="tutorial-item">
        <div class="tutorialId">#{{ tutorial.id }}</div>
        <div class="tutorialName">{{ tutorial.title }}</div>
        <div class="tutorialDate">
          {{ new Date(tutorial.history.created.time).toLocaleString() }}
        </div>
      </div>
      <br />
      <br />
    </NuxtLink>
    <NuxtLink to="/tutorials/new">
      <button>New</button>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
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
<style scoped>
.tutorial-item {
  padding: 3px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  gap: 2;
}

.tutorial-item * {
  gap: 2;
  margin-left: 10px;
}
</style>
