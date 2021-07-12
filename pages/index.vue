<template>
  <div>
    <center>
      <div v-if="$auth.isLoggedIn()" class="margined">
        <h2>This week's Featured Tutorial</h2>
        <h3>{{ tutorialName }} - {{ tutorialAuthor }}</h3>
      </div>
      <div v-else class="hero-banner">
        <h1 class="gold">FlagClicked<span class="blue">.</span></h1>
        <span class="md">The new tutorials platform for scratchers, from scratchers.</span>
        <br />
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

.hero-banner {
  display: grid;
  padding-left: 7rem;
  text-align: left;
  background-color: #FFF;
}

.hero-banner * {
  color: #111;
}

body { margin: 0;}

.gold {color: #FFBF00;}

.blue {color: #21bcff;}

.md {font-size: 20px;}
</style>
