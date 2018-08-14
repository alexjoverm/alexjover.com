<template>
  <div class="hero" :style="styles" :class="classes">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    centered: Boolean,
    image: String
  },
  computed: {
    classes() {
      return {
        "text-center": this.centered,
        "with-image": this.image
      };
    },
    styles() {
      const styles = {};
      if (this.image) {
        styles.backgroundImage = `url(${this.image})`;
      }
      return styles;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";

.hero {
  background-image: $navbar-color;
  background-repeat: no-repeat;
  background-position: center;
  flex: 1;
  display: flex;
  // text-align: center;
  // justify-content: center;
  align-items: center;

  color: white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  &.with-image {
    .wrapper {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
  }
}

.wrapper {
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex: 1;
}

.hero-title {
  font-size: 4.3rem;
  font-weight: 200;
  margin-bottom: 2rem;
}

.hero-subtitle {
  font-weight: 200;
}
</style>

