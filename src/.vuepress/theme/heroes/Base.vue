<template>
  <div class="hero">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~styles/theme";

.hero {
  background: $navbar-color;
  flex: 1;
  display: flex;
  // text-align: center;
  // justify-content: center;
  align-items: center;

  color: white;
}

.wrapper {
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex: 1;
}

.hero-title {
  font-size: 4.3rem;
  font-weight: 200;
  margin-bottom: 2rem;
}

.hero-subtitle {
  font-weight: 200;
}
</style>

