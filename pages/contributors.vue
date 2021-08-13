<template>
  <div class="margined" style="text-align: center">
    <h1>Below is a list of users who have contributed to the website.</h1>
    <h2>
      Have you contributed and you're not listed here?
      <a href="https://github.com/FlagClicked/Contributors/issues/1"
        >Get credited!</a
      >
    </h2>
    <Loading v-if="loading" />
    <div class="row" v-else>
      <div
        v-for="(user, index) of users.contributors"
        class="contributor"
        :key="index"
      >
        <a :href="user.profile">
          <img :src="user.avatar_url" class="contributor-icon" />
          <div class="contributor-info">
            <p class="contributor-name" style="text-align: left">
              {{ user.name }}
            </p>
            <div class="contributor-items">
              <div
                v-for="(name, key) of user.contributions"
                :title="icons[name].description"
                :key="key"
              >
                {{ icons[name].symbol }}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Contributors",
    };
  },
  data() {
    return {
      users: [],
      loading: true,
      icons: {
        a11y: {
          symbol: "\ufe0f\ufe0f\ufe0f\ufe0f\u267f\ufe0f",
          description: "Accessibility",
        },
        audio: {
          symbol: "\ud83d\udd0a",
          description: "Audio",
        },
        blog: {
          symbol: "\ud83d\udcdd",
          description: "Blogposts",
        },
        bug: {
          symbol: "\ud83d\udc1b",
          description: "Bug reports",
        },
        business: {
          symbol: "\ud83d\udcbc",
          description: "Business development",
        },
        code: {
          symbol: "\ud83d\udcbb",
          description: "Code",
        },
        content: {
          symbol: "\ud83d\udd8b",
          description: "Content",
        },
        data: {
          symbol: "\ud83d\udd23",
          description: "Data",
        },
        design: {
          symbol: "\ud83c\udfa8",
          description: "Design",
        },
        doc: {
          symbol: "\ud83d\udcd6",
          description: "Documentation",
        },
        eventOrganizing: {
          symbol: "\ud83d\udccb",
          description: "Event Organizing",
        },
        example: {
          symbol: "\ud83d\udca1",
          description: "Examples",
        },
        financial: {
          symbol: "\ud83d\udcb5",
          description: "Financial",
        },
        fundingFinding: {
          symbol: "\ud83d\udd0d",
          description: "Funding Finding",
        },
        ideas: {
          symbol: "\ud83e\udd14",
          description: "Ideas, Planning, & Feedback",
        },
        infra: {
          symbol: "\ud83d\ude87",
          description: "Infrastructure (Hosting, Build-Tools, etc)",
        },
        maintenance: {
          symbol: "\ud83d\udea7",
          description: "Maintenance",
        },
        mentoring: {
          symbol: "\ud83e\uddd1\u200d\ud83c\udfeb",
          description: "Mentoring",
        },
        platform: {
          symbol: "\ud83d\udce6",
          description: "Packaging/porting to new platform",
        },
        plugin: {
          symbol: "\ud83d\udd0c",
          description: "Plugin/utility libraries",
        },
        projectManagement: {
          symbol: "\ud83d\udcc6",
          description: "Project Management",
        },
        question: {
          symbol: "\ud83d\udcac",
          description: "Answering Questions",
        },
        review: {
          symbol: "\ud83d\udc40",
          description: "Reviewed Pull Requests",
        },
        security: {
          symbol: "\ud83d\udee1\ufe0f",
          description: "Security",
        },
        talk: {
          symbol: "\ud83d\udce2",
          description: "Talks",
        },
        test: {
          symbol: "\u26a0\ufe0f",
          description: "Tests",
        },
        tool: {
          symbol: "\ud83d\udd27",
          description: "Tools",
        },
        translation: {
          symbol: "\ud83c\udf0d",
          description: "Translation",
        },
        tutorial: {
          symbol: "\u2705",
          description: "Tutorials",
        },
        userTesting: {
          symbol: "\ud83d\udcd3",
          description: "User Testing",
        },
        video: {
          symbol: "\ud83d\udcf9",
          description: "Videos",
        },
      },
    };
  },
  async fetch() {
    const { data } = await this.$axios.get(
      "https://raw.githubusercontent.com/FlagClicked/Contributors/master/.all-contributorsrc"
    );

    this.loading = false;
    this.users = data;
  },
  fetchOnServer: false,
};
</script>

<style scoped>
.contributor {
  color: inherit;
  border-radius: 5px;
  border: 1.5px #00000030 solid;
  transition: background-color 0.15s ease-in-out;
  flex: 0 0 33.333333%;
  max-width: 20%;
  margin: 10px;
}
.contributor a {
  padding: 0.375rem 15px;
  color: inherit;
  display: flex;
  text-decoration: none;
}
.contributor-icon {
  margin-right: 0.75rem;
  height: 64px;
  width: 64px;
}
.contributor-info {
  display: flex;
  flex: 1 0 0;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
}
.contributor-name {
  font-size: 1.25rem;
  line-height: 1;
  word-break: break-all;
  margin: 0;
}
.contributor-items {
  display: flex;
}
.contributor:hover {
  background: #00000030;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
}
</style>
