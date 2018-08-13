<template>
  <BaseHero>
    <h1 class="hero-title">{{ $page.title }}</h1>
    <h5 class="hero-date"><i>Posted on {{$formatDate($page.frontmatter.date)}}</i></h5>
  </BaseHero>
</template>

<script>
import BaseHero from "./Base";

export default {
  components: { BaseHero }
};
</script>
