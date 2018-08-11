<template>
  <div class="theme-container"
    :class="classes"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">

    <Navbar v-if="shouldShowNavbar" :should-show-menu="shouldShowMenu" @toggle-menu="toggleMenu"/>
    <div class="hero-container" v-if="shouldShowHero">
      <component :is="heroComponent"></component>
    </div>

    <div class="wrapper">  
      <div v-if="shouldShowMenu" class="menu-wrapper">
        <Menu :open="isMenuOpen" />
        <MenuBackdrop v-show="isMenuOpen" @toggle-menu="toggleMenu(false)"/>
      </div>

      <div class="content-container">
        <main class="page-content">
          <component :is="pageComponent"></component>
        </main>

        <Sidebar v-if="shouldShowSidebar"/>
      </div>

      <!-- <slot name="top"></slot>
      <slot name="bottom"></slot> -->
      <!-- <pre style="width: 100%; background: #eee; overflow: auto;">{{ $page }}</pre> -->
      <pre style="width: 100%; background: #eee; overflow: auto;">{{ $site }}</pre>
    </div>
    <!-- 
    <div class="menu-mask" @click="toggleMenu(false)"></div>
    <Menu :items="menuItems" @toggle-menu="toggleMenu">
      <slot name="menu-top" slot="top"/>
      <slot name="menu-bottom" slot="bottom"/>
    </Menu>
    <div class="custom-layout" v-if="$page.frontmatter.layout">
      <component :is="$page.frontmatter.layout"/>
    </div>
    <Home v-else-if="$page.frontmatter.home"/>
    <Page v-else :menu-items="menuItems">
      <slot name="page-top" slot="top"/>
      <slot name="page-bottom" slot="bottom"/>
    </Page> -->
  </div>
</template>

<script>
import Vue from "vue";
import nprogress from "nprogress";
// import Home from './Home.vue'
import Navbar from "./Navbar";
// import Page from "./Page.vue";
import Menu from "./Menu.vue";
import MenuBackdrop from "./MenuBackdrop.vue";
import Sidebar from "./Sidebar.vue";
import { kebabCase } from "./util";

export default {
  metaInfo() {
    return {
      meta: [{ vmid: "lala", name: "lala", content: "" }]
    };
  },
  components: { Navbar, Menu, MenuBackdrop, Sidebar },
  data() {
    return {
      isMenuOpen: false
    };
  },

  computed: {
    classes() {
      return {
        [this.pageSlug]: true,
        "with-hero": this.shouldShowHero
      };
    },
    pageSlug() {
      return `page-${kebabCase(this.$page.frontmatter.layout || "Post")}`;
    },
    pageComponent() {
      const comp = this.$page.frontmatter.layout || "Post";
      return () => import(`./pages/${comp}`);
    },
    heroComponent() {
      const comp = this.$page.frontmatter.hero;
      return () => import(`./${comp}`);
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        // this.$title ||
        // themeConfig.logo ||
        // themeConfig.repo ||
        themeConfig.nav || this.$themeLocaleConfig.nav
      );
    },
    shouldShowHero() {
      return !!this.$page.frontmatter.hero;
    },
    shouldShowMenu() {
      return this.$site.menu !== false && this.$page.frontmatter.menu !== false;
    },
    shouldShowSidebar() {
      return (
        this.$site.sidebar !== false && this.$page.frontmatter.sidebar !== false
      );
    },
    menuItems() {
      return resolveMenuItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "menu-open": this.isMenuOpen,
          "no-menu": !this.shouldShowMenu
        },
        userPageClass
      ];
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);

    // configure progress bar
    nprogress.configure({ showSpinner: false });

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
      this.isMenuOpen = false;
    });
  },

  methods: {
    toggleMenu(to) {
      console.log("toggle");
      this.isMenuOpen = typeof to === "boolean" ? to : !this.isMenuOpen;
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleMenu(true);
        } else {
          this.toggleMenu(false);
        }
      }
    }
  }
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/index.scss" lang="scss"></style> 

<style lang="scss" scoped>
@import "~styles/theme";

.menu,
.hero-container,
.content-container {
  padding-top: $layout-padding + $navbar-height;
}

.with-hero .content-container {
  padding-top: 0;
}

.content-container {
  display: flex;
}

.hero-container {
  display: flex;
}

.page-content {
  flex: 1;
  overflow: auto;
}
</style>
