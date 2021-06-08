<template>
  <div class="footer" id="site-footer">
    <img src="/assets/blocks-banner.jpg" class="blocks-image"/>
    <ul>
      <li>
        <Logo />
      </li>
      <li v-for="col of items">
        <ul>
          <li v-for="item of col">
            <p v-if="!item.link">{{ item.text }}</p>
            <NuxtLink v-if="item.link" :to="item.link">
              {{ item.link }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
    <NuxtLink to="/contributors">
      <div class="footer-copyright">
        Copyright © FlagClicked Contributors
      </div>
    </NuxtLink>
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
      }
    }
  }
