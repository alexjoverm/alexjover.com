<template>
  <div class="sidebar-backdrop" @click="$emit('toggle-sidebar')"></div>
</template>


<style lang="scss" scoped>
@import "~styles/theme";

.sidebar-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: $z-index-backdrop;
}
</style>

