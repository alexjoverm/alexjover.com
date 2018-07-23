const path = require("path");

module.exports = {
  title: "Alex Jover",
  description: "Web and JavaScript",
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
        "@": path.resolve(__dirname, ".")
      }
    }
  }
};
