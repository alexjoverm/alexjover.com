<template>
  <div class="sidebar">
    <label for="lele">Fancy stuff!</label>
    <input id="lele" type="text">
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~styles/theme";
$sidebar-width: 230px;
$sidebar-margin: 30px;

.sidebar {
  display: none;
}

@media (min-width: $mq-sm) {
  .sidebar {
    display: block;
    width: $sidebar-width;
    margin-left: $sidebar-margin;
  }
}
</style>

