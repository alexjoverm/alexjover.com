---
title: Tree shaking with Webpack 2, TypeScript and Babel
description: We'll see here how to setup Webpack 2, along with TypeScript and Babel to achieve dead code elimination with tree-shaking
excerpt: We'll see here how to setup Webpack 2, along with TypeScript and Babel to achieve dead code elimination with tree-shaking
featuredImage: /posts/tree.jpeg
date: 2017-03-06 10:37:33
tags:
  - Webpack
  - TypeScript
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Tree shaking with Webpack 2, TypeScript and Babel
  - property: og:description
    content: We'll see here how to setup Webpack 2, along with TypeScript and Babel to achieve dead code elimination with tree-shaking
  - property: og:image
    content: https://alexjover.com/posts/tree.jpeg
  - property: og:url
    content: https://alexjover.com/blog/Tree-shaking-with-Webpack-2-TypeScript-and-Babel
  - name: twitter:card
    content: summary
---

Some time ago I updated [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter), a zero-config starter repo for writting a [TypeScript](https://www.typescriptlang.org/) library, with [tree-shaking](https://webpack.js.org/guides/tree-shaking), [babel-preset-env](https://github.com/babel/babel-preset-env), and more:

<!-- {% twitter https://twitter.com/alexjoverm/status/838681719993663488 %} -->
<ClientOnly>
  <Tweet id="838681719993663488"/>
</ClientOnly>

Right now it uses RollupJS, but same concepts apply. So I thought, why not sharing that to the people? Hope you find it useful and safes you some time I had to spend :)

## What is really <b>tree-shaking</b>?

Tree shaking is an algorithm introduced first by [RollupJS](http://rollupjs.org/) and also implemented by [Webpack 2](https://webpack.js.org/guides/tree-shaking) that removes any unused code when bundling your code. It relies on ES2015 modules in order to achieve that.

Let's see an example. You have a file `greetings.js`:

```javascript
/* greetings.js */

export function sayHello() {
  console.log("Hello");
}

export function sayBye() {
  console.log("Bye");
}
```

Which you import in your `index.js`:

```javascript
/* index.js */

import { sayHello } from "./greetings";

sayHello();
```

We can see that `sayBye` is not used. When using tree-shaking, that code will be removed from the final bundle. Otherwise it will be included even if it's not used.

## Why Typescript + Babel?

You have a good explanation in the [typescript-library-starter repo](https://github.com/alexjoverm/typescript-library-starter#why-using-typescript-and-babel).

## Cool, show me how to do it!

As mentioned, tree-shaking relies on **ES2015 modules**, so we need to make sure we use them. For that:

- Use ES2015 in TypeScript
- Use ES2015 modules in Babel
- Just run `webpack -p` (production mode) and that should be it

### 1. Use ES2015 in TypeScript

You need to set `"target": "es2015"` in `tsconfig.json` file. Note that is **not necessary** to set `"module": "es2015"`.

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "target": "es2015",
        "lib": ["es2016", "dom"],
        ...
    }
}
```

More info in [compiler options TypeScript page](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

### 2. Use ES2015 modules in Babel

I'd strongly suggest you using [babel-preset-env](https://github.com/babel/babel-preset-env). By far the most flexible and useful [Babel](https://babeljs.io/) preset :)

Anyways, whatever preset you use, you must indicate `module: false` in your `.babelrc` file:

```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        },
        "modules": false
      }
    ]
  ]
}
```

### 3. Let's see the results

Now, when you have your `webpack.config.js` setup, if you run `webpack`, you'll see within the generated output an unused harmony comment, like:

```javascript
...
/* unused harmony export sayBye */
/* harmony export (immutable) */ __webpack_exports__["a"] = sayHello;
// This function isn't used anywhere
function sayBye() {
  console.log('Bye')
}
...
```

And if we run `webpack -p` for production build, that code will be stripped out. To check that you can search for the string `'Bye'` on the generated output. It shouldn't be there.

## Try it yourself!

[typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter) uses tree-shaking! Download the repo, follow the instructions and, be curious and try the code we used at the beginning of this article! Right now it uses RollupJS, but same tree-shaking happens when you run `npm run build`. If you wanna check the Webpack version, check out [this commit](https://github.com/alexjoverm/typescript-library-starter/tree/edd71c19b8d1dcd0b42dc19e0e4ee4b8a7216250) in particular to see how it was.
