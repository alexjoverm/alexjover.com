<template>
  <form class="subscribe-form sidebar-item" @submit="$emit('submit', $event)">
    <h4 class="sidebar-item-title">GET THE LATEST CONTENT</h4>
    <div class="sidebar-item-description">Subscribe for upcoming guides, tutorials and courses. No spam.</div>
    <Input class="form-input" v-model="name" placeholder="Name"/>
    <Input class="form-input" type="email" v-model="email" placeholder="Email" required/>
    <Button type="submit" class="submit-button">I WANT <b>FREE</b> CONTENT</Button>
  </form>
</template>

<script>
import Input from "@/ui/Input";

export default {
  components: { Input },
  data: () => ({
    name: "",
    email: ""
  })
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.subscribe-form {
  display: flex;
  flex-direction: column;
  // font-size: 0.85em;

  .submit-button {
    margin-top: 1rem;
  }

  .form-input {
    font-size: 1.5rem;
  }
}
</style>
