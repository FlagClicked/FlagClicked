<template>
  <div>
    <div v-if="$auth.isLoggedIn">
      <div class="hero-banner" v-if="!tutorial">
        <h1 class="gold">FlagClicked</h1>
        <span class="md"
          >The new tutorials platform for scratchers, from scratchers.</span
        >
        <br />
      </div>

      <h2 v-if="tutorial">This week's Featured Tutorial</h2>
      <div
        class="admin-button"
        v-if="$auth.user.admin"
        @click="featuredTutorialSet()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <h3 v-if="tutorial && tutorial.author.username">
        <span v-if="tutorial.title">{{ tutorial.title }}</span> -
        <span v-if="tutorial.author">{{ tutorial.author.username }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { tutorial: null };
  },
  async asyncData({ $tutorials, $axios }) {
    let tutorial;
    if (process.server) {
      tutorial = await $tutorials.raw.findOne({ featured: true });
    } else {
      let { data } = await $axios.get(`/api/tutorial/featured`);
      if (!data.error) tutorial = data;
    }

    return { tutorial };
  },
  methods: {
    async featuredTutorialSet() {
      // TODO: Make our own modals
      let id = prompt("Set the featured tutorial to:", 1);
      if (id == null) return;
      let res = await fetch(`/api/tutorial/${id}`);
      if (res.status == 404) {
        return alert("This tutorial does not exist!");
      }

      let tutorial = await res.json();

      res = await fetch(`/api/tutorial/featured`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          id: Number(id),
        }),
      });

      let json = await res.json();

      if (res.status == 200) {
        this.tutorial = tutorial;
      }
    },
  },
};
</script>

<style scoped>
.hero-banner {
  display: grid;
  padding-left: 7rem;
  text-align: left;
  background-color: #fff;
}

.hero-banner * {
  color: #111;
}

body {
  margin: 0;
}

.gold {
  color: #ffbf00;
}

.blue {
  color: #21bcff;
}

.md {
  font-size: 20px;
}

.admin-button {
  cursor: pointer;
}
</style>
