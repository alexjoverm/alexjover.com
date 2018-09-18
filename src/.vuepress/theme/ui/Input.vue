<template>
  <input class="input" :class="{'rounded': rounded}" :value="value" @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
  props: {
    value: String,
    rounded: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";

input {
  border: 1px solid $gray-lightest;
  font: inherit;
  cursor: pointer;
  color: inherit;
  outline: inherit;
  box-shadow: 0 1px 1px $gray-lightest;
  padding: 0.6rem 1.8rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  border-radius: $base-border-radius;

  &:focus {
    box-shadow: 0 1px 1px #ddd;
    border: 1px solid $gray-lighter;
  }
}

.rounded {
  border-radius: 10rem;
}
</style>
