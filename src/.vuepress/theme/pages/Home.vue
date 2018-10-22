<template>
  <div class="home">
    <div class="home-content">
      <section class="introduction">
        <p>Welcome! I want to use this web to help you sharpen your skills on <strong>JavaScript</strong>, <strong>Vue</strong> and the <strong>Web Platform</strong>. I'm a fanatic of <strong>Web Performance</strong> and <strong>Progressive Web Apps</strong> with broad experience writing apps and training teams following these patterns.</p>



        <div class="subscribe-form-wrapper">
          <SubscribeFormBase formLocation="home">
            <div slot="header">
              <h4 class="form-title">STAY UP TO DATE</h4>
              <p>Subscribe now I'll send you my <strong>top articles</strong>. No spam.</p>
            </div>
          </SubscribeFormBase>
        </div>
      </section>

      <section class="courses" v-if="$courses.length">
        <header class="section-header">
          <h2>Courses</h2>
          <router-link to="/courses/">See them all</router-link>
        </header>

        <div class="posts-container">
          <!-- <PostCard :post="post" v-for="post in $posts.slice(0, 3)" :key="post.key"></PostCard> -->
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
import SubscribeFormBase from "@/ui/SubscribeFormBase";

export default {
  components: { PostCard, SubscribeFormBase }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.home {
  display: flex;
  padding: $layout-padding 0;
}

.home-content > section {
  padding-bottom: $layout-padding * 1.2;
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
    font-size: 2.9rem;
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

.introduction {
  text-align: center;

  > p {
    font-size: 1.9rem;
  }
}

.subscribe-form-wrapper {
  width: 100%;
  max-width: 450px;
  margin: 1.5rem auto;
  padding: 1.8rem 2.3rem;
  border-radius: $base-border-radius;
  background: $gray-lightest-plus;

  /deep/ form *:first-child {
    margin-top: 0;
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
