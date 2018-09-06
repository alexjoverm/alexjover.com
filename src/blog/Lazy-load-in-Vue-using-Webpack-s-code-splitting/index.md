---
title: Lazy Loading in Vue using Webpack's Code Splitting
description: When a Vue app gets large, lazy loading components, routes or Vuex modules using Webpack's code splitting will boost it by loading pieces of code only when needed.
excerpt: When a Vue app gets large, lazy loading components, routes or Vuex modules using Webpack's code splitting will boost it by loading pieces of code only when needed.
date: 2017-07-16 01:05:47
tags:
  - VueJS
  - Vuex
  - Webpack
  - JavaScript
featuredImage: /posts/axe.jpg
layout: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Lazy Loading in Vue using Webpack's Code Splitting
  - property: og:description
    content: When a Vue app gets large, lazy loading components, routes or Vuex modules using Webpack's code splitting will boost it by loading pieces of code only when needed.
  - property: og:image
    content: /posts/axe.jpg
  - property: og:url
    content: /blog/Lazy-load-in-Vue-using-Webpack-s-code-splitting
  - name: twitter:card
    content: summary
---

We could apply lazy loading and code splitting in 3 different levels in a Vue app:

- Components, also known as [async components](https://vuejs.org/v2/guide/components.html#Async-Components)
- Router
- Vuex modules

But there is something they all have in common: they use [dynamic import](https://github.com/tc39/proposal-dynamic-import), which is understood by Webpack since version 2.

## Lazy load in Vue components

This is well explained in the ["Load components when needed with Vue async components"](https://egghead.io/lessons/load-components-when-needed-with-vue-async-components) on Egghead.

It's as simple as using the `import` function when registering a component:

```javascript
Vue.component("AsyncCmp", () => import("./AsyncCmp"));
```

And using local registration:

```javascript
new Vue({
  // ...
  components: {
    AsyncCmp: () => import("./AsyncCmp")
  }
});
```

By wrapping the `import` function into an arrow function, Vue will execute it only when it gets requested, loading the module in that moment.

If the component importing is using a [named export](http://2ality.com/2014/09/es6-modules-final.html#named-exports-several-per-module), you can use object destructuring on the returned Promise. For example, for the UiAlert component from [KeenUI](https://github.com/JosephusPaye/Keen-UI):

```javascript
...
components: {
  UiAlert: () => import('keen-ui').then(({ UiAlert }) => UiAlert)
}
...
```

## Lazy load in Vue router

Vue router has built in support for [lazy loading](https://router.vuejs.org/en/advanced/lazy-loading.html). It's as simple as importing your components with the `import` function. Say we wanna lazy load a Login component in the _/login_ route:

```javascript
// Instead of: import Login from './login'
const Login = () => import("./login");

new VueRouter({
  routes: [{ path: "/login", component: Login }]
});
```

## Lazy load a Vuex module

Vuex has a `registerModule` method that allow us to dynamically create Vuex modules. If we take into account that `import` function returns a promise with the ES Module as the payload, we could use it to lazy load a module:

```javascript
const store = new Vuex.Store()

...

// Assume there is a "login" module we wanna load
import('./store/login').then(loginModule => {
  store.registerModule('login', loginModule)
})
```

## Conclusion

Lazy loading is made extremely simple with Vue and Webpack. Using what you've just read you can start splitting up your app in chunks from different sides and load them when needed, lightening the initial load of the app.
