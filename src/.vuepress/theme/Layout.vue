<template>
  <div class="theme-container"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>
    <div class="wrapper">  
      <Sidebar :open="isSidebarOpen" />
      <SidebarBackdrop v-show="isSidebarOpen" @toggle-sidebar="toggleSidebar(false)"/>
      <main class="page-content">
        <component :is="getPageComponent"></component>
      </main>
      <!-- <slot name="top"></slot>
      <slot name="bottom"></slot> -->
      <pre style="width: 100%; background: #eee; overflow: auto;">{{ $page }}</pre>
      <pre style="width: 100%; background: #eee; overflow: auto;">{{ $site }}</pre>
    </div>
    <!-- 
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <slot name="sidebar-top" slot="top"/>
      <slot name="sidebar-bottom" slot="bottom"/>
    </Sidebar>
    <div class="custom-layout" v-if="$page.frontmatter.layout">
      <component :is="$page.frontmatter.layout"/>
    </div>
    <Home v-else-if="$page.frontmatter.home"/>
    <Page v-else :sidebar-items="sidebarItems">
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
import Sidebar from "./Sidebar.vue";
import SidebarBackdrop from "./SidebarBackdrop.vue";
// import { resolveSidebarItems } from './util'

export default {
  components: { Navbar, Sidebar, SidebarBackdrop },
  // components: { Home, Page, Sidebar, Navbar },
  data() {
    return {
      isSidebarOpen: false
    };
  },

  computed: {
    getPageComponent() {
      const comp = this.$page.frontmatter.layout || "Post";
      return () => import(`./pages/${comp}`);
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
    shouldShowSidebar() {
      // const { frontmatter } = this.$page
      return (
        // !frontmatter.layout &&
        // !frontmatter.home &&
        frontmatter.sidebar !== false && this.sidebarItems.length
      );
    },
    sidebarItems() {
      return resolveSidebarItems(
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
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
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
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      console.log("toggle");
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
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
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
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

$padding-offset: 3rem;

.sidebar,
.page-content {
  padding-top: $navbar-height + $padding-offset;
}
</style>
