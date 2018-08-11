<template>
  <router-link class="post-card" :to="post.path">
    <header>
      <h4 class="post-card-title"> {{ post.title }} </h4>
    </header>
    <div class="post-card-excerpt">
      {{ post.frontmatter.excerpt }}      
    </div>
    <footer class="post-card-footer">
      Posted on {{ $formatDate(post.frontmatter.date) }}
    </footer>
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
  padding: 2.1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 3px;

  :not(.post-card-title) {
    color: $text-color;
  }

  &:hover,
  &:focus {
    text-decoration: none;
  }
}

.post-card-title {
  color: $accent-color;
  margin-top: 0;
}
</style>

