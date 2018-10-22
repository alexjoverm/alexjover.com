---
title: Test Vue.js Slots in Jest
tags:
  - VueJS
  - JavaScript
  - Testing
description: Learn how to test content distributed using slots and named slots.
excerpt: Learn how to test content distributed using slots and named slots.
date: 2017-10-02 14:50:49
page: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Test Vue.js Slots in Jest
  - property: og:description
    content: Learn how to test content distributed using slots and named slots.
  - property: og:image
    content: https://alexjover.com/alex.jpg
  - property: og:url
    content: https://alexjover.com/blog/Test-Vue-js-Slots-in-Jest
  - name: twitter:card
    content: summary
---

<BookSuggestion/>

Slots are the way to make content distribution happen in the web components world. Vue.js slots are made following the [Web Component specs](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md), meaning that if you learn how to use them in Vue.js, that will be useful in the future ;).

They make components structure to be much more flexible, moving the responsibility of managing the state to the parent component. For example, we can have a `List` component, and different kind of item components, such `ListItem` and `ListItemImage`. They'll be used like:

```html
<template>
  <List>
    <ListItem :someProp="someValue" />
    <ListItem :someProp="someValue" />
    <ListItemImage :image="imageUrl" :someProp="someValue" />
  </List>
</template>
```

The inner content of `List` is the slot itself, and its accessible via `<slot>` tag. So the `List` implementation looks like:

```html
<template>
  <ul>
    <!-- slot here will equal to what's inside <List> -->
    <slot></slot>
  </ul>
</template>
```

And, say that the `ListItem` component looks like:

```html
<template>
  <li> {{ someProp }} </li>
</template>
```

Then, the final result rendered by Vue.js would be:

```html
<ul>
  <li> someValue </li>
  <li> someValue </li>
  <li> someValue </li> <!-- assume the same implementation for ListItemImage -->
</ul>
```

## Make MessageList slot based

Let's take a look at the `MessageList.vue` component:

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
```

MessageList has "hardcoded" the Message component inside. In a way that's more automated, but in the other is not flexible at all. What if you wanna have different types of Message components? What about changing its structure or styling? That's where slots come in handy.

Let's change `Message.vue` to use slots. First, move that `<Message...` part to the `App.vue` component, as well as the `handleMessageClick` method, so it's used externally:

```html
<template>
  <div id="app">
    <MessageList>
      <Message
          @message-clicked="handleMessageClick"
          :message="message"
          v-for="message in messages"
          :key="message"/>
    </MessageList>
  </div>
</template>

<script>
import MessageList from './components/MessageList'
import Message from './components/Message'

export default {
  name: 'app',
  data: () => ({ messages: ['Hey John', 'Howdy Paco'] }),
  methods: {
    handleMessageClick(message) {
      console.log(message)
    }
  },
  components: {
    MessageList,
    Message
  }
}
</script>
```

Don't forget to import the Message component and add it to the `components` option in `App.vue`.

Then, in `MessageList.vue`, we can remove the references to `Message`, looking like:

```html
<template>
    <ul class="list-messages">
        <slot></slot>
    </ul>
</template>

<script>
export default {
  name: 'MessageList'
}
</script>
```

## `$children` and `$slots`

Vue components have two instance variables useful for accessing slots:

- `$children`: an array of Vue component instances of the default slot.
- `$slots`: an object of VNodes mapping all the slots defined in the component instance.

The `$slots` object has more data available. In fact, `$children` is just a portion of the `$slots` variable, that could be accessed the same way by mapping over the `$slots.default` array, filtered by Vue component instances:

```javascript
const children = this.$slots.default
  .map(vnode => vnode.componentInstance)
  .filter(cmp => !!cmp);
```

## Testing Slots

Probably what we want to test the most out of slots is where they end up in the component, and for that we can reuse the skills got in the article _[Test Styles and Structure of Vue.js Components in Jest](../Test-Styles-and-Structure-of-Vue-js-Components-in-Jest/)_.

Right now, most of the tests in `MessageList.test.js` will fail, so let's remove them all (or comment them out), and focus on slot testing.

One thing we can test, is to make sure that the Message components end up within a `ul` element with class `list-messages`. In order to pass slots to the `MessageList` component, we can use the `slots` property of the options object of `mount` or `shallowMount` methods. So let's create a [`beforeEach` method](https://jestjs.io/docs/en/api.html#beforeeachfn-timeout) with the following code:

```javascript
beforeEach(() => {
  cmp = shallowMount(MessageList, {
    slots: {
      default: '<div class="fake-msg"></div>'
    }
  });
});
```

Since we just want to test if the messages are rendered, we can search for `<div class="fake-msg"></div>` as follows:

```javascript
it("Messages are inserted in a ul.list-messages element", () => {
  const list = cmp.find("ul.list-messages");
  expect(list.findAll(".fake-msg").length).toBe(1);
});
```

And that should be ok to go. The slots option also accepts a component declaration, and even an array, so we could write:

```javascript
import AnyComponent from 'anycomponent'
...
shallowMount(MessageList, {
  slots: {
    default: AnyComponent // or [AnyComponent, AnyComponent]
  }
})
```

The problem with that is that is very limited, you cannot override props for example, and we need that for the `Message` component since it has a required property. This should affect the cases that you really need to test slots with the expected components. For example, if you wanna make sure that `MessageList` expects only `Message` components as slots. That's [on track and at some point it will land in vue-test-utils](https://github.com/vuejs/vue-test-utils/issues/41#issue-255235880).

As a workaround, we can accomplish that by using a [render function](https://vuejs.org/v2/guide/render-function.html). So we can rewrite the test to be more specific:

```javascript
beforeEach(() => {
  const messageWrapper = {
    render(h) {
      return h(Message, { props: { message: "hey" } });
    }
  };

  cmp = shallowMount(MessageList, {
    slots: {
      default: messageWrapper
    }
  });
});

it("Messages are inserted in a MessageList component", () => {
  const list = cmp.find(MessageList);
  expect(list.find(Message).isVueInstance()).toBe(true);
});
```

## Testing Named Slots

The unnamed slot we used above is called the _default slot_, but we can have multiple slots by using named slots. Let's add a header to the `MessageList.vue` component:

```html
<template>
  <div>
    <header class="list-header">
      <slot name="header">
        This is a default header
      </slot>
    </header>
    <ul class="list-messages">
        <slot></slot>
    </ul>
  </div>
</template>
```

By using `<slot name="header">` we're defining another slot for the header. You can see a `This is a default header` text inside the slot, that's displayed as the default content when a slot is not passed to the component, and that's applicable to the default slot.

Then, from `App.vue` we can use add a header to the `MessageList` component by using the `slot="header"` attribute:

```html
<template>
  <div id="app">
    <MessageList>
      <header slot="header">
        Awesome header
      </header>
      <Message
          @message-clicked="handleMessageClick"
          :message="message"
          v-for="message in messages"
          :key="message"/>
    </MessageList>
  </div>
</template>
```

It's time to write a unit test for it. Testing named slots is just as testing a default slot, the same dynamics apply. So, we can start by testing that the header slot is rendered within the `<header class="list-header">` element, and it renders a default text when no header slot is passed by. In `MessageList.test.js`:

```javascript
it("Header slot renders a default header text", () => {
  const header = cmp.find(".list-header");
  expect(header.text().trim()).toBe("This is a default header");
});
```

Then, the same but checking the default content gets replaced when we mock the header slot:

```javascript
it("Header slot is rendered withing .list-header", () => {
  const component = shallowMount(MessageList, {
    slots: {
      header: "<div>What an awesome header</div>"
    }
  });

  const header = component.find(".list-header");
  expect(header.text().trim()).toBe("What an awesome header");
});
```

See that the header slot used in this last test is wrapped in a `<div>`. It's important the slots are wrapped in an html tag, otherwise vue-test-utils will complain.

## Testing Contextual Slot Specs

We've test how and where the slots render, and probably that's what we mostly need. However, it doesn't end there. If you pass component instances as slots, just as we're doing in the default slot with Message, you can test functionality related to it.

Be careful on what you test here, this is probably something you don't need to do in most cases, since the functional tests of a component should belong to that component test. When talking about testing slots functionality, we test how a slot must behave **in the context of the component where that slot is used**, and that's something is not very common. Normally we just pass the slot and forget about it. So don't get too stick to the following example, It's only purpose is to demonstrate how the tool works.

Let's say that, for whatever reason, in the context of the `MessageList` component, all the `Message` components must have a length higher than 5. We can test that like:

```javascript
it("Message length is higher than 5", () => {
  const messages = cmp.findAll(Message);
  messages.wrappers.forEach(c => {
    expect(c.vm.message.length).toBeGreaterThan(5);
  });
});
```

`findAll` returns an object containing an array of `wrappers` where we can access its `vm` component instance property. This test will fail because the message has a length of 3, so go to the `beforeEach` function and make it longer:

```javascript
beforeEach(() => {
  const messageWrapper = {
    render(h) {
      return h(Message, { props: { message: 'hey yo' }  })
    }
  }
...
```

Then it should pass.

## Conclusion

Testing slots is very simple, normally we'd like to test that they're placed and rendered as we want, so is just like testing style and structure knowing how slots behave or can be mocked. You won't need to test slot functionality very ofter probably. Keep in mind to test things only related to slots when you want to test slots, and think twice if what you're testing belongs to the slot test or the component test itself.

You can find the code of this article [in this repo](https://github.com/alexjoverm/vue-testing-series/tree/test-slots).
