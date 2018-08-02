<template>
  <div class="hero">
    <div class="wrapper">
      <h1 class="hero-title">{{ $page.title }}</h1>
      <h5 class="hero-date"><i>Posted on {{$formatDate($page.frontmatter.date)}}</i></h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~styles/theme";

.hero {
  background: $navbar-color;
  flex: 1;
  display: flex;
  // justify-content: center;
  align-items: center;

  color: white;
  // text-align: center;
}

.wrapper {
  padding: 1rem;
  flex: 1;
}

.hero-title {
  font-size: 4.3rem;
  font-weight: 200;
  margin-bottom: 2rem;
}

.hero-date {
  font-weight: 200;
}
</style>

