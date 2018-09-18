<template>
  <div class="home">
    <div class="home-content">
      <section class="introduction">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora maiores magni harum soluta maxime minima aut veniam quod veritatis ducimus.</p>
        <p>Sed quaerat culpa itaque tenetur dignissimos eum cupiditate doloribus similique unde.</p>
      </section>

      <section class="courses" v-if="$courses.length">
        <header class="section-header">
          <h2>Courses</h2>
          <router-link to="/courses/">See them all</router-link>
        </header>

        <div class="posts-container">
          <PostCard :post="post" v-for="post in $posts.slice(0, 3)" :key="post.key"></PostCard>
        </div>
      </section>

      <section class="posts" v-if="$posts.length">
        <header class="section-header">
          <h2>Articles</h2>
          <router-link to="/blog/">See them all</router-link>
        </header>

        <div class="posts-container">
          <PostCard :post="post" v-for="post in $posts.slice(0, 3)" :key="post.key"></PostCard>
        </div>
      </section>
    </div>

    <slot name="sidebar"/>
  </div>
</template>

<script>
import PostCard from "@/ui/PostCard.vue";

export default {
  components: { PostCard }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.home {
  display: flex;
  padding: $layout-padding 0;
}

.home-content > section {
  padding-bottom: $layout-padding;
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
}

.section-header {
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  align-items: flex-end;
  justify-content: space-between;
  display: flex;
  letter-spacing: 1px;

  h2 {
    font-size: 2.3rem;
    margin: 0;
    // color: $accent-color;
  }

  a {
    margin-left: 1rem;
    font-weight: 700;
    font-size: 1.4rem;
    color: $text-color;
    text-decoration: underline;
  }
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
</style>
