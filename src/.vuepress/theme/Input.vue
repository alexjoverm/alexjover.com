<template>
  <input class="input" :class="{'rounded': rounded}"> <slot/> </input>
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      default: true
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
  padding: 4px 12px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  border-radius: 3px;

  &:focus {
    box-shadow: 0 1px 1px #ddd;
    border: 1px solid $gray-lighter;
  }
}

.rounded {
  border-radius: 10rem;
  padding: 4px 14px;
}
</style>
