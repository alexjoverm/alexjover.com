<template>
  <SubscribeFormBase formLocation="sidebar">
    <template slot="header">
      <h4 class="sidebar-item-title">GET THE LATEST CONTENT</h4>
      <div class="sidebar-item-description">Subscribe for upcoming guides, tutorials and courses. No spam.</div>
    </template>
  </SubscribeFormBase>
</template>

<script>
import SubscribeFormBase from "@/ui/SubscribeFormBase";

export default {
  components: { SubscribeFormBase }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.subscribe-form {
  /deep/ {
    .form-container {
      flex-direction: column;
    }

    input:first-child {
      margin-right: 0;
    }

    .submit-button {
      margin-top: 1rem;
    }

    .name-input,
    .email-input {
      font-size: 1.5rem;
    }
  }
}
</style>
