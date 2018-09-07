<template>
  <AppOutboundLink :href="badge.link" :alt="badge.name" target="_blank">
    <BaseIcon>
      <component :is="iconComponent"/>
    </BaseIcon>
  </AppOutboundLink>
</template>

<script>
import BaseIcon from "@/icons/Base";

export default {
  components: { BaseIcon },
  props: ["badge"],
  computed: {
    iconComponent() {
      const icon = this.badge.name;
      return () => import(`@/icons/${icon}`);
    }
  }
};
</script>
