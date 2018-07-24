<template>
  <main class="blog">
    <section class="posts">
      <PostCard :post="post" v-for="post in posts" :key="post.key"/>
    </section>
  </main>
</template>

<script>
import PostCard from "./PostCard";

export default {
  components: { PostCard },
  computed: {
    posts() {
      return this.$site.pages.filter(
        page => page.frontmatter.layout === "Post"
      );
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";

.blog {
  padding: $layout-padding;
}
</style>
