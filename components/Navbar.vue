<template>
  <div class="navbar">
    <NuxtLink class="item no-anim" to="/">
      <img src="/greenflag.svg" title="When Flag Clicked" />
      <span class="small version">ALPHA</span>
    </NuxtLink>
    <NuxtLink :to="item.link" class="item" v-for="(item, k) in items" :key="k">
      <span>{{ item.text }}</span>
    </NuxtLink>
    <NuxtLink to="/settings" class="item right" v-if="$auth.user">
      <img
        :src="`https://cdn2.scratch.mit.edu/get_image/user/${
          $auth.user.id
        }_500x500.png`"
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 0.125rem;
}

.item {
  padding: 2px;
  text-decoration: none;
  font-size: 28px;
  text-align: center;
  height: calc(100% - 10px);
}

.item:not(.no-anim):hover {
  background: #00000021;
}

.item img {
  width: 45px;
  height: 45px;
}

.right {
  grid-column: 9;
}

.small {
  font-size: 10px;
}

.version {
  background-color: #21bcff;
  padding: 2px;
  border-radius: 10px;
  border: 10px;
}
</style>
