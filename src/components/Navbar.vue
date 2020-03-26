<template>
  <nav id="navbar">
    <div class="nav-left">
      <img id="logo" alt="logo" src="../assets/logo.png" />
      <h3 id="nav-text">Have a drink</h3>
    </div>
    <h3 id="about-link">About</h3>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped lang="scss">
nav {
  color: $gray;
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  align-items: center;

  .nav-left {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    grid-column: 1/2;
    margin: 1.5rem;
  }

  #about-link {
    grid-column: 3/4;
    margin: auto;
  }

  #logo {
    width: 50px;
    height: auto;
    margin-right: 1rem;
  }
  h3 {
    font-weight: $font-weight-normal;
  }
}

@media screen and (max-width: 992px) {
  nav {
    grid-template-columns: 35% 1fr 35%;
  }
}
</style>
