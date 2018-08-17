<template>
  <div class="post">
    <Content/>
    <slot name="sidebar"/>
  </div>
</template>

<style lang="scss" scoped>
@import "~styles/theme";

.post {
  display: flex;
  padding-top: $layout-padding;

  .content {
    overflow: auto;
  }

  /deep/ h1:first-child {
    margin-top: 0;
  }
}
</style>
