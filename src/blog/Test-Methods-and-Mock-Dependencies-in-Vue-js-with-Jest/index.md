---
title: Test Methods and Mock Dependencies in Vue.js with Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: Learn how to test methods and cope with mocking module dependencies.
excerpt: Learn how to test methods and cope with mocking module dependencies.
date: 2017-09-25 08:18:23
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Test Methods and Mock Dependencies in Vue.js with Jest
  - property: og:description
    content: Learn how to test methods and cope with mocking module dependencies.
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Test-Methods-and-Mock-Dependencies-in-Vue-js-with-Jest
  - name: twitter:card
    content: summary
---

What should we test in methods? That's a question that we had when we started doing unit tests. Everything comes down to **test what that method do, and just that**. This means we need to **avoid calls to any dependency**, so we'll need to mock them.

Let's add a `onSubmit` event to the form in the `Form.vue` component that we created in the [last article](../Test-Computed-Properties-and-Watchers-in-Vue-js-Components-with-Jest/):

```html
...
<form action="" @submit.prevent="onSubmit(inputValue)">
...
```

The `.prevent` modifier is just a convenient way to call `event.preventDefault()` in order to don't reload the page. Now make some modifications to call an api and store the result, by adding a `results` array to the data and a `onSubmit` method:

```javascript
data: () => ({
  inputValue: '',
  results: []
}),
methods: {
  onSubmit(value) {
    axios.get('https://jsonplaceholder.typicode.com/posts?q=' + value).then(results => {
      this.results = results.data
    })
  }
},
...
```

The method is using axios to perform an HTTP call to the "posts" endpoint of jsonplaceholder, which is just a RESTful API for this kind of examples, and with the `q` query parameter we can search for posts, using the `value` provided as parameter.

For testing the `onSubmit` method:

- We don't wanna call `axios.get` actual method
- We wanna check it is calling axios (but not the real one) and it returns a promise
- That promise callback should set `this.results` to the promise result

This is probably one of the hardest things to test, when you have external dependencies plus those return promises that do things inside. What we need to do is to **mock the external dependencies**.

## Mock External Module Dependencies

Jest provides a really great mocking system that allows you to mock everything in a quite convenient way. You don't need any extra libraries for that. We have seen already `jest.spyOn` and `jest.fn` for spying and creating stub functions, although that's not enough for this case.

We need to mock the whole `axios` module. Here's where `jest.mock` comes into the stage. It allow us to easily mock module dependencies by writing at the top of you file:

```javascript
jest.mock("dependency-path", implementationFunction);
```

You must know that **`jest.mock` is hoisted**, which means it will be placed at the top. So:

```javascript
jest.mock('something', jest.fn)
import foo from 'bar'
...
```

Is equivalent to:

```javascript
import foo from 'bar'
jest.mock('something', jest.fn) // this will end up above all imports and everything
...
```

By the date of writing, I still haven't seen much info about how to do in Jest what we're gonna do here on the internet. Lucky you don't have to go through the same struggle.

Let's write the mock for axios at the top of the `Form.test.js` test file, and the corresponding test case:

```javascript
jest.mock('axios', () => ({
  get: jest.fn()
}))

import { shallowMount } from '@vue/test-utils'
import Form from '../src/components/Form'
import axios from 'axios' // axios here is the mock from above!

...

it('Calls axios.get', () => {
  cmp.vm.onSubmit('an')
  expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/posts?q=an')
})
```

This is great, we're indeed mocking axios, so the original axios is not called nor any HTTP call. And, we're even checking by using `toBeCalledWith` that it's been called with the right parameters. But we're still missing something: **_we're not checking that it returns a promise_**.

First we need to make our mocked `axios.get` method to return a promise. `jest.fn` accepts a factory function as a parameter, so we can use it to define its implementation:

```javascript
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: 3 }))
}));
```

But still, we cannot access the promise, because we're not returning it. In testing, is a good practice to return something from a function when possible, it makes testing much easier. Let's do it then in the `onSubmit` method of the `Form.vue` component:

```javascript
onSubmit(value) {
  const getPromise = axios.get('https://jsonplaceholder.typicode.com/posts?q=' + value)

  getPromise.then(results => {
    this.results = results.data
  })

  return getPromise
}
```

Then we can use the very clean ES2017 `async/await` syntax in the test to check the promise result:

```javascript
it("Calls axios.get and checks promise result", async () => {
  const result = await cmp.vm.onSubmit("an");

  expect(result).toEqual({ data: [3] });
  expect(cmp.vm.results).toEqual([3]);
  expect(axios.get).toBeCalledWith(
    "https://jsonplaceholder.typicode.com/posts?q=an"
  );
});
```

You can see that we don't only check the promise result, but also that the `results` internal state of the component is updated as expected, by doing `expect(cmp.vm.results).toEqual([3])`.

## Keep mocks externalized

Jest allows us to have all our mocks separated in their own JavaScript file, placing them under a `__mocks__` folder, keeping the tests as clean as possible.

So we can take the `jest.mock...` block from top of the `Form.test.js` file out to it's own file:

```javascript
// test/__mocks__/axios.js
module.exports = {
  get: jest.fn(() => Promise.resolve({ data: [3] }))
};
```

Just like this, with no extra effort, Jest automatically applies the mock in all our tests so we don't have to do anything extra or mocking it in every test manually. Notice the module name must match the file name. If you run the tests again, they should still pass.

Keep in mind the modules registry and the mocks state is kept, so if you write another test afterwards, you may get undesired results:

```javascript
it("Calls axios.get", async () => {
  const result = await cmp.vm.onSubmit("an");

  expect(result).toEqual({ data: [3] });
  expect(cmp.vm.results).toEqual([3]);
  expect(axios.get).toBeCalledWith(
    "https://jsonplaceholder.typicode.com/posts?q=an"
  );
});

it("Axios should not be called here", () => {
  expect(axios.get).toBeCalledWith(
    "https://jsonplaceholder.typicode.com/posts?q=an"
  );
});
```

The second test should fail, but it doesn't! That's because `axios.get` was called on the test before.

For that reason, it's a good practice to clean the module registry and the mocks, since they're manipulated by Jest in order to make mocking happen. For that you can add in your `beforeEach`:

```javascript
beforeEach(() => {
  cmp = shallowMount(Form);
  jest.resetModules();
  jest.clearAllMocks();
});
```

That will ensure each test starts with clean mocks and modules, as it should be in unit testing.

## Conclusion

Jest mocking feature, along with snapshot testing, are what I love the most of Jest! It makes very easy what usually is quite hard to test, and focus on writing faster and better isolated tests and keep your codebase bullet-proof.

You can find the code of this article [in this repo](https://github.com/alexjoverm/vue-testing-series/tree/Test-State-Computed-Properties-and-Methods-in-Vue-js-Components-with-Jest).
