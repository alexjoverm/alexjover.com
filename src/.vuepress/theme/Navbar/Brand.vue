<template>
  <router-link :to="$localePath" class="brand-link">
    {{ $site.title }} 
  </router-link>
</template>

<style lang="scss" scoped>
@import "~styles/theme";

.brand-link {
  font-size: $navbar-brand-size;
  line-height: 2.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: $text-inv-color;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
