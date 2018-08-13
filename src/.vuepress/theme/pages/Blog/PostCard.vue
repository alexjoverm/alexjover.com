<template>
  <router-link class="post-card" :to="post.path">
    <header>
      <h4 class="post-card-title"> {{ post.title }} </h4>
    </header>
    <div class="post-card-excerpt">
      {{ post.frontmatter.excerpt }}      
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["post"]
};
</script>
 
<style lang="scss" scoped>
@import "~styles/theme";

.post-card {
  box-shadow: 0 1px 5px $gray-lighter;
  padding: 1.9rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 3px;

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
  margin-top: 0;
  margin-bottom: 1.7rem;
  line-height: 2.5rem;
}
</style>

