<template>
  <section class="prev-next-links">
    <div class="links-wrapper">
      <router-link v-if="prev" class="prev" :to="prev.path">
        <BaseIcon><ChevronLeft/></BaseIcon>
        <div class="link-text">{{ prev.title }}</div>
      </router-link>
      <router-link v-if="next" class="next" :to="next.path">
        <div class="link-text">{{ next.title }}</div>
        <BaseIcon><ChevronRight/></BaseIcon>
      </router-link>
    </div>
  </section>
</template>

<script>
import BaseIcon from "@/icons/Base";
import ChevronRight from "@/icons/ChevronRight";
import ChevronLeft from "@/icons/ChevronLeft";

export default {
  components: {
    BaseIcon,
    ChevronRight,
    ChevronLeft
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.$posts.length; i++) {
        if (this.$posts[i].key === this.$page.key) {
          return i;
        }
      }
    },
    prev() {
      return this.currentIndex > 0 ? this.$posts[this.currentIndex - 1] : null;
    },
    next() {
      return this.currentIndex < this.$posts.length - 1
        ? this.$posts[this.currentIndex + 1]
        : null;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~styles/theme";

.prev-next-links {
  a {
    flex: 0 0 50%;
    display: flex;
    overflow: hidden;
    background: $white-color;
    color: $accent-color;
    box-sizing: border-box;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    font-weight: 600;

    .link-text {
      flex: 1;
      @include ellipsis;
    }
  }

  .prev {
    padding-left: 0;
    padding-right: 2rem;
    text-align: left;
  }

  .next {
    padding-right: 0;
    padding-left: 2rem;
    text-align: right;
  }
}

.links-wrapper {
  display: flex;
}

.icon {
  font-size: 3rem;
  padding-top: 0.4rem;
}
</style>
