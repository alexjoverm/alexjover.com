const path = require("path");

module.exports = {
  title: "Alex Jover",
  description: "Web and JavaScript",
  head: [["link", { rel: "icon", href: "/favicon.jpg" }]],
  themeConfig: {
    locales: {
      "/": {
        sidebar: ["/", "/ham", "/caca/"],
        nav: [
          { text: "Blog", link: "/blog/" },
          { text: "Courses", link: "/courses" }
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        styles: path.resolve(__dirname, "theme", "styles")
      }
    }
  }
};
