<template>
  <div class="post">
    <Content/>
  </div>
</template>

<style lang="scss" scoped>
@import "~styles/theme";

.post {
  padding-top: $layout-padding;

  /deep/ h1:first-child {
    margin-top: 0;
  }
}
</style>
