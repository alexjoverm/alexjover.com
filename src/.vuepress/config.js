const path = require("path");

class X {
  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  set fullName(value) {
    // ...
  }
}

module.exports = {
  title: "Alex Jover",
  description: "Web and JavaScript",
  head: [["link", { rel: "icon", href: "/favicon.jpg" }]],
  themeConfig: {
    locales: {
      "/": {
        sidebar: ["/", "/ham", "/caca/"],
        nav: [
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
    }
  }
};
