<template>
  <div class="menu-backdrop" @click="$emit('toggle-menu')"></div>
</template>


<style lang="scss" scoped>
@import "~styles/theme";

.menu-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: $z-index-backdrop;
}
</style>

