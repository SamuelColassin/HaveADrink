<template>
  <div id="app">
    <Navbar />
    <Searchbar />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Searchbar from "./components/Searchbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Searchbar
  }
};
</script>

<style lang="scss"></style>
