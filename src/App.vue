<template>
  <div id="app">
    <img id="avatar" alt="Avatar" src="./assets/logo.jpeg" />
    <Timeline />
  </div>
</template>

<script>
import Timeline from "./components/Timeline.vue";

export default {
  name: "App",
  components: {
    Timeline,
  },
};
</script>

<style>
@media (prefers-color-scheme: dark) {
  /* Dark theme styles go here */
  :root {
    --bg-color: #121212;
    --link-color: #1b644c;
  }
  img {
    filter: brightness(0.8) contrast(1.2);
  }
}

@media (prefers-color-scheme: light) {
  /* Light theme styles go here */
  :root {
    --bg-color: white;
    --link-color: #025539;
  }
}

a {
  color: var(--link-color);
}

html body {
  background-color: var(--bg-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 10px;
}

#avatar {
  border-radius: 100%;
  width: 200px;
  padding-bottom: 10px;
}
</style>
