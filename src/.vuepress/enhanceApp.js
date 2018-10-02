// import { unionBy } from "lodash-es";

// const getMetaWithDefaults = ({ path, frontmatter = {} }, config) => [
//   { property: "og:title", content: frontmatter.title || "" },
//   { property: "og:description", content: frontmatter.description || "" },
//   {
//     property: "og:image",
//     content: frontmatter.featuredImage || ""
//   },
//   { property: "og:url", content: config.themeConfig.domain + path },
//   { name: "", content: "summary" }
// ];

import VueAnalytics from "vue-analytics";

export default ({
  Vue,
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  const isClient = typeof window !== "undefined";
  const isProd = process.env.NODE_ENV === "production";

  // Utils
  Vue.prototype.$formatDate = (
    date,
    lang = "en-US",
    options = { year: "numeric", month: "short", day: "numeric" }
  ) => new Date(date).toLocaleDateString(lang, options);

  // if (isProd && isClient) {
  if (isClient) {
    Vue.use(VueAnalytics, {
      id: "UA-93226517-1",
      router,
      debug: {
        enabled: !isProd,
        trace: false,
        sendHitTask: false
      },
      autoTracking: {
        exception: true,
        exceptionLogs: false
      }
    });
  }

  // Components
  Vue.component("Tweet", () => import("vue-tweet-embed/tweet"));

  // Local data
  Vue.mixin({
    computed: {
      $courses() {
        return this.$site.pages
          .filter(page => page.frontmatter.type === "course")
          .sort(
            (a, b) =>
              new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
          );
      },
      $posts() {
        return this.$site.pages
          .filter(page => page.frontmatter.page === "Post")
          .sort(
            (a, b) =>
              new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
          );
      }
    }
  });

  // siteData.pages.forEach(page => {
  //   const { title, description } = page.frontmatter;
  //   const meta = page.frontmatter.meta || [];
  //   const defaultMeta = getMetaWithDefaults(page, siteData);
  //   console.log(meta);
  //   console.log(defaultMeta);
  //   page.frontmatter.meta = unionBy(
  //     meta,
  //     defaultMeta,
  //     val => val.name || val.property
  //   );
  //   console.log(page.frontmatter.meta);
  // });

  // console.log(siteData.pages);
};
