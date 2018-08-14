<template>
  <a :href="badge.link" :alt="badge.name">
    <BaseIcon>
      <component :is="iconComponent"/>
    </BaseIcon>
  </a>
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
