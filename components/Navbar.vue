<template>
  <div class="navbar">
    <NuxtLink class="item" to="/">
      when
      <img src="/greenflag.svg" class="logo" />
      clicked
      <span class="version">ALPHA</span>
    </NuxtLink>
    <div class="item" v-for="(item, k) in items" :key="k">
      <NuxtLink class="button" :to="item.link">{{ item.text }}</NuxtLink>
    </div>
    <NuxtLink to="/settings" class="item" v-if="$auth.user">
      <span class="username">{{ $auth.user.username }}</span>
      <img
        :src="
          `https://cdn2.scratch.mit.edu/get_image/user/${$auth.user.id}_500x500.png`
        "
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
          text: "Explore",
          link: "/explore"
        },
        {
          text: "My Tutorials",
          link: "/tutorials/"
        },
        {
          text: "New Tutorial",
          link: "/tutorials/new"
        }
      ]
    };
  }
};
</script>
<style scoped>
.navbar {
  --brand: #ffbf00;
  background: var(--brand);
  display: flex;
}

.item {
  display: flex;
  font-size: 28px;
  align-items: center;
  user-select: none;
  height: 65px;
  justify-content: center;
  flex: 1;
  text-decoration: none;
}
.button {
  display: flex;
  justify-content: center;
  color: #5d657c;
  background: white;
  border-radius: 20pc;
  border: #00000045 solid 2px;
  padding: 4px 10px;
  text-decoration: none;
}

.button:hover {
  border-width: 0px;
  box-shadow: 0px 0px 8px #888888;
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
  margin-left: 10px;
}

.username {
  padding: 0px 20px;
}

.logo {
  padding: 0px 4px;
}

* {
  max-width: 100vw;
}
</style>
