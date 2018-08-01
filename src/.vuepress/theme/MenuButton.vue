<template>
  <button class="menu-button no-button" @click="$emit('toggle-menu')">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512">
      <path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" class=""></path>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import "~styles/theme.scss";

.menu-button {
  display: none;
  margin-right: 1.5rem;
  color: white;

  .icon {
    display: block;
    width: $navbar-brand-size;
    height: $navbar-brand-size;
  }
}

@media (max-width: $mq-xs-max) {
  .menu-button {
    display: inline-block;
  }
}
</style>
