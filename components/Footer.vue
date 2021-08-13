<template>
  <div>
    <img src="/blocks-banner.jpg" class="blocks-image" />
    <div class="footer" id="footer">
      <ul>
        <li>
          <Logo />
        </li>
        <li v-for="(col, i) of items" :key="i">
          <ul>
            <li class="title">{{ col.name.toUpperCase() }}</li>
            <li v-for="(item, i) of col.items" :key="i">
              <p v-if="!item.link">{{ item.text }}</p>
              <NuxtLink v-if="item.link && !item.outside" :to="item.link">
                {{ item.text }}
              </NuxtLink>
              <a v-if="item.link && item.outside" :href="item.link">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <NuxtLink to="/contributors" class="copyright">
        © 2021 When Flag Clicked contributors
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: "About us",
          items: [
            { text: "About", link: "/about" },
            { text: "Contact", link: "/contact" },
            { text: "Contributors", link: "/contributors" },
          ],
        },
        {
          name: "Resources",
          items: [
            { text: "Tutorials", link: "/tutorials" },
            { text: "Markdown Tutorial", link: "/blog/md-tutorial" },
            {
              text: "GitHub",
              link: "https://github.com/FlagClicked/FlagClicked",
              outside: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
.footer {
  background-color: #ffbf00;
  font-size: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
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

.copyright {
  text-align: center;
  font-size: 22px;
  margin-top: 18px;
}

a {
  text-decoration: none;
  user-select: none;
}

.title {
  font-weight: 700;
}
</style>
