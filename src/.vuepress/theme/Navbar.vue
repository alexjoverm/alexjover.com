<template>
  <header class="navbar">
    Navbar {{ $site.title }} - 
    <span v-for="link in $site.themeConfig.nav"> {{link}} </span>
  </header>
</template>

<style lang="scss" scoped>
@import "./styles/theme.scss";

.navbar {
  padding: 0.7rem 1.5rem;
  line-height: $navbar-height - 1.4rem;
  position: relative;
  background: $accent-color;
}
</style>
