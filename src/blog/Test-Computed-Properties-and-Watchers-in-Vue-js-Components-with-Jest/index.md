---
title: Test Computed Properties and Watchers in Vue.js Components with Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: Learn about testing the Computed Properties and Watchers reactivity in Vue.js
excerpt: Learn about testing the Computed Properties and Watchers reactivity in Vue.js
date: 2017-09-18 11:25:20
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Test Computed Properties and Watchers in Vue.js Components with Jest
  - property: og:description
    content: Learn about testing the Computed Properties and Watchers reactivity in Vue.js
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Test-Computed-Properties-and-Watchers-in-Vue-js-Components-with-Jest
  - name: twitter:card
    content: summary
---

<BookSuggestion/>

Computed properties and watchers are reactive parts of the logic of Vue.js components. They both serve totally different purposes, one is synchronous and the other asynchronous, which makes them behave slightly different.

In this article we'll go through testing them and see what different cases we can find on the way.

## Computed Properties

Computed properties are simple reactive functions that return data in another form. They behave exactly like the language standard `get/set` properties:

```javascript
class X {
  ...

  get fullName() {
    return `${this.name} ${this.surname}`
  }

  set fullName() {
    ...
  }
}
```

In fact, when you're building class based Vue components, as I explain in my [Egghead course "Use TypeScript to Develop Vue.js Web Applications"](https://egghead.io/courses/use-typescript-to-develop-vue-js-web-applications), you'll write it just like that. If you're using plain objects, it'd be:

```javascript
export default {
  ...
  computed: {
    fullName() {
      return `${this.name} ${this.surname}`
    }
  }
}
```

And you can even add the `set` as follows:

```javascript
computed: {
    fullName: {
      get() {
        return `${this.name} ${this.surname}`
      },
      set() {
        ...
      }
    }
  }
```

### Testing Computed Properties

Testing a computed property is very simple, and probably sometimes you don't test a computed property exclusively, but test it as part of other tests. But most times it's good to have a test for it, whether that computed property is cleaning up an input, or combining data, we wanna make sure things work as intended. So let's begin.

First of all, create a `Form.vue` component:

```html
<template>
  <div>
    <form action="">
      <input type="text" v-model="inputValue">
      <span class="reversed">{{ reversedInput }}</span>
    </form>
  </div>
</template>

<script>
export default {
  props: ['reversed'],
  data: () => ({
    inputValue: ''
  }),
  computed: {
    reversedInput() {
      return this.reversed ?
        this.inputValue.split("").reverse().join("") :
        this.inputValue
    }
  }
}
</script>
```

It will show an input, and next to it the same string but reversed. It's just a silly example, but enough to test it.

Now add it to `App.vue`, put it after the `MessageList` component, and remember to import it and include it within the `components` component option. Then, create a `test/Form.test.js` with the usual bare-bones we've used in other tests:

```javascript
import { shallowMount } from "@vue/test-utils";
import Form from "../src/components/Form";

describe("Form.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Form);
  });
});
```

Now create a test suite with 2 test cases:

```javascript
describe("Properties", () => {
  it("returns the string in normal order if reversed property is not true", () => {
    cmp.setData({ inputValue: "Yoo" });
    expect(cmp.vm.reversedInput).toBe("Yoo");
  });

  it("returns the reversed string if reversed property is true", () => {
    cmp.setData({ inputValue: "Yoo" });
    cmp.setProps({ reversed: true });
    expect(cmp.vm.reversedInput).toBe("ooY");
  });
});
```

We can access the component instance within `cmp.vm`, so we can access the internal state, computed properties and methods. Then, to test it is just about changing the value and making sure it returns the same string when reversed is false.

For the second case, it would be almost the same, with the difference that we must set the `reversed` property to true. We could navigate through `cmp.vm...` to change it, but vue-test-utils give us a helper method `setProps({ property: value, ... })` that makes it very easy.

That's it, depending on the computed property it may need more test cases.

## Watchers

Honestly, I haven't come across any case where I really need to use watchers that I computed properties couldn't solve. I've seen them misused as well, leading to a very unclear data workflow among components and messing everything up, so don't rush on using them and think beforehand.

As you can see in the [Vue.js docs](https://vuejs.org/v2/guide/computed.html#Watchers), watchers are often used to react to data changes and perform asynchronous operations, such can be performing an ajax request.

### Testing Watchers

Let's say we wanna do something when the `inputValue` from the state change. We could do an ajax request, but since that's more complicated and we'll see it in the next lesson, let's just do a `console.log`. Add a `watch` property to the `Form.vue` component options:

```javascript
watch: {
  inputValue(newVal, oldVal) {
    if (newVal.trim().length && newVal !== oldVal) {
      console.log(newVal)
    }
  }
}
```

Notice the `inputValue` watch function matches the state variable name. By convention, Vue will look it up in both `properties` and `data` state by using the watch function name, in this case `inputValue`, and since it will find it in `data`, it will add the watcher there.

See that a watch function takes the new value as a first parameter, and the old one as the second. In this case we've chosen to log only when it's not empty and the values are different. Usually, we'd like to write a test for each case, depending on the time you have and how critical that code is.

What should we test about the watch function? Well, that's something we'll also discuss further in the next lesson when we talk about testing methods, but let's say we just wanna know that it calls the `console.log` when it should. So, let's add the bare bones of the watchers test suite, within `Form.test.js`:

```javascript
describe('Form.test.js', () => {
  let cmp
  ...

  describe('Watchers - inputValue', () => {
    let spy

    beforeAll(() => {
      spy = jest.spyOn(console, 'log')
    })

    afterEach(() => {
      spy.mockClear()
    })

    it('is not called if value is empty (trimmed)', () => {
    })

    it('is not called if values are the same', () => {
    })

    it('is called with the new value in other cases', () => {
    })
  })
})
```

We're using a spy on the `console.log` method, initializing before starting any test, and resetting its state after each of them, so that they start from a clean spy.

To test a watch function, we just need to change the value of what's being watch, in this case the `inputValue` state. But there is something curious... let's start from last test:

```javascript
it("is called with the new value in other cases", () => {
  cmp.vm.inputValue = "foo";
  expect(spy).toBeCalled();
});
```

We change the `inputValue`, so the `console.log` spy should be called, right? Well, it won't... But wait, there is an explanation for this: unlike computed properties, watchers are **deferred to the next update cycle** that Vue uses to look for changes. So, basically, what's happening here is that `console.log` is indeed called, but after the test has finished.

Notice that we're changing `inputValue` in the _raw_ way, accessing the `vm` property. If we wanted to do it this way, we'd need to use [`vm.$nextTick`](https://vuejs.org/v2/api/#vm-nextTick) function to defer code to the next update cycle:

```javascript
it("is called with the new value in other cases", done => {
  cmp.vm.inputValue = "foo";
  cmp.vm.$nextTick(() => {
    expect(spy).toBeCalled();
    done();
  });
});
```

_Notice that we call a `done` function that we receive as a parameter. That's [one way Jest](https://jestjs.io/docs/en/asynchronous.html) has to test asynchronous code._

However, there is a **much better way**. The methods that vue-test-utils give us, such as `emitted` or `setData`, take care of that under the hood. So the last test can be written in a cleaner way just by using `setData`:

```js
it("is called with the new value in other cases", () => {
  cmp.setData({ inputValue: "foo" });
  expect(spy).toBeCalled();
});
```

We can apply the same strategy for the next one, with the difference that the spy shouldn't be called:

```javascript
it("is not called if value is empty (trimmed)", () => {
  cmp.setData({ inputValue: "   " });
  expect(spy).not.toBeCalled();
});
```

Finally, testing that _is not called if values are the same_ is a bit more complex. The default internal state is empty, so first we need to change it, wait for the next tick, then clear the mock to reset the call count, and change it again. Then after the second tick, we can check the spy and finish the test.

This can get simpler if we recreate the component at the beginning, overriding the `data` property. Remember we can override any component option by using the second parameter of the `mount` or `shallowMount` functions:

```javascript
it("is not called if values are the same", () => {
  cmp = shallowMount(Form, {
    data: () => ({ inputValue: "foo" })
  });
  cmp.setData({ inputValue: "foo" });
  expect(spy).not.toBeCalled();
});
```

## Conclusion

You've learned in this article how to test part of the logic of Vue components: computed properties and watchers. We've gone through different test cases we can come across testing them. Probably you've also learned some of the Vue internals such as the `nextTick` update cycles.

You can find the code of this article [in this repo](https://github.com/alexjoverm/vue-testing-series/tree/Test-State-Computed-Properties-and-Methods-in-Vue-js-Components-with-Jest).
