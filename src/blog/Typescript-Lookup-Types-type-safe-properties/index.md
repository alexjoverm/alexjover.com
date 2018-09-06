---
title: "TypeScript Lookup Types: type-safe properties"
description: Typescript 2.1 introduced lookup types. What are they for? In which cases are they useful?
excerpt: Typescript 2.1 introduced lookup types. What are they for? In which cases are they useful?
date: 2017-04-11 12:55:23
tags:
  - TypeScript
layout: Post
hero: heroes/Post
meta:
  - property: og:title
    content: "TypeScript Lookup Types: type-safe properties"
  - property: og:description
    content: Typescript 2.1 introduced lookup types. What are they for? In which cases are they useful?
  - property: og:image
    content: /alex.jpeg
  - property: og:url
    content: /blog/Typescript-Lookup-Types-type-safe-properties
  - name: twitter:card
    content: summary
---

**_Wait, a video explaining Lookup Types?_ Yes! Check it out on [Egghead.io](https://egghead.io/instructors/alex-jover-morales)!**

That's something I was wondering for a while. I read [the official docs](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html) and [Marius Schulz post](https://blog.mariusschulz.com/2017/01/06/typescript-2-1-keyof-and-lookup-types) where quite well explain it, but didn't totally get the use of it. I needed to come across a real world case where I had to use it.

Then I made a [PR to Jest on DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/14867) repository for adding the `spyOn` function introduced in [Jest 19](https://facebook.github.io/jest/). That's when I finally understood it.

## What exactly are Lookup types?

Basically a lookup type defines an indexed property type of another type. They are created using the `keyof` operator, which returns an union of string literals:

```typescript
// Given a Bike type
interface Bike {
  model: string;
  weight: number;
  ride: Function;
}

// Get all prop names of Bike
type BikePropNames = keyof Bike; // "model" | "weight" | "ride"

// We can get the all prop types of Bike as well
type BikePropTypes = Bike[BikePropNames]; // "string" | "number" | "Function"
```

Typescript infers the string literals by looking up on the types used, either for the `keyof` operator and element access.

### OK... But when can this be useful?

Let's take the `jest.spyOn` function, as an example. The function works takes an object as a first parameter, and the method you wanna spy on as a second parameter. I've [first wrote](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/14867/commits/46f23ff159f5944f09d366b4385b4df9bcef3ed2) it like this:

```typescript
function spyOn(object: any, method: string);
```

Yes, this would work. But what if, given the `Bike` example, I use a non-existent method as a second parameter?

```typescript
const bike: Bike = {
  model: "Orbea X5",
  weigth: 10,
  ride: () => console.log("riding!!")
};

// No TS error, but it would fail, since 'blabla' is not a method of bike
spyOn(bike, "blabla");
```

This is not type-safe, ts will not complain at all. How can we do this type-safe?

```typescript
function spyOn<O, M extends keyof O>(object: O, method: M)

...

spyOn(bike, 'blabla') // now TS throws an error :)
spyOn(bike, 'ride') // This works
```

If you still don't understand the `spyOn` declaration, basically is saying:

- `<O, M extends keyof O>`: `O` is any object, and `M` is a property of `O`
- `object: O, method: M`: we expect `O` (any object) as a first parameter, and `M` (a property of `O` as a second)

Do you see now the power of lookup types? You can dynamically generate string literal union types! That'll make your type definitions much more accurate ;)
