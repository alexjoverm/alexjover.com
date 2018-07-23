<template>
  <main class="post">
    <slot name="top"/>
    <Content/>
    <slot name="bottom"/>
  </main>
</template>

<style lang="scss" scoped>
@import "./styles/theme";

.post {
  padding: $layout-padding;
}
</style>
