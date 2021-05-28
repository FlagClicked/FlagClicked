<template>
  <div class="navbar">
    <NuxtLink class="item" to="/">
      <div class="block">
        <span
          >when
          <img
            src="https://scratch.mit.edu/static/blocks-media/green-flag.svg"
          />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        {
          text: "Log In",
          bold: true,
          href: "/login",
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
.button {
  cursor: pointer;
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
</style>