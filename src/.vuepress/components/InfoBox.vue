<template>
  <div class="info-box" :class="type">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Object,
      default: "info"
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";
$infobox-info: $blue-color;
$infobox-success: $green-color;
$infobox-warning: $orange-color;
$infobox-danger: $red-color;

.info-box {
  padding: 1.5rem 2.1rem;
  border-left-width: 4px;
  border-left-style: solid;
  margin: $text-margin;

  p:last-child {
    margin: 0;
  }

  a {
    text-decoration: underline;
  }

  &.info {
    @include box-color($infobox-info, 20%);
  }
  &.success {
    @include box-color($infobox-success, 10%);
  }
  &.warning {
    @include box-color($infobox-warning, 35%);
  }
  &.danger {
    @include box-color($infobox-danger, 30%);
  }
  &.gray {
    @include box-color($gray, 30%);
  }
}
</style>
