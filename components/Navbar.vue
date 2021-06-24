<template>
  <div class="navbar">
    <NuxtLink class="item" to="/">
      <div class="block">
        <span
          >when
          <img src="/greenflag.svg" />
          clicked</span
        >
      </div>
    </NuxtLink>
    <NuxtLink
      v-for="item of items"
      :key="item.text"
      :to="{ path: item.href }"
      :data-smallsize="item.smallSize"
      class="item"
    >
      <span
        :class="item.button ? 'button' : ''"
        :style="item.bold ? 'font-weight: 500' : ''"
        >{{ item.text }}</span
      >
    </NuxtLink>
    <NuxtLink :to="userLink" class="item">
      <span style="font-weight: 500">
        <p v-if="$auth.user()">
          {{ $auth.user().username }}
          <img
          :src"`https://cdn2.scratch.mit.edu/get_image/user/${$auth.user().id}_50x50.png`"
          />
        </p>
        <p v-if="!$auth.user()">Login</p>
      </span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLink: this.$auth.user()
        ? `/user/${this.$auth.user().username}`
        : "/login",
      items: [
        {
          text: "Tutorials",
          button: true,
          href: "/tutorials",
        },
        {
          text: "About",
          button: true,
          href: "/about",
        },
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  --padding: 20px;
  background: #ffbf00;
  height: 80px;
  position: absolute;
  width: calc(100% - var(--padding) * 2);
  display: flex;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  padding: 0px var(--padding);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}

.block {
  display: flex;
  width: 350px;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
}
.block img {
  margin: 0 10px;
  height: 50px;
}
.item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: default;
  height: 100%;
}
.button {
  text-align: center;
  width: 120px;
  background: white;
  color: #5d657c;
  padding: 10px;
  border-radius: 20pc;
  border: #00000045 solid 2px;
  margin: 0;
}
.navbar span:not(.button) {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark-mode .navbar {
  background-color: #570600;
}
.button {
  cursor: pointer;
}
.dark-mode .button {
  cursor: pointer;
  background-color: #380400;
  color: white;
}
.navbar span:not(.button):hover {
  background: #00000021;
}
.button:hover {
  border: none;
  box-shadow: 0px 0px 8px #888888;
  background: linear-gradient(
    90deg,
    rgba(250, 250, 250, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(250, 250, 250, 1) 100%
  ); /*very unnoticable gradient when hover*/
}
.dark-mode .button:hover {
  box-shadow: 0px 0px 8px #ffffff;
  text-shadow: 0 0 10px #ffffff;
  background: linear-gradient(
    90deg,
    #260300 0%,
    #380400 50%,
    #260300 100%
  ); /*very unnoticable gradient when hover*/
}
</style>
