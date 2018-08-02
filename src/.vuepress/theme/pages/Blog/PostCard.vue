<template>
  <article class="post-card">
    <header class="post-card-title">
      <router-link :to="post.path">
        {{ post.title }}
      </router-link>
    </header>
    <div class="post-card-excerpt">
      {{ post.frontmatter.excerpt }}      
    </div>
    <footer class="post-card-footer">
      Posted on {{ $formatDate(post.frontmatter.date) }}
    </footer>
  </article>
</template>

<script>
export default {
  props: ["post"]
};
</script>

