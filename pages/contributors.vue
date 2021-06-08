<template>
  <div class="margined">
    <div class="row">
      <div v-for="user of users" class="contributor" :key="Math.random()">
        <a :href="user.profile">
          <img :src="user.avatar_url" class="contributor-icon" />
          <div class="contributor-info">
            <p class="contributor-name">{{ user.name }}</p>
            <div class="contributor-items">
              <div
                v-for="name of user.contributions"
                :title="icons[name].description"
                :key="Math.random()"
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
  data() {
    return {
      users: [],
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
    const contributors = await fetch(
      "https://raw.githubusercontent.com/FlagClicked/Contributors/master/.all-contributorsrc"
    ).then((res) => res.json());

    this.users = contributors;
  },
  fetchOnServer: false,
};
</script>
