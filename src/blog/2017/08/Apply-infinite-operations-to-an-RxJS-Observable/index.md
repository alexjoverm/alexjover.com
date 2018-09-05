---
title: Apply infinite operations to an RxJS Observable
tags:
  - RxJS
  - JavaScript
description: Learn how easy is to apply a set of operations to a RxJS Observable in JavaScript
excerpt: Learn how easy is to apply a set of operations to a RxJS Observable in JavaScript
date: 2017-08-14 08:27:38
featuredImage: /posts/rxjs.png
layout: Post
hero: heroes/Post
meta:
  - property: og:title
    content: Apply infinite operations to an RxJS Observable
  - property: og:description
    content: Learn how easy is to apply a set of operations to a RxJS Observable in JavaScript.
  - property: og:image
    content: /posts/rxjs.png
  - property: og:url
    content: /blog/2017/08/Apply-infinite-operations-to-an-RxJS-Observable/
  - name: twitter:card
    content: summary
---

<!-- {% asset_img rxjs.png RxJS %} -->

This week, my friend [@alejandro_such](https://twitter.com/alejandro_such) asked me about how to apply infinite operations to an [RxJS](http://reactivex.io/rxjs/) observable. Honestly, is not something I stumbled upon before, but every single case you need to solve in RxJS feels like a new challenge. That makes room to write a RxJS cookbook, but that's not why you're reading this today 😉.

_Note: you need a bit of RxJS knowledge to follow up the article_

## The problem

We're used to see and write [Observables operators](http://reactivex.io/rxjs/manual/overview.html#operators) in a chain:

```javascript
const stream = Rx.Observable.of(0, 1, 2);

stream
  .map(val => val + 1)
  .filter(val => val % 2 === 0)
  .subscribe(res => console.log("Res: " + res)); // Res: 2
```

Now imagine you need to apply an undetermined set of operations. In that case you cannot chain them anymore. One could write the following code:

```javascript
const sum = val => val + 1;
const fns = [sum, sum, sum];
const stream = Rx.Observable.of(0);

fns.forEach(fn => stream.map(fn));

stream.subscribe(res => console.log("Res: " + res));
// Expected output ==> Res: 3
// Actual output ==> Res: 0
```

How's it possible that we added 3 map operations, and we get `Res: 0`? It's like we didn't do anything at all.

Simple: because **observables are immutable**. So, whenever you apply an operator, it's returning a new observable. Avoiding side effects is one point of FP (Functional Programming), and RxJS is a FRP (Functional Reactive Programming) library. It's a common pitfall to think that the operators return a mutated version of their same instance.

## The solution

We need to store the new observable returned by every operator, and apply the next operator over that one. A simple way, following the previous example:

```javascript
const sum = val => val + 1;
const fns = [sum, sum, sum];
const stream = Rx.Observable.of(0);

fns.forEach(fn => {
  stream = stream.map(fn); // update with new observable
});

stream.subscribe(res => console.log("Res: " + res));
```

Or, if we wanna go functional and avoid side effects, `reduce` plays very well here:

```javascript
// Try yourself at http://jsbin.com/qucihequdu/edit?js,console
const sum = val => val + 1;
const fns = [sum, sum, sum];
const original = Rx.Observable.of(0);

const mapped = fns.reduce(
  (acum, fn) => acum.map(res => fn(res)), // Apply and return new observable
  original
);

mapped.subscribe(res => console.log("Res: " + res));
```

Go to [this jsbin](http://jsbin.com/qucihequdu/edit?js,console) and start playing with it!
