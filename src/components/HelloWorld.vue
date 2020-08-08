<template>
  <div class="hello">
    <br />
    <span class="padd center">
      Do I need to tell you to resize your browser window?
      <br />*cough* responsive *cough*
    </span>
    <h1 class="padd">v2.0</h1>
    <ul class="timeline">
      <li class="year first">2013</li>
      <li class="event" v-for="e in events" :key="e.id">
        <span class="meta">
          <span class="time">{{ e.timestamp }}</span>
          <span class="tag" v-for="t in e.tags" :key="t">{{ t }}</span>
        </span>
        <div class="md-result" v-html="e.htmlContent"></div>
      </li>
    </ul>
  </div>
</template>

<script>
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const events = require('../assets/data.json');
export default {
  name: "HelloWorld",
  data() {
    return {
      events: [],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    mdRender(mdStr) {
      return md.render(mdStr);
    },
  },
  mounted() {
    this.events = events;
    this.events.map(
      (e) => (e.htmlContent = this.mdRender(e.content))
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('/css/ie.css');
@import url('/css/print.css');
@import url('/css/screen.css');
@import url('/css/timeline.css');


/* line 166, ../sass/timeline.scss */
.event .meta {
  font-size: smaller;
  font-size-adjust: inherit;
  display: block;
  margin-bottom: 0.25em;
}

/* line 170, ../sass/timeline.scss */
.event .time {
  background-color: #505050;
  color: white;
  padding: 0 0.5em;
  width: auto;
  float: none;
  display: inline-block;
  border-radius: 5px;
  margin-right: 0.25em;
  margin-bottom: 0.25em;
}

/* line 180, ../sass/timeline.scss */
.event .tag {
  background-color: #ffdd40;
  color: #505050;
  width: auto;
  padding: 0 0.5em;
  display: inline-block;
  border-radius: 5px;
  margin-right: 0.25em;
}

.event .tag::before {
  content: "#";
}

.event .tag::after {
  content: "#";
}

.event .md-result {
  overflow: auto;
}

</style>