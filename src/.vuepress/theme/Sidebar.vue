<template>
  <div class="sidebar" :class="{ open: open }">
    <div class="inner-sidebar">
      <NavLinks/>
      <!-- SubscribeForm -->
    </div>
  </div>
</template>

<script>
import NavLinks from "./Navbar/NavLinks";

export default {
  props: ["open"],
  components: { NavLinks }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.sidebar {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background: $background-color;
  z-index: $z-index-sidebar;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0, 1);
  transform: translateX(-100%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &.open {
    transform: translateX(0);
  }
}

.inner-sidebar {
  padding: 0 $layout-padding;
}
</style>

<style lang="scss">
@import "~styles/theme";

.sidebar {
  .nav-links {
    display: block;
    width: 100%;
    padding: 1.5rem 0;

    .nav-item {
      display: block;
      width: 100%;
    }

    a {
      display: block;
      color: $text-color;
      padding: 1.3rem 0;

      &:hover,
      &.router-link-active {
        color: $accent-color;
      }
    }
  }
}
</style>

