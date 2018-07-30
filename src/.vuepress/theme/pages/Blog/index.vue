<template>
  <main class="blog">
    <section class="posts">
      <input type="text"> <span style="padding: 2rem;"></span>
      <input class="rounded" type="text"> <br><br>

      <Button> Heyooo  </Button>
      <br><br>
      <PostCard :post="post" v-for="post in posts" :key="post.key"/>
    </section>
  </main>
</template>

<script>
import PostCard from "./PostCard";
import Button from "../../Button";

export default {
  components: { PostCard, Button },
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

.outline {
  border-radius: 10rem;

  // &:hover {
  //   background: $navbar-color;
  //   color: $white-color;
  // }
}

.blog {
  padding-top: $layout-padding;
}
</style>
