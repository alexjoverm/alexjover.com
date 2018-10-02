<template>
  <header class="navbar sticky">
    <div class="wrapper">
      <div class="title-side">
        <MenuButton v-if="shouldShowMenu" @toggle-menu="$emit('toggle-menu')"/>
        <Brand/>
      </div>

      <div class="nav-side">
        <SearchBox/>
        <NavLinks class="navlinks"/>
      </div>
    </div>
  </header>
</template>

<script>
import MenuButton from "../MenuButton.vue";
import SearchBox from "./SearchBox.vue";
import NavLinks from "./NavLinks.vue";
import Brand from "./Brand.vue";

export default {
  components: { MenuButton, NavLinks, Brand, SearchBox },
  props: ["shouldShowMenu"]
};
</script>


<style lang="scss" scoped>
@import "~styles/theme.scss";

.navbar {
  padding-top: $navbar-padding-v;
  padding-bottom: $navbar-padding-v;
  background: $navbar-color;
  z-index: $z-index-navbar;
}

.wrapper {
  display: flex;
}

.title-side {
  width: 16rem;
  display: flex;
  align-items: center;
}

.nav-side {
  flex: 1;
  text-align: right;
}

@media (max-width: $mq-xs-max) {
  .nav-links {
    display: none;
  }
}
</style>
