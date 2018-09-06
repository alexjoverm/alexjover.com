---
title: Enhance Jest configuration with Module Aliases
tags:
  - VueJS
  - JavaScript
  - Testing
description: Learn how to use Module Aliases Jest configuration to avoid using relative paths
excerpt: Learn how to use Module Aliases Jest configuration to avoid using relative paths
date: 2017-10-07 11:33:20
layout: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Enhance Jest configuration with Module Aliases
  - property: og:description
    content: Learn how to use Module Aliases Jest configuration to avoid using relative paths
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Enhance-Jest-configuration-with-Module-Aliases
  - name: twitter:card
    content: summary
---

The module managers we have in the JavaScript community, mainly ES Modules and CommonJS, don't support project-based paths. They only support relative paths for our own modules, and paths for the `node_modules` folder. When a project grows a bit, it's common to see paths such:

```javascript
import SomeComponent from "../../../../components/SomeComponent";
```

Luckily, we have different ways to cope with this, in a way that we can define aliases for folders relative to the project root, so we could the above line like:

```javascript
import SomeComponent from "@/components/SomeComponent";
```

The `@` here is an arbitrary character to define the root project, you can define your own. Let's see what solutions we have to apply module aliasing. Let's start [from where we left it on the last article](https://github.com/alexjoverm/vue-testing-series/tree/test-slots).

## Webpack aliases

[Webpack aliases](https://webpack.js.org/configuration/resolve/#resolve-alias) are very simple to set up. You just need to add a `resolve.alias` property in your webpack configuration. If you take a look at the `build/webpack.base.conf.js`, it already has it defined:

```javascript
{
  ...
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  }
}
```

Taking this as an entry point, we can add a simple alias that points to the `src` folder and use that as the root:

```javascript
{
  ...
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '..', 'src')
    }
  }
}
```

Just with this, we can access anything taking the root project as the `@` symbol. Let's go to `src/App.vue` and change the reference to those two components:

```javascript
import MessageList from '@/components/MessageList'
import Message from '@/components/Message'
...
```

And if we run `npm start` and open the browser at `localhost:8080`, that should work out of the box.

However, if we try to run the tests by running `npm t`, we'll see Jest doesn't find the modules. We still didn't configured Jest to do so. So let's go to `package.json` where the Jest config is, and add `"@/([^\\.]*)$": "<rootDir>/src/$1"` to `moduleNameMapper`:

```json
"jest": {
    "moduleNameMapper": {
      "@(.*)$": "<rootDir>/src/$1",
      "^vue$": "vue/dist/vue.common.js"
    },
...
```

Let's explain it:

- `@(.*)$`: Whatever starts with `@`, and continues with literally whatever (`(.*)$`) till the end of the string, grouping it by using the parenthesis
- `<rootDir>/src/$1`: `<rootDir>` is a special word of Jest, meaning the root directory. Then we map it to the `src`, and with `$1` we append the whatever clause from the `(.*)` statement.

For example, `@/components/MessageList` will be mapped to `../src/components/MessageList` when you're importing it from the `src` or `test` folders.

That's really it. Now you can even update your `App.test.js` file to use the alias as well, since it's usable from within the tests:

```javascript
import { shallowMount } from '@vue/test-utils'
import App from "@/App"
...
```

And it will work for both `.vue` and `.js` files.

## Multiple aliases

Very often, multiple aliases are used for convenience, so instead of using just a `@` to define your root folder, you use many. For example, let's say you have a `actions` and `models` folder. If you create an alias for each one, and then you move the folders around, you just need to change the aliases instead of updating all the references to it in the codebase. That's the power of module aliases, they make your codebase more maintainable and cleaner.

Let's add a `components` alias in `build/webpack.base.conf.js`:

```javascript
{
  ...
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '..', 'src')
      'components': path.join(__dirname, '..', 'src', 'components')
    }
  }
}
```

Then, we just need to add it as well to the Jest configuration in `package.json`:

```json
"jest": {
    "moduleNameMapper": {
      "@(.*)$": "<rootDir>/src/$1",
      "components(.*)$": "<rootDir>/src/components/$1",
      "^vue$": "vue/dist/vue.common.js"
    },
...
```

As simple as that. Now, we can try in `App.vue` to use both forms:

```javascript
import MessageList from "components/MessageList";
import Message from "@/components/Message";
```

Stop and re-run the tests, and that should work, as well as if you run `npm start` and try it.

## Other solutions

I've seen [babel-plugin-webpack-alias](https://github.com/trayio/babel-plugin-webpack-alias), specially used for other testing frameworks such as [mocha](https://mochajs.org/) which doesn't have a module mapper.

I haven't tried it myself, since Jest already gives you that, but if you have or wanna try, please share how it went!

## Conclusion

Adding module aliases is very simple and can keep your codebase much cleaner and easier to maintain. Jest makes it as well very easy to define them, you just need to keep in in sync with the Webpack aliases, and you can say bye-bye to the dot-hell references.

Find the [full example on GitHub](https://github.com/alexjoverm/vue-testing-series/tree/Enhance-Jest-configuration-with-Module-Aliases)
