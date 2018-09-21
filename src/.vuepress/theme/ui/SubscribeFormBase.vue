<template>
  <form class="subscribe-form" @submit="$emit('submit', $event)">
    <slot name="header">
      <h4 class="form-title">GET THE LATEST CONTENT</h4>
      <p>Subscribe for upcoming guides, tutorials and courses. No spam.</p>
    </slot>
    <div class="form-container">
      <Input class="name-input" v-model="name" placeholder="Name"/>
      <Input class="email-input" v-model="email" type="email" placeholder="Email" required/>
    </div>
    <Button type="submit" class="submit-button">
      <slot name="submit-button">I WANT <b>FREE</b> CONTENT</slot>
    </Button>
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

.form-container {
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 0.8rem;
    flex: 1;
    min-width: 0;
  }
}

.submit-button {
  width: 100%;
}

@media (min-width: $mq-xs) {
  .form-container {
    flex-direction: row;

    input:first-child {
      margin-right: 0.8rem;
    }
  }
}
</style>
