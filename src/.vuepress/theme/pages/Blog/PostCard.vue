<template functional>
  <article class="post-card">
    <header class="post-card-title">
      <router-link :to="props.post.path">
        {{ props.post.title }}
      </router-link>
    </header>
    <header class="post-card-title"></header>
  </article>
</template>
