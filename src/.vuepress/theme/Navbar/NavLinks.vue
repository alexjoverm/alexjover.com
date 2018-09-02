<template>
  <nav class="nav-links" v-if="userLinks.length || repoLink">
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link">
      <DropdownLink v-if="item.type === 'links'" :item="item"/>
      <NavLink v-else :item="item"/>
    </div>
  </nav>
</template>

<script>
import DropdownLink from "./DropdownLink";
import { resolveNavLinkItem } from "../util";
import NavLink from "./NavLink";

export default {
  components: { NavLink, DropdownLink },
  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },
    nav() {
      const { locales } = this.$site;
      // if (locales && Object.keys(locales).length > 1) {
      //   const currentLink = this.$page.path;
      //   const routes = this.$router.options.routes;
      //   const themeLocales = this.$site.themeConfig.locales || {};
      //   const languageDropdown = {
      //     text: this.$themeLocaleConfig.selectText || "Languages",
      //     items: Object.keys(locales).map(path => {
      //       const locale = locales[path];
      //       const text =
      //         (themeLocales[path] && themeLocales[path].label) || locale.lang;
      //       let link;
      //       // Stay on the current page
      //       if (locale.lang === this.$lang) {
      //         link = currentLink;
      //       } else {
      //         // Try to stay on the same page
      //         link = currentLink.replace(this.$localeConfig.path, path);
      //         // fallback to homepage
      //         if (!routes.some(route => route.path === link)) {
      //           link = path;
      //         }
      //       }
      //       return { text, link };
      //     })
      //   };
      //   return [...this.userNav, languageDropdown];
      // }
      return this.userNav;
    },
    userLinks() {
      return (this.nav || []).map(link =>
        Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      );
    }
  }
};
</script>

<style lang="scss">
@import "~styles/theme";

.nav-links {
  display: inline-block;

  a {
    font-size: $navbar-link-font-size;
    line-height: $navbar-link-height;
    color: $text-inv-color;
    letter-spacing: 1px;
    text-decoration: none;
    padding: $navbar-link-padding-v $navbar-link-padding-h;
    font-weight: 600;
    text-transform: uppercase;

    &:hover,
    &.router-link-active {
      color: $text-inv-color;
      text-decoration: none;
      border-bottom: 3px solid $text-inv-color;
    }
  }

  .nav-item {
    display: inline-block;
    line-height: 2rem;
  }
}

// @media (max-width: $mq-sm-max) {
//   .nav-links {
//     .nav-item,
//     .repo-link {
//       margin-left: 0;
//     }
//   }
// }
</style>
