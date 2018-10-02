---
title: Test Deeply Rendered Vue.js Components in Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: Let's see how to use vue-test-utils to test a fully rendered component tree.
excerpt: Let's see how to use vue-test-utils to test a fully rendered component tree.
date: 2017-08-28 11:00:50
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Test Deeply Rendered Vue.js Components in Jest
  - property: og:description
    content: Let's see how to use vue-test-utils to test a fully rendered component tree.
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Test-Deeply-Rendered-Vue-js-Components-in-Jest
  - name: twitter:card
    content: summary
---

In [Write the first Vue.js Component Unit Test in Jest](../Write-the-first-Vue-js-Component-Unit-Test-in-Jest/) we've seen how to use Shallow Rendering to test a component in isolation, preventing the components sub-tree from rendering.

But in some cases, we could want to test components that behave as a group, or [molecules](http://atomicdesign.bradfrost.com/chapter-2/#molecules) as stated in Atomic Design. Keep in mind that this apply to [Presentational Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), since they're unaware of app state and logic. In most case, you'd want to use Shallow Rendering for Container components.

## Adding a Message Component

For the case of a Message and MessageList components, apart from writing their own unit tests, we could want to test them both as a unit as well.

Let's start by creating `components/Message.vue`:

```html
<template>
    <li class="message">{{message}}</li>
</template>

<script>
  export default {
    props: ['message']
  }
</script>
```

And update `components/MessageList.vue` to use it:

```html
<template>
    <ul>
        <Message :message="message" v-for="message in messages"/>
    </ul>
</template>

<script>
import Message from './Message'

export default {
  props: ['messages'],
  components: {
    Message
  }
}
</script>
```

## Testing MessageList with Message Component

To test MessageList with Deep Rendering, we just need to use `mount` instead of `shallowMount` in the previously created `test/MessageList.test.js`:

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

> Btw, have you realized about the `beforeEach` thing? That's a very clean way to create a clean component before each test, which is very important in unit testing, since it defines that test shouldn't depend on each other.

Both `mount` and `shallowMount` use exactly the same API, the difference is in the rendering. I'll show you progressively the API along in this series.

If you run `npm t` you'll see the test are failing because the Snapshot doesn't match for `MessageList.test.js`. To regenerate them, run it with `-u` option:

```
npm t -- -u
```

Then if you open and inspect `test/__snapshots__/MessageList.test.js.snap`, you'll see the `class="message"` is there, meaning the component has been rendered.

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`MessageList.test.js has the expected html structure 1`] = `
<ul>
  <li
    class="message"
  >
    Cat
  </li>
</ul>
`;
```

Keep in mind to **avoid deep rendering when there can be side effects**, since the children component hooks, such `created` and `mount` will be triggered, and there can be HTTP calls or other side effects there that we don't want to be called. If you wanna try what I'm saying, add to the `Message.vue` component a `console.log` in the `created` hook:

```javascript
export default {
  props: ["message"],
  created() {
    console.log("CREATED!");
  }
};
```

Then if you run the tests again with `npm t`, you'll see the `"CREATED!"` text in the terminal output. So, be cautious.

You can find the [full example on Github](https://github.com/alexjoverm/vue-testing-series/tree/https://github.com/alexjoverm/vue-testing-series/tree/Test-fully-rendered-Vue-js-Components-in-Jest).
