const path = require("path");

console.log(path.resolve(__dirname, "theme"));

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
        styles: path.resolve(__dirname, "theme", "styles")
      }
    }
  }
};
