<template>
  <router-link class="post-card" :class="{ gradient: gradient }" :to="post.path">
    <header class="post-card-header">
      <h4 class="post-card-title"> {{ post.title }} </h4>
    </header>
    <div class="post-card-excerpt">
      {{ post.frontmatter.excerpt }}      
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    post: Object,
    gradient: Boolean
  }
};
</script>
 
<style lang="scss" scoped>
@import "~styles/theme";

.post-card.gradient {
  .post-card-header {
    background-image: $navbar-color;
  }

  .post-card-title {
    color: $white-color;
  }
}

.post-card {
  box-shadow: 0 1px 5px $gray-lighter;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 3px;
  overflow: hidden;

  .post-card-header {
    padding: 1.5rem 1.9rem;
  }

  .post-card-excerpt {
    padding: 1rem 1.9rem 1.9rem 1.9rem;
  }

  :not(.post-card-title) {
    color: $text-color-light;
  }

  &:hover,
  &:focus {
    text-decoration: none;
  }
}

.post-card-excerpt {
  font-size: 1.6rem;
}

.post-card-title {
  color: $accent-color;
  margin: 0;
  line-height: 2.5rem;
}
</style>

