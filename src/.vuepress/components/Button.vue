<template>
  <button class="button" :class="{'rounded': rounded, 'outline': outline}"> <slot/> </button>
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";
$button-border-width: 2px;

.button {
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background: $button-color;
  color: $white-color;
  padding: 0.6rem 1.8rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: $base-border-radius;

  &:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
    transform: translateY(-2px);
  }
}

.outline {
  background: $white-color;
  color: $accent-color;
  border-color: $accent-color;
}

.rounded {
  border-radius: 10rem;
}
</style>
