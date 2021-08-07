<template>
  <div class="navbar">
    <NuxtLink class="item no-anim" to="/">
      when
      <img src="/greenflag.svg" />
      clicked
      <span class="version">ALPHA</span>
    </NuxtLink>
    <NuxtLink
      :to="item.link"
      class="item button"
      v-for="(item, k) in items"
      :key="k"
    >
    <span>{{ item.text }}</span>
    </NuxtLink>
    <NuxtLink to="/settings" class="item right" v-if="$auth.user">
      <img
        :src="`https://cdn2.scratch.mit.edu/get_image/user/${$auth.user.id}_500x500.png`"
      />
    </NuxtLink>
    <NuxtLink to="/login" class="item right" v-else>
      <span>Login</span>
    </NuxtLink>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Tutorials",
          link: "/tutorials",
        },
      ],
    };
  },
};
</script>
<style scoped>
.navbar {
  --brand: #ffbf00;
  background: var(--brand);
  height: 50px;
  display: flex;
}

.item {
  display: flex;
  padding: 0px 10px;
  text-decoration: none;
  font-size: 28px;
  align-items: center;
  user-select: none;
}
.button {
  justify-content: center;
  margin: 2px 0px;
  flex: 1;
}
.button span {
  display: flex;
  justify-content: center;
  color: #5d657c;
  background: white;
  padding: 2px;
  border-radius: 20pc;
  border: #00000045 solid 2px;
  width: 120px;
}

.button span:hover {
  border: none;
  box-shadow: 0px 0px 8px #888888;
}
.item:not(.no-anim):not(.button):hover {
  background: #00000021;
}

.item img {
  width: 45px;
  height: 45px;
}

.right {
  margin-left: auto;
}

.version {
  font-size: 10px;
  background-color: #21bcff;
  padding: 2px;
  border-radius: 10px;
  border: 10px;
}
</style>
