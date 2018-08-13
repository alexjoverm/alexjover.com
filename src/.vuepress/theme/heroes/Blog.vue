<template>
  <BaseHero class="blog-hero">
    <h1 class="hero-title">Alex's Blog</h1>
    <h4 class="hero-subtitle">I love writting articles and tutorials about Vue, JS, PWA and Web Performance</h4>
  </BaseHero>
</template>

<script>
import BaseHero from "./Base";

export default {
  components: { BaseHero }
};
</script>

<style lang="scss" scoped>
.blog-hero {
  text-align: center;
}
</style>

