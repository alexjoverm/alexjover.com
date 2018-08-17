<template>
  <div class="home">
    <div class="home-content">
      <section class="introduction">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora maiores magni harum soluta maxime minima aut veniam quod veritatis ducimus.</p>
        <p>Sed quaerat culpa itaque tenetur dignissimos eum cupiditate doloribus similique unde.</p>
      </section>

      <section class="courses" v-if="$courses.length">
        <h2 class="section-header">
          Courses <router-link to="/courses/">See them all</router-link>
        </h2>
        <!-- <p class="section-description">I create courses to help you develop your skills. These are my latest pieces of work:</p> -->
        <div class="posts-container">
          <PostCard :post="post" v-for="post in $posts.slice(0, 3)" :key="post.key"></PostCard>
        </div>
      </section>

      <section class="posts" v-if="$posts.length">
        <h2 class="section-header">Articles <router-link to="/blog/">See them all</router-link></h2>
        <!-- <p class="section-description">I also write something on my blog from time to time. These are the latest articles: </p> -->
        <div class="posts-container">
          <PostCard :post="post" v-for="post in $posts.slice(0, 3)" :key="post.key"></PostCard>
        </div>
      </section>
    </div>

    <slot name="sidebar"/>
  </div>
</template>

<script>
import PostCard from "@/PostCard.vue";

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
  margin-top: 0;

  a {
    margin-left: 1rem;
    font-size: 1.5rem;
    color: $text-color;
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
