export default ({
  Vue,
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.prototype.$formatDate = (
    date,
    lang = "en-US",
    options = { year: "numeric", month: "short", day: "numeric" }
  ) => new Date(date).toLocaleDateString(lang, options);
};
