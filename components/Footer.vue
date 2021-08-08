<template>
  <div>
    <img src="/blocks-banner.jpg" class="blocks-image" />
    <div class="footer" id="site-footer">
      <ul>
        <li>
          <Logo />
        </li>
        <li v-for="(col, i) of items" :key="i">
          <ul>
            <li v-for="(item, i) of col" :key="i">
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
          { text: "About", link: "/about" }
        ],
        [
          { text: "Tutorials", link: "/tutorials" },
          { text: "Markdown Tutorial", link: "/blog/md-tutorial" }
        ]
      ]
    };
  }
};
</script>
<style scoped>
.footer {
  background-color: #ffbf00;
  font-size: 30px;
  padding: 30px;
}
.blocks-image {
  display: block;
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

a {
  text-decoration: none;
  user-select: none;
}
</style>
