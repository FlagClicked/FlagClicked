<template>
  <div class="margined">
    <center>
      <div>
        <h2>This week's Featured Tutorial</h2>
        <h3>{{ tutorialName }} - {{ tutorialAuthor }}</h3>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tutorialName: "TutorialName",
      tutorialAuthor: "TutorialAuthor",
    };
  },
};
</script>

<style scoped>
.margined {
  margin: 88.5px;
  margin-top: 0px;
}
</style>
