<template>
  <router-link :to="$localePath" class="brand-link">
    {{ $site.title }} 
  </router-link>
</template>

<style lang="scss" scoped>
@import "../styles/theme";

.brand-link {
  font-size: $font-size-base * 1.2;
  line-height: 2.8rem;
  font-weight: 600;
  color: $text-inv-color;
  text-decoration: none;
}
</style>
