---
title: Test Properties and Custom Events in Vue.js Components with Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: Learn different ways to test properties, events and custom events
excerpt: Learn different ways to test properties, events and custom events
date: 2017-09-11 09:30:31
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Test Properties and Custom Events in Vue.js Components with Jest
  - property: og:description
    content: Learn different ways to test properties, events and custom events
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/Test-Properties-and-Custom-Events-in-Vue-js-Components-with-Jest
  - name: twitter:card
    content: summary
---

Properties are custom attributes passed from parent to child components. Custom events solve just the opposite, they send data out to the direct parent via an event. They both combined are the wires of interaction and communication in Vue.js components.

In Unit Testing, testing the in and outs (properties and custom events) means to test how a component behaves when it receives and sends out data in isolation. Let's get our hands dirty!

## Properties

When we are testing component properties, we can test how the component behave when we pass them certain properties. But before going on, an important note:

> To pass properties to components, use `propsData`, and not `props`. The last one is to define properties, not to pass them data.

First create a `Message.test.js` file and add the following code:

```javascript
describe("Message.test.js", () => {
  let cmp;

  describe("Properties", () => {
    // @TODO
  });
});
```

We group test cases within a `describe` expression, and they can be nested. So we can use this strategy to group the tests for properties and events separately.

Then we'll create a helper factory function to create a message component, give some properties

```javascript
const createCmp = propsData => mount(Message, { propsData });
```

### Testing property existence

Two obvious things we can test is that a property exists, or it doesn't. Remember that the `Message.vue` component has a `message` property, so let's assert that it receives correctly that property. vue-test-utils comes with a `hasProp(prop, value)` function, which is very handy for this case:

```javascript
it("has a message property", () => {
  cmp = createCmp({ message: "hey" });
  expect(cmp.props().message).toBe("hey");
});
```

The properties behave in a way that they will be received only if they're declared in the component. Meaning that if we pass a **property that is not defined, it won't be received**. So to check for the no existence of a property, use a non-existing property:

```javascript
it("has no cat property", () => {
  cmp = createCmp({ cat: "hey" });
  expect(cmp.props().cat).toBeUndefined();
});
```

However, although in this case the test will be successful, don't forget that Vue has [non-props attributes](https://vuejs.org/v2/guide/components.html#Non-Prop-Attributes) which sets it to the root of the `Message` component, so you can check that this behavior also works, making sure that the non-prop attribute exists using `attributes()`.

```javascript
it("has no cat property", () => {
  cmp = createCmp({ cat: "hey" });
  expect(cmp.attributes().cat).toBe("hey");
});
```

We can test the **default value** as well. Go to `Message.vue` and change the props as follows:

```javascript
props: {
  message: String,
  author: {
    type: String,
    default: 'Paco'
  }
},
```

Then the test could be:

```javascript
it("Paco is the default author", () => {
  cmp = createCmp({ message: "hey" });
  expect(cmp.props().author).toBe("Paco");
});
```

### Asserting properties validation

Properties can have validation rules, ensuring that a property is required or it is of a determined type. Let's write the `message` property as follows:

```javascript
props: {
  message: {
    type: String,
    required: true,
    validator: message => message.length > 1
  }
}
```

Going further, you could use custom constructors types or custom validation rules, as you can see in [the docs](https://vuejs.org/v2/guide/components.html#Prop-Validation). Don't do this right now, I'm just showing it as an example:

```javascript
class Message {}
...
props: {
  message: {
    type: Message, // It's compared using instance of
    ...
    }
  }
}
```

Whenever a validation rule is not fulfilled, Vue shows a `console.error`. For example, for `createCmp({ message: 1 })`, the next error will be shown:

```
[Vue warn]: Invalid prop: type check failed for prop "message". Expected String, got Number.
(found in <Root>)
```

By the date of writing, `vue-test-utils` doesn't have any utility to test this. We could use `jest.spyOn` to test it:

```javascript
it("message is of type string", () => {
  let spy = jest.spyOn(console, "error");
  cmp = createCmp({ message: 1 });
  expect(spy).toBeCalledWith(
    expect.stringContaining("[Vue warn]: Invalid prop")
  );

  spy.mockReset(); // or mockRestore() to completely remove the mock
});
```

Here we're spying on the `console.error` function, and checking that it shows a message containing a specific string. This is not an ideal way to check it, since we're spying on global objects and relying on side effects.

Fortunately, there is an easier way to do it, which is by checking `vm.$options`. Here's where Vue stores the component options "expanded". With expanded I mean: you can define your properties in a different ways:

```javascript
props: ["message"];

// or

props: {
  message: String;
}

// or

props: {
  message: {
    type: String;
  }
}
```

But they all will end up in the most expanded object form (like the last one). So if we check the `cmp.vm.$options.props.message`, for the first case, they all will be in the `{ type: X }` format (although for the first example it will be `{ type: null }`)

With this in mind, we could write a test suite to test that asserts that the `message` property has the expected validation rules:

```javascript
describe('Message.test.js', () => {
  ...
  describe('Properties', () => {
    ...
    describe('Validation', () => {
      const message = createCmp().vm.$options.props.message

      it('message is of type string', () => {
        expect(message.type).toBe(String)
      })

      it('message is required', () => {
        expect(message.required).toBeTruthy()
      })

      it('message has at least length 2', () => {
        expect(message.validator && message.validator('a')).toBeFalsy()
        expect(message.validator && message.validator('aa')).toBeTruthy()
      })
    })
```

## Custom Events

We can test at least two things in Custom Events:

- Asserting that after an action an event gets triggered
- Checking what an event listener calls when it gets triggered

Which in the case of the `MessageList.vue` and `Message.vue` components example, that gets translated to:

- Assert that `Message` components triggers a `message-clicked` when a message gets clicked
- Check in `MessageList` that when a `message-clicked` happens, a `handleMessageClick` function is called

First, go to `Message.vue` and use `$emit` to trigger that custom event:

```html
<template>
    <li
      style="margin-top: 10px"
      class="message"
      @click="handleClick">
        {{message}}
    </li>
</template>

<script>
  export default {
    name: 'Message',
    props: ['message'],
    methods: {
      handleClick() {
        this.$emit('message-clicked', this.message)
      }
    }
  }
</script>
```

And in `MessageList.vue`, handle the event using `@message-clicked`:

```html
<template>
    <ul>
        <Message
          @message-clicked="handleMessageClick"
          :message="message"
          v-for="message in messages"
          :key="message"/>
    </ul>
</template>

<script>
import Message from './Message'

export default {
  name: 'MessageList',
  props: ['messages'],
  methods: {
    handleMessageClick(message) {
      console.log(message)
    }
  },
  components: {
    Message
  }
}
</script>
```

Now it's time to write a unit test. Create a nested describe within the `test/Message.spec.js` file and prepare the barebones of the test case _"Assert that `Message` components triggers a `message-clicked` when a message gets clicked"_ that we mentioned before:

```javascript
...
describe('Message.test.js', () => {
  ...
  describe('Events', () => {
    beforeEach(() => {
      cmp = createCmp({ message: 'Cat' })
    })

    it('calls handleClick when click on message', () => {
      // @TODO
    })
  })
})
```

### Testing the Event Click calls a method handler

The first thing we can test is that when clicking a message, the `handleClick` function gets called. For that we can use a `trigger` of the wrapper component, and a jest spy using `spyOn` function:

```javascript
it("calls handleClick when click on message", () => {
  const spy = spyOn(cmp.vm, "handleClick");

  const el = cmp.find(".message").trigger("click");
  expect(cmp.vm.handleClick).toBeCalled();
});
```

Keep in mind that by using a spy the original method `handleClick` will be called. Probably you intentionally want that, but normally we want to avoid it and just check that on click the methods is indeed called. For that we can use a Jest Mock function:

```javascript
it("calls handleClick when click on message", () => {
  cmp.vm.handleClick = jest.fn();

  const el = cmp.find(".message").trigger("click");
  expect(cmp.vm.handleClick).toBeCalled();
});
```

Here we're totally replacing the `handleClick` method, accessible on the vm of the wrapper component returned by the mount function.

However, the above test will fail because we didn't indicate that we want to use a Jest Mock function, and not the original method. To fix this, we use the helper method `setMethods` that the official tools provide us:

```javascript
it("calls handleClick when click on message", () => {
  const stub = jest.fn();
  cmp.setMethods({ handleClick: stub });

  const el = cmp.find(".message").trigger("click");
  expect(stub).toBeCalled();
});
```

Using **`setMethods` is the suggested way** to do it, since is an abstraction that official tools give us in case the Vue internals change.

### Testing the Custom Event `message-clicked` is emitted

We've tested that the click method calls it's handler, but we haven't tested that the handler emits the `message-clicked` event itself. We can call directly the `handleClick` method, and use a Jest Mock function in combination with the Vue vm `$on` method:

```javascript
it("triggers a message-clicked event when a handleClick method is called", () => {
  const stub = jest.fn();
  cmp.vm.$on("message-clicked", stub);
  cmp.vm.handleClick();

  expect(stub).toBeCalledWith("Cat");
});
```

See that here we're using `toBeCalledWith` so we can assert exactly which parameters we expect, making the test even more robust.

### Testing the @message-clicked triggers an event

For custom events, we cannot use the `trigger` method, since it's just for DOM events. But, we can emit the event ourselves, by getting the Message component and using its `vm.$emit` method. So add the following test to `MessageList.test.js`:

```javascript
it("Calls handleMessageClick when @message-click happens", () => {
  const stub = jest.fn();
  cmp.setMethods({ handleMessageClick: stub });

  const el = cmp.find(Message).vm.$emit("message-clicked", "cat");
  expect(stub).toBeCalledWith("cat");
});
```

I'll leave up to you to test what `handleMessageClicked` does ;).

## Wrapping up

Here we've seen several cases to test properties and events. `vue-test-utils`, the official Vue testing tools, makes this much easier indeed.

You can find the working code we've used here in [this repo](https://github.com/alexjoverm/vue-testing-series/tree/Test-Properties-and-Custom-Events-in-Vue-js-Components-with-Jest).
