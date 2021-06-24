<template>
  <div>
    <img src="/blocks-banner.jpg" class="blocks-image" />
    <div class="footer" id="site-footer">
      <ul>
        <li>
          <Logo />
        </li>
        <li v-for="col of items" :key="items.indexOf(col)">
          <ul>
            <li v-for="item of col" :key="col.indexOf(item)">
              <p v-if="!item.link">{{ item.text }}</p>
              <NuxtLink v-if="item.link" :to="item.link">
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
      <NuxtLink to="/contributors">
        <div class="footer-copyright">Copyright © FlagClicked Contributors</div>
      </NuxtLink>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        [
          { text: "Contact us", link: "/contact" },
          { text: "About", link: "/about" },
        ],
        [
          { text: "Tutorials", link: "/tutorials" },
          { text: "Markdown Tutorial", link: "/blog/md-tutorial" },
        ],
      ],
    };
  },
};
</script>
<style scoped>
.footer {
  background-color: #ffbf00;
  height: calc(var(--navbarHeight) / 2);
  position: absolute;
  width: 100%;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  padding: calc(var(--navbarHeight) / 4) 0px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  display: block;
  height: 100px;
  padding: 30px;
}
.blocks-image {
  margin: 0px;
  margin-left: 0px;
  height: auto;
  width: 100%;
}

.footer > ul {
  list-style: none;
  display: flex;
  flex: 1;
  margin: 0;
  padding: 0;
}

.footer ul ul {
  display: block;
  font-size: 20px;
}

.footer ul li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-copyright {
  text-align: center;
  font-size: 22px;
  margin-top: 18px;
}
</style>
