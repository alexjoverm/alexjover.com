const path = require("path");
const webpack = require("webpack");

module.exports = {
  title: "Alex Jover",
  description: "Web and JavaScript",
  head: [
    ["link", { rel: "icon", href: "/favicon.jpg" }]
    // [
    //   "script",
    //   {
    //     async: true,
    //     id: "_carbonads_js",
    //     src:
    //       "//cdn.carbonads.com/carbon.js?serve=CK7DL27I&placement=alexjovercom"
    //   }
    // ]
  ],
  themeConfig: {
    locales: {
      "/": {
        sidebar: ["/", "/ham", "/caca/"],
        nav: [
          {
            text: "VueDose Tips",
            link: "https://vuedose.tips?utm_source=alexjoverm",
            highlight: true
          },
          { text: "Blog", link: "/blog/" }
          // { text: "Courses", link: "/courses" }
        ]
      }
    },
    social: [
      { name: "Twitter", link: "https://twitter.com/alexjoverm" },
      { name: "Github", link: "https://github.com/alexjoverm" },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/alex-jover-morales-994752102/"
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "theme"),
        styles: path.resolve(__dirname, "theme", "styles")
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  }
  // plugins: ["@vuepress/google-analytics"],
  // ga: "UA-93226517-1"
};
