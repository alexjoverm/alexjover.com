<template>
  <div class="blog">
    <section class="posts">
      <PostCard :post="post" v-for="post in $posts" :key="post.key"/>
    </section>
  </div>
</template>

<script>
import PostCard from "@/PostCard";
import Button from "../../Button";

export default {
  components: { PostCard, Button }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";

.posts {
  display: flex;
  flex-wrap: wrap;
  padding: $layout-padding 0;
}

.post-card {
  box-sizing: border-box;
  flex: 0 0 calc(100% - #{$items-margin});
  margin: ($items-margin / 2) ($items-margin / 2);
}

@media (min-width: $mq-sm) {
  .post-card {
    flex: 0 0 calc(50% - #{$items-margin});
  }
}

@media (min-width: $mq-md) {
  .post-card {
    flex: 0 0 calc(33% - #{$items-margin});
  }
}

@media (min-width: $mq-lg) {
  .post-card {
    flex: 0 0 calc(25% - #{$items-margin});
  }
}
</style>
