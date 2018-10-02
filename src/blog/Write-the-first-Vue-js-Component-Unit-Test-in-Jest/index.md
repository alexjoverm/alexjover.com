---
title: Write the first Vue.js Component Unit Test in Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: Learn how to write unit tests for VueJS components with the official tools and the Jest framework.
excerpt: Learn how to write unit tests for VueJS components with the official tools and the Jest framework.
date: 2017-08-21 08:25:40
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Write the first Vue.js Component Unit Test in Jest
  - property: og:description
    content: Learn how to write unit tests for VueJS components with the official tools and the Jest framework.
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Test-Deeply-Rendered-Vue-js-Components-in-Jest
  - name: twitter:card
    content: summary
---

[vue-test-utils](https://github.com/vuejs/vue-test-utils), the official VueJS testing library and based on [avoriaz](https://github.com/eddyerburgh/avoriaz), is just around the corner. [@EddYerburgh](https://twitter.com/EddYerburgh) is indeed doing a very good job creating it. It provides all necessary tooling for making easy to write unit test in a VueJS application.

[Jest](https://facebook.github.io/jest), on the other side, is the testing framework developed at Facebook, which makes testing a breeze, with awesome features such as:

- Almost no config by default
- Very cool interactive mode
- Run tests in parallel
- Spies, stubs and mocks out of the box
- Built in code coverage
- Snapshot testing
- Module mocking utilities

Probably you've already written test without this tools, and just by using karma + mocha + chai + sinon + ..., but you'll see how much easier it can be 😉.

## Set up a vue-test sample project

Let's start by creating a new project using [`vue-cli`](https://github.com/vuejs/vue-cli) answering NO to all yes/no questions:

```bash
npm install -g vue-cli
vue init webpack vue-test
cd vue-test
```

Then we'll need to install some dependencies:

```bash
# Install dependencies
npm i -D jest vue-jest babel-jest
```

[`jest-vue-preprocessor`](https://github.com/vire/jest-vue-preprocessor) is needed for making jest understand `.vue` files, and [`babel-jest`](https://github.com/babel/babel-jest) for the integration with Babel.

As per `vue-test-utils`, it ~~hasn't been released yet, but for now you can add it to your `package.json` from the source~~:

**Update (2017/10/10)**: it can be installed already from npm, since `beta.1` has been published.

```bash
npm i -D vue-test-utils
```

Let's add the following Jest configuration in the `package.json`:

```json
...
"jest": {
  "moduleNameMapper": {
    "^vue$": "vue/dist/vue.common.js"
  },
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  }
}
...
```

`moduleFileExtensions` will tell Jest which extensions to look for, and `transform` which preprocessor to use for a file extension.

At last, add a `test` script to the `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    ...
  },
  ...
}
```

## Testing a Component

I'll be using Single File Components here, and I haven't checked if it works by splitting them in their own `html`, `css` or `js` files, so let's assume you're doing that as well.

First create a `MessageList.vue` component under `src/components`:

```html
<template>
    <ul>
        <li v-for="message in messages">
            {{ message }}
        </li>
    </ul>
</template>

<script>
export default {
  name: 'list',
  props: ['messages']
}
</script>
```

And update `App.vue` to use it, as follows:

```html
<template>
  <div id="app">
    <MessageList :messages="messages"/>
  </div>
</template>

<script>
import MessageList from './components/MessageList'

export default {
  name: 'app',
  data: () => ({ messages: ['Hey John', 'Howdy Paco'] }),
  components: {
    MessageList
  }
}
</script>
```

We have already a couple of components that we can test. Let's create a `test` folder under the project root, and a `App.test.js`:

```javascript
import Vue from "vue";
import App from "../src/App";

describe("App.test.js", () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(App); // Create a copy of the original component
    vm = new cmp({
      data: {
        // Replace data value with this fake data
        messages: ["Cat"]
      }
    }).$mount(); // Instances and mounts the component
  });

  it('equals messages to ["Cat"]', () => {
    expect(vm.messages).toEqual(["Cat"]);
  });
});
```

Right now, if we run `npm test` (or `npm t` as a shorthand version), the test should run and pass. Since we're modifying the tests, let's better run it in **watch mode**:

```shell
npm t -- --watch
```

### The problem with nested components

This test is too simple. Let's check that the output is the expected as well. For that we can use the amazing Snapshots feature of Jest, that will generate a snapshot of the output and check it against in the upcoming runs. Add after the previous `it` in `App.test.js`:

```javascript
it("has the expected html structure", () => {
  expect(vm.$el).toMatchSnapshot();
});
```

That will create a `test/__snapshots__/App.test.js.snap` file. Let's open it and inspect it:

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`App.test.js has the expected html structure 1`] = `
<div
  id="app"
>
  <ul>
    <li>
      Cat
    </li>
  </ul>
</div>
`;
```

In case you haven't noticed, there is a big problem here: the `MessageList` component has been rendered as well. **Unit tests must be tested as an independent unit**, meaning that in `App.test.js` we wanna test `App` component and don't care at all about anything else.

This can be the reason of several problems. Imagine for example, that the children components (`MessageList` in this case) perform side effect operations on the `created` hook, such as calling `fetch`, a Vuex action or state changes? That's something we definitely don't want.

Luckily, **Shallow Rendering** solves this nicely.

### What is Shallow Rendering?

[Shallow Rendering](http://airbnb.io/enzyme/docs/api/shallow.html) is a technique that assures your component is rendering without children. This is useful for:

- Testing only the component you want to test (that's what Unit Test stands for)
- Avoid side effects that children components can have, such as making HTTP calls, calling store actions...

## Testing a Component with vue-test-utils

`vue-test-utils` provide us with Shallow Rendering among other features. We could rewrite the previous test as follows:

```javascript
import { shallowMount } from "@vue/test-utils";
import App from "../src/App";

describe("App.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(App, {
      // Create a shallow instance of the component
      data: {
        messages: ["Cat"]
      }
    });
  });

  it('equals messages to ["Cat"]', () => {
    // Within cmp.vm, we can access all Vue instance methods
    expect(cmp.vm.messages).toEqual(["Cat"]);
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
```

And now, if you're still running Jest in watching mode, you'll see the test still pass, but the Snapshot doesn't match. Press `u` to regenerate it. Open and inspect it again:

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`App.test.js has the expected html structure 1`] = `
<div
  id="app"
>
  <!--  -->
</div>
`;
```

You see? Now no children have been rendered and we tested the `App` component **fully isolated** from the component tree. Also, if you have any `created` or whatever hooks in the children components, they haven't been called either 😉.

If you're curious about **how shallow render is implemented**, check out the [source code](https://github.com/vuejs/vue-test-utils/blob/dev/packages/shared/stub-components.js) and you'll see that basically is stubbing the `components` key, the `render` method and the lifecycle hooks.

In the same vein, you can implement the `MessageList.test.js` test as follows:

```javascript
import { mount } from "@vue/test-utils";
import MessageList from "../src/components/MessageList";

describe("MessageList.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(MessageList, {
      // Be aware that props is overridden using `propsData`
      propsData: {
        messages: ["Cat"]
      }
    });
  });

  it('has received ["Cat"] as the message property', () => {
    expect(cmp.vm.messages).toEqual(["Cat"]);
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
```

Find the [full example on Github](https://github.com/alexjoverm/vue-testing-series/tree/lesson-1).
