<template>
  <header class="navbar">
    <div class="title-side">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
      <Brand/>
    </div>

    <div class="nav-side">
      <SearchBox/>
      <NavLinks/>
    </div>
  </header>
</template>

<script>
import SidebarButton from "../SidebarButton.vue";
import SearchBox from "./SearchBox.vue";
import NavLinks from "./NavLinks.vue";
import Brand from "./Brand.vue";

export default {
  components: { SidebarButton, NavLinks, Brand, SearchBox }
};
</script>


<style lang="scss" scoped>
@import "../styles/theme.scss";

.navbar {
  display: flex;
  padding: $navbar-padding;
  position: relative;
  background: $accent-color;
}

.title-side {
  width: 16rem;
  display: flex;
}

.nav-side {
  flex: 1;
  text-align: right;
}
</style>
