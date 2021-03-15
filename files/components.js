app.component('navbar', {
  data() {
    return {
      items: [
        {
          text: "Tutorials",
          button: true
        },
        {
          text: "Voting",
          button: true,
          smallSize2: true
        },
        {
          text: "About",
          button: true,
          smallSize1: true
        },
        {
          text: "Sign In"
        },
        {
          text: "Create Account",
          smallSize1: true
        }
      ]
    }
  },
  props: [],
  template: `
  <div id="navbar">
    
    <ul>
      <li>
        <div id="block">
          when <img src="https://scratch.mit.edu/static/blocks-media/green-flag.svg"> clicked
        </div>
      </li>
      <li v-for="item of items" :data-smallsize1="item.smallSize1" 
      :data-smallsize2="item.smallSize2"
      :class="item.button ? 'button' : ''"><p>{{ item.text }}</p></li>
    </ul>
  </div>`
});
app.component('footerbar', {
  data() {
    return {
      columns: [
        [
          {
            text: "Contact Us"
          },
          {
            text: "About Us"
          }
        ],
        [
          {
            text: "Tutorials"
          },
          {
            text: "Stuff"
          }
        ]
      ]
    }
  },
  props: [],
  template: `
  <img src="/global/blocks.jpg" id="blocks-banner">
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
    <div id="copyright">Copyright 2021 © TheColaber</div>
  </div>`
});
app.mount('body');
