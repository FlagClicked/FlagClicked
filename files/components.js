app.component("navbar", {
  data() {
    return {
      items: [
        {
          text: "Tutorials",
          button: true,
        },
        {
          text: "About",
          button: true,
        },
        {
          text: "Log In",
          bold: true,
          href: "/login",
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
      :data-smallsize="item.smallSize" 
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
    <a href="/contributors"><div id="copyright">Copyright 2021 © Contributors</div></a>
  </div>`,
});
app.mount("body");
