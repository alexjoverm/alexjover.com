---
title: Test Styles and Structure of Vue.js Components in Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: vue-test-utils provide us with a set of utilities to assert on Vue.js components.
excerpt: vue-test-utils provide us with a set of utilities to assert on Vue.js components.
date: 2017-09-04 08:36:01
layout: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Test Styles and Structure of Vue.js Components in Jest
  - property: og:description
    content: vue-test-utils provide us with a set of utilities to assert on Vue.js components.
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Test-Styles-and-Structure-of-Vue-js-Components-in-Jest
  - name: twitter:card
    content: summary
---

So far, in the tests we've tested via [Jest Snapshots](https://facebook.github.io/jest/docs/snapshot-testing.html). This is great, but sometimes we wanna assert something more specific.

Although you can access the Vue instance via [`cmp.vm`](https://github.com/alexjoverm/vue-testing-series/blob/master/test/MessageList.test.js#L17), you have a set of utilities at your disposal to make it easier. Let's see what we can do.

## The Wrapper object

The `Wrapper` is the main object of `vue-test-utils`. It is the type returned by `mount`, `shallowMount`, `find` and `findAll` functions. You can [see here](https://github.com/vuejs/vue-test-utils/blob/dev/packages/test-utils/types/index.d.ts#L84) the whole API and typings.

### `find` and `findAll`

They accept a [Selector](https://github.com/vuejs/vue-test-utils/blob/dev/packages/test-utils/types/index.d.ts#L17) as an argument, which can be both a CSS selector or a Vue Component.

So we can do things like:

```javascript
let cmp = mount(MessageList);
expect(cmp.find(".message").element).toBeInstanceOf(HTMLElement);

// Or even call it multiple times
let el = cmp.find(".message").find("span").element;

// Although for the previous example, we could do it in one
let el = cmp.find(".message span").element;
```

### Asserting Structure and Style

Let's add more tests to `MessageList.test.js`:

```javascript
it("is a MessageList component", () => {
  expect(cmp.is(MessageList)).toBe(true);

  // Or with CSS selector
  expect(cmp.is("ul")).toBe(true);
});

it("contains a Message component", () => {
  expect(cmp.contains(Message)).toBe(true);

  // Or with CSS selector
  expect(cmp.contains(".message")).toBe(true);
});
```

Here we're using `is` to assert the root component type, and `contains` to check for sub-components existence. Just as `find` they receive a Selector, which can be a CSS Selector or a Component.

We have some utils to assert the **Vue instance**:

```javascript
it("Both MessageList and Message are vue instances", () => {
  expect(cmp.isVueInstance()).toBe(true);
  expect(cmp.find(Message).isVueInstance()).toBe(true);
});
```

Now we're going to assert **Structure** in more detail:

```javascript
it("Message element exists", () => {
  expect(cmp.find(".message").exists()).toBe(true);
});

it("Message is not empty", () => {
  expect(cmp.find(Message).isEmpty()).toBe(false);
});

it('Message has a class attribute set to "message"', () => {
  expect(cmp.find(Message).attributes().class).toBe("message");
});
```

`exists`, `isEmpty` and `attributes` comes in very handy for this.

Then, we have `classes` and `attributes().style` to assert **Styling**. Let's update the `Message.vue` component with a style, since `attributes().style` asserts only inline styles:

```html
<li style="margin-top: 10px" class="message">{{message}}</li>
```

Here the tests:

```javascript
it("Message component has the .message class", () => {
  expect(cmp.find(Message).classes()).toContain("message");
});

it("Message component has style padding-top: 10", () => {
  expect(cmp.find(Message).attributes().style).toBe("padding-top: 10px;");
});
```

## Wrapping up

There is a bunch of utils to make easier testing Vue components. You can find them all in [the typings file](https://github.com/vuejs/vue-test-utils/blob/master/types/index.d.ts).

You can find the working code in [this repo](https://github.com/alexjoverm/vue-testing-series/blob/Test-Styles-and-Structure-in-Vue-js-and-Jest/test/MessageList.test.js).
