<template>
  <div class="post" ref="post">
    <div class="content-wrapper">
      <Content/>
      <PrevNextLinks/>
      <AboutAuthor/>
      <vue-disqus shortname="alexjover" :identifier="postID"></vue-disqus>
    </div>
    
    <SubscribeModal v-show="modalOpen" @close="modalOpen = false"/>
    <slot name="sidebar"/>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import PrevNextLinks from "./PrevNextLinks";
import AboutAuthor from "./AboutAuthor";
import SubscribeModal from "@/modals/SubscribeModal";

const duration = 20 * 24 * 60 * 60 * 1000; // 20 days
const isExpired = date => new Date() - date > duration;

const checkShowFormNeeded = () => {
  const date = localStorage.getItem("blog_subscribeModalDate");
  return !!!date && isExpired(new Date(date));
};

export default {
  components: { PrevNextLinks, AboutAuthor, SubscribeModal },
  data: () => ({
    modalOpen: false
  }),
  computed: {
    postID() {
      return this.$route.path && this.$route.path.toLowerCase();
    }
  },
  methods: {
    handleScroll: debounce(function() {
      const scroll = window.scrollY;
      const height = this.$refs.post.clientHeight;
      if (scroll > height / 2.5 && checkShowFormNeeded()) {
        this.modalOpen = true;
        localStorage.setItem("blog_subscribeModalDate", new Date());
      }
    }, 400)
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
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
