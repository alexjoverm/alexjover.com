<template>
  <div class="post">
    <div class="content-wrapper">
      <Content/>
      <PrevNextLinks/>
      <AboutAuthor/>
    </div>
    <slot name="sidebar"/>
  </div>
</template>

<script>
import PrevNextLinks from "./PrevNextLinks";
import AboutAuthor from "./AboutAuthor";

export default {
  components: { PrevNextLinks, AboutAuthor }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";

.post {
  display: flex;
  padding-top: $layout-padding;

  // .content {
  //   overflow: auto;
  // }
}

.content-wrapper {
  overflow: auto;
}
</style>

<style lang="scss">
@import "~styles/theme";

.post {
  h1:first-child {
    margin-top: 0;
  }

  h2,
  h3 {
    letter-spacing: 1px;
  }

  h2 {
    font-weight: 500;
    color: $accent-color;
    padding-bottom: 1.3rem;
    border-bottom: 1px solid $accent-color;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }

  blockquote {
    position: relative;
    font-style: italic;
    padding: 15px 20px 15px 40px;
    background: $gray-lightest-plus;

    &:before {
      content: "\201C"; /*Unicode for Left Double Quote*/

      /*Font*/
      font-family: Georgia, serif;
      font-size: 55px;
      font-weight: bold;
      color: $gray-light;

      /*Positioning*/
      position: absolute;
      left: 0;
      top: 0;
    }

    > p:last-child {
      margin: 0;
    }
  }
}
</style>
