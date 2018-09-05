<template>
  <BaseHero :image="image">
    <h1 class="hero-title">{{ $page.title }}</h1>
    <h5 class="hero-date"><i>Posted on {{$formatDate($page.frontmatter.date)}}</i></h5>
  </BaseHero>
</template>

<script>
import BaseHero from "./Base";

export default {
  components: { BaseHero },
  computed: {
    image() {
      const image = this.$page.frontmatter.featuredImage;
      if (typeof image === "object") {
        return image.src;
      }
      return image;
    }
  }
};
</script>

<style lang="scss" scoped>
.hero {
  /deep/ .hero-title {
    // font-weight: 200;
  }
}
</style>

