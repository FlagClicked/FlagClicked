<template>
  <div class="post">
    <div class="user-box">
      <img
        :src="`https://cdn2.scratch.mit.edu/get_image/user/${data.author.id}_500x500.png`"
        class="pfp"
      />
      <p>{{ data.author.username }}</p>
    </div>
    <div class="renderer">
      <div class="tutorial-content">
        <Renderer :content="data.body" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id", "data"],
  data() {
    return {
      author: "",
      body: "",
    };
  },
  async fetch() {
    if (this.data) return;
    let res = await fetch(`/api/tutorials/${this.id}`);
    let json = await res.json();
    this.data = json;
  },
};
</script>
<style>
.post * {
  color: black !important;
}
.post {
  display: flex;
  background-color: white;
  border-radius: 10px;
  width: 80vw;
  font-weight: 400;
}

.user-box {
  padding: 22px;
}
.pfp {
  width: 90px;
  height: 90px;
}

.renderer {
  border-left: 1px black;
}
</style>
