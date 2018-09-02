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
}
</style>

<style lang="scss">
@import "~styles/theme";

.post {
  h1:first-child {
    margin-top: 0;
  }

  h2,
  h3 {
    letter-spacing: 1px;
  }

  h2 {
    font-weight: 500;
    color: $accent-color;
    padding-bottom: 1.3rem;
    border-bottom: 1px solid $accent-color;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
