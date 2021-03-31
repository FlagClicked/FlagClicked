app.component("navbar", {
  data() {
    return {
      items: [
        {
          text: "Tutorials",
          button: true,
        },
        {
          text: "Voting",
          button: true,
          smallSize2: true,
        },
        {
          text: "About",
          button: true,
          smallSize1: true,
        },
        {
          text: "Sign In",
        },
        {
          text: "Create Account",
          smallSize1: true,
          bold: true,
          href: "/join",
        },
      ],
    };
  },
  props: [],
  template: `
  <div id="navbar">
    <ul>
    <a href="/">
      <li>
        <div id="block">
          when <img src="https://scratch.mit.edu/static/blocks-media/green-flag.svg"> clicked
        </div>
      </li>    
    </a>

      <a
      :href="item.href"
      :data-smallsize1="item.smallSize1" 
      :data-smallsize2="item.smallSize2"
      v-for="item of items">
      <li
      :class="item.button ? 'button' : ''"
      :style="item.bold ? 'font-weight: 500' : ''"><p>{{ item.text }}</p></li>
      </a>
    </ul>
  </div>`,
});
app.component("footerbar", {
  data() {
    return {
      columns: [
        [
          {
            text: "Contact Us",
          },
          {
            text: "About Us",
          },
        ],
        [
          {
            text: "Tutorials",
          },
          {
            text: "MD Tutorial",
          },
        ],
      ],
    };
  },
  props: [],
  template: `
  <img src="/assets/blocks.jpg" id="blocks-banner">
  <div id="footer">
    <ul>
      <li>
        <div id="block">
          when <img src="https://scratch.mit.edu/static/blocks-media/green-flag.svg"> clicked
        </div>
      </li>
      <li v-for="column of columns">
        <ul>
          <li v-for="item of column">{{ item.text }}</li>
        </ul>
      </li> 
    </ul>
    <div id="copyright">Copyright 2021 © TheColaber
    <iframe src="https://ghbtns.com/github-btn.html?user=FlagClicked&repo=FlagClicked&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub" style="position:relative;top:6px;"></iframe>
    <iframe src="https://ghbtns.com/github-btn.html?user=FlagClicked&repo=FlagClicked&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub" style="position:relative;top:6px;right:50px;"></iframe>
    </div>
  </div>`,
});
app.mount("body");
