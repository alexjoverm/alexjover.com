---
title: How I made a Progressive Web App out of my Blog
tags:
  - PWA
  - JavaScript
description: I wanted to learn about PWA (Progressive Web Apps), so I decided to make this blog a PWA
excerpt: >-
  One day I wanted to learn about PWA (Progressive Web App), so I though: What's better than doing it with my own blog?
date: 2017-08-07
layout: Post
hero: heroes/Post
meta:
  - property: og:title
    content: How I made a Progressive Web App out of my Blog
  - property: og:description
    content: I wanted to learn about PWA (Progressive Web Apps), so I decided to make this blog a PWA
  - property: og:image
    content: /alex.jpg
  - property: og:url
    content: /blog/2017/08/How-I-made-a-Progressive-Web-App-out-of-my-Blog/
  - name: twitter:card
    content: summary
---

I think that's something developers do: when we want to learn something, we go and get our hands dirty, right?

The first thing I wanted was to get **metrics and insights** on the blog at that point. For that I used [Lighthouse](https://github.com/GoogleChrome/lighthouse) in its Chrome extension version.

<!-- {% asset_img pwa_before.png "Lighthouse: metrics before" %} -->

By default, the performance stats were quite good. I wasn't surprised: my blog runs on [Hexo](https://hexo.io/), a NodeJS static site generator which I'm in love with due to its blazing speed, easiness of deployment, and familiarity with NodeJS and its ecosystem.

For the PWA metrics, it was half-way, and I've never payed attention to that. Let's see what steps I did to make it 100% a Progressive Web App.

## 1. Create a <b>Web App Manifest</b> and Icons

The [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) is a JSON file designed to describe a Web Application. This is a excerpt of my `manifest.json`:

```json
{
  "name": "Alex Jover Blog",
  "short_name": "AlexJ Blog",
  "theme_color": "#008aff",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [
    {
      "src": "images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
  ...
```

I think the names are pretty descriptive by themselves. Make sure at least you add the `name`, `short_name` and `icons` fields.

Some other fields you may be interested in, are `start_url` and `scope`.

As per the **icons**, you need to generate them in several sizes. For that I've used [this Web App Manifest generator](https://app-manifest.firebaseapp.com/), which also helps you creating the `manifest.json` file. I've downloaded the zip file from that web, unzipped it and moved the files to where they belong. Then updated the `src` property of the `icons` array as needed.

Finally, you must include it with a `meta` tag in the [head of the HTML](https://github.com/alexjoverm/blog/blob/master/themes/beautiful-hexo/layout/partial/head.jade) (you'll see my examples are in Jade/Pug, but I'll write it here in pure HTML):

```html
<link rel="manifest" href="/manifest.json">
```

## 2. Add meta tags

You need to add [some meta tags](https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/) so all supported browsers would appropriately understand it as a Progressive Web App. The [tags I added](https://github.com/alexjoverm/blog/blob/master/themes/beautiful-hexo/layout/partial/head.jade#L13-L23) are:

```html
<link rel="icon" href="/images/icons/icon-152x152.png">
<!-- theme-color defines the top bar color (blue in my case)-->
<meta name="theme-color" content="#008aff"/>

<!-- Add to home screen for Safari on iOS-->
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
<meta name="apple-mobile-web-app-title" content="Alex Jover Blog"/>
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png"/>

<!-- Add to home screen for Windows-->
<meta name="msapplication-TileImage" content="/images/icons/icon-152x152.png"/>
<meta name="msapplication-TileColor" content="#000000"/>
```

As you can see, some platforms have their own meta tags.

## 3. Create a Pre-cache Service Worker

Creating a [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) could be a very tedious job, they're very versatile and allow to do a lot of things.

For most cases, we want to use them to cache all the static files, so our app can work offline. There are different strategies to do this, they all are explained very well in the [Offline Cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/), written by [Jake Archibald](https://twitter.com/jaffathecake) at Google. Another resource worth checking is [serviceworke.rs](https://serviceworke.rs/).

Still, it's quite some work to create and maintain a Service Worker for this purpose and every project. That's where [sw-precache](https://github.com/GoogleChrome/sw-precache) comes in handy, a tool that automatically creates a pre-cache Service Worker for a set of static assets using the [cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) strategy.

If you're using Webpack in your project, you're lucky to have a [sw-precache plugin](https://github.com/goldhand/sw-precache-webpack-plugin) that you can plug in your conf to create a Service Worker for your bundled assets automatically.

In my case, I'm not using webpack, gulp or anything. Just a modified version of [Beautiful Hexo](https://github.com/twoyao/beautiful-hexo) theme with plain css, js and images.

But that's no problem. You can use **sw-precache command line utility**. For that, I created first a [sw-config.js](https://github.com/alexjoverm/blog/blob/master/sw-config.js) file, indicating the assets to cache and the prefix to strip out, since the service worker will be under the public folder as well:

```javascript
module.exports = {
  staticFileGlobs: [
    "public/css/**.css",
    "public/**/**.html",
    "public/**/**.jpg",
    "public/**/**.png",
    "public/js/**.js"
  ],
  stripPrefix: "public"
};
```

Then simply running `sw-precache --config sw-config.js`, it creates a [service-worker.js](https://github.com/alexjoverm/blog/blob/master/service-worker.js) file ready to use.

_Note: keep in mind Service Workers run only in localhost or in a HTTPS url_

## 4. Register the Service Worker

Once created a `service-worker.js` file, you need to register it in your app. For that, I used a [battle tested service-worker-registration.js file](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js) located on the sw-precache repo.

Then I simply copied it [to my repo](https://github.com/alexjoverm/blog/blob/master/themes/beautiful-hexo/source/js/sw-register.js) where the js files of the theme are.

## 5. Glue all together

So far I've got needed for building an offline ready and installable Progressive Web App:

- Having a `manifest.json` with icons
- Adding `meta` tags
- Create a Service Worker for pre-caching
- Run in on HTTPS (I'm using Github Pages)

Then only thing is, every time I post or change anything from the theme, I must re-create the precache service worker file, which is a bit repetitive.

That's why I wrote a extremely [simple script](https://github.com/alexjoverm/blog/blob/master/deploy.sh):

```bash
hexo generate -f # re-generates the static assets
sw-precache --config sw-config.js # creates the service worker
cp service-worker.js public # copies it to the static site folder
hexo deploy # deploys it to github pages
```

So as before I only needed to do `hexo deploy -g`, which generates the `public` folder and deploys it, now I had to add 2 steps in between for the service worker creation, and using this script it's very comfortable to do.

## Checking out

Running again a Lighthouse audit, I saw that was all to get the 100 PWA metrics, plus some extra performance and accessibility improvements I made:

<!-- {% asset_img pwa_after.png "Lighthouse: metrics after" %} -->

When I opened from my Android phone on Chrome, I saw the _"Add to Home"_ banner, which made me very happy to see my Blog being **installable such a native app**:

<div class="img-vertical">
<!-- {% asset_img pwa_banner.png "Install banner" %} -->
</div>

And best of all, the blog is **fully working offline**, so go try out turning off your internet connection and see the magic of a working Progressive Web App :)

## Conclusion

It's amazing to learn new stuff, specially such early technologies as Progressive Web Apps, but is even better to learn it by applying it to a real project of yourself!
