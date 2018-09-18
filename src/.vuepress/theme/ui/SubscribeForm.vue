<template>
  <form class="subscribe-form" @submit="$emit('submit', $event)">
    <h4 class="form-title">GET THE LATEST CONTENT</h4>
    <div class="form-description">Subscribe for upcoming guides, tutorials and courses. No spam.</div>
    <Input class="form-input" v-model="name" placeholder="Name"/>
    <Input class="form-input" type="email" v-model="email" placeholder="Email" required/>
    <Button type="submit" class="submit-button">I WANT <b>FREE</b> CONTENT</Button>
  </form>
</template>

<script>
import Input from "./Input";

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

  .form-title {
    margin: 0;
    font-weight: bold;
    font-size: 1.7rem;
  }

  .form-description {
    @include small-text;
    margin: 1.2rem 0;
  }
}
</style>
