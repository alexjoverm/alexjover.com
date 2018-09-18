<template>
  <div class="social-badges">
    <SocialBadge :badge="badge" v-for="badge in $site.themeConfig.social" :key="badge.name"/>
  </div>
</template>

<script>
import SocialBadge from "./SocialBadge";

export default {
  components: { SocialBadge }
};
</script>
