<template>
  <div
    v-infinite-scroll="loadNextPage"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="50"
  >
    <ul class="timeline">
      <template v-for="y in yearIndexs">
        <li class="year first" :key="y">{{ y }}</li>
        <li class="event" v-for="e in years[y]" :key="e.id">
          <span class="meta">
            <span class="time">{{ e.timestamp }}</span>
            <span class="tag" v-show="e.tags.length > 0">{{ e.tags[0] }}</span>
          </span>
          <div class="md-result" v-html="e.htmlContent"></div>
        </li>
      </template>
      <li class="event" v-show="allLoaded">- End -</li>
    </ul>
  </div>
</template>

<script>
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const axios = require("axios");

export default {
  name: "Timeline",
  data() {
    return {
      yearIndexs: [],
      years: {},
      currentPage: 0,
      busy: false,
      allLoaded: false,
    };
  },
  methods: {
    mdRender(mdStr) {
      return md.render(mdStr);
    },
    loadNextPage() {
      if (this.allLoaded) {
        return;
      }
      this.busy = true;
      axios.default
        .create()
        .get(`/data/data-${this.currentPage}.json`)
        .then((resp) => {
          let data = resp.data;
          data.map((e) => {
            e.htmlContent = this.mdRender(e.content);
            let d = new Date(Date.parse(e.timestamp));
            e.year = d.getFullYear();
            e.timestamp = `${d.getMonth() > 9 ? "" : "0"}${d.getMonth() + 1}-${
              d.getDate() > 9 ? "" : "0"
            }${d.getDate()} ${d.getHours() > 9 ? "" : "0"}${d.getHours()}:${
              d.getMinutes() > 9 ? "" : "0"
            }${d.getMinutes()}`;
          });
          this.seperateByYear(data);
          // for (let i = 0; i < data.length; i++) {
          //   this.events.push(data[i]);
          // }
          this.currentPage = this.currentPage + 1;
          this.busy = false;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.allLoaded = true;
            console.log("no more data");
          } else {
            console.log("fail");
          }
          this.busy = false;
        });
    },
    seperateByYear(newData) {
      newData.forEach((e) => {
        let year_key = e.year;
        if (this.yearIndexs.findIndex(i => i === year_key) === -1) {
          this.years[year_key] = [];
          this.yearIndexs.push(year_key)
        }
        this.years[year_key].push(e);
      });
    },
  },
  mounted() {
    this.loadNextPage(null);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("/css/ie.css");
@import url("/css/print.css");
@import url("/css/screen.css");
@import url("/css/timeline.css");
@media (prefers-color-scheme: dark) {
  /* Dark theme styles go here */
  :root {
    --event-bg-color: #ffdd40;
    --color: #c9d1d9;
    --link-color: #1b644c;
  }

  .event {
    border: 1px dashed #505050;
    background-color: #121212;
  }

  .timeline .event:hover {
    background: #777777;
    color: #121212;
  }

  .timeline .event {
    color: #c9d1d9;
  }
}

@media (prefers-color-scheme: light) {
  /* Light theme styles go here */
  :root {
    --event-bg-color: #505050;
    --color: #2c3e50;
    --link-color: #025539;
  }
}

/* line 166, ../sass/timeline.scss */
.event .meta {
  font-size: smaller;
  font-size-adjust: inherit;
  display: block;
  margin-bottom: 0.25em;
}

/* line 170, ../sass/timeline.scss */
.event .time {
  background-color: var(--event-bg-color);
  color: var(--color);
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
  color: var(--color);
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
  overflow-x: auto;
  overflow-y: hidden;
  text-align: left;
}
</style>