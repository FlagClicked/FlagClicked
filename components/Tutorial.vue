<template>
  <div class="post no-white">
    <div class="user-box">
      <a :href="`https://scratch.mit.edu/users/${data.author.username}`">
        <img
          :src="`https://cdn2.scratch.mit.edu/get_image/user/${data.author.id}_500x500.png`"
          class="pfp"
        />
        <p>{{ data.author.username }}</p>
      </a>
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
    return {};
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
.post {
  color: black;
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
  border-right-color: black;
  border-right-width: 2px;
}
.pfp {
  width: 90px;
  height: 90px;
}

.renderer {
  border-left: 1px black;
}

.post a {
  color: black;
  text-decoration: none;
}
</style>
