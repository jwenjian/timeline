<template>
  <div id="app">
    <img id="avatar" alt="Avatar" src="./assets/logo.jpeg">
    <Timeline/>
  </div>
</template>

<script>
import Timeline from './components/Timeline.vue'

export default {
  name: 'App',
  components: {
    Timeline
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

#avatar {
  border-radius: 100%;
  width: 200px;
}
</style>
