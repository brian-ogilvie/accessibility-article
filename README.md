# Accessibility in React

As developers, how can we use React hooks and a good dose of common sense to quickly improve the accessibility of our apps?

## Resources

[Sample code on GitHub](https://github.com/brian-ogilvie/accessibility-article)

[Deployed App](https://accessibility-hooks.netlify.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5275cbe-3532-4b2e-b47d-d2cf9d884d3c/deploy-status)](https://app.netlify.com/sites/accessibility-hooks/deploys)

## Introduction

Accessibility is an enormous topic, which often left me feeling overwhelmed when I began my journey as a developer. I had no idea where to start. I was always asking myself, "Now that I've built this thing, how do I make sure it's accessible?" The guidelines put out there are sprawling, and one could make an entire career out of monitoring accessibility alone (and many have). But assuming you just want to build cool stuff that everyone can use, let's cover some basics that will take care of 90% of all use cases while adding minimal stress to your development cycle. 

First of all, I think of accessibility as falling into two major categories: design and implementation. Design decisions around accessibility involve which colors have the appropriate contrast ratio so that text is readable, how much space to put in between things so that buttons can be clicked, where elements are placed on the page to avoid user confusion, etc. I'm a developer, and design decisions are beyond my purview, so we're not going to talk about that today. Let's assume we've been given a good design by a competent designer, and our job is to **implement** this design in the most accessible way possible.

## Before We Start

Before we get into the code, there are a few tips I'll share that will make your life as an accessibility-conscious developer much easier:

### ESLint Is Your Friend.

The first thing I do with every single project is set up ESLint. Do yourself a favor, and don't skip this step. I don't need to memorize every single rule or guideline about accessibility, because my linter will let me know of problems in my code that I never anticipated. If you're using VSCode, install the ESLint extension, so that proplems in your code will be underlined in red as you type. Hovering over the problems will give you a brief explanation of the issue and how to fix it. 

So how do I configure it? There is an awesome command line tool for setting up ESLint in your project:

```
npx eslint --init
```

Simply follow the prompts, and the CLI will download all the necessary dependencies and write your `.eslintrc` config file for you. Personally, I'm a big fan of the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript). One of the options given to you in the CLI wizard is to use the Airbnb ESLint plugin, and it comes bundled with all the A11Y rules. I'd go with this, but if you'd prefer to use a different style guide, or just want something a little less opinionated, you can simply install the A11Y plugin by itself:

```
yarn add -D eslint-plugin-jsx-a11y
```

You can read more about how to configure your `.eslintrc` for A11Y alone [here](https://www.npmjs.com/package/eslint-plugin-jsx-a11y).

### Use HTML5 Semantic Tags.

A lot of people who are much smarter than I am have been working on web accessibility for a long time. As developers, we should stand on the shoulders of giants. To that end, we ought not make our lives harder by trying to re-invent the wheel in our apps. Use the html elements that have been gifted to us. Here are a few rules to keep in mind:

- Headers (`h1`, `h2`, `h3`, etc.) should be used in descending order of importance and should never skip levels. Don't simply rely on font size to convey importance, because screen readers can't see that. The tags matter. My site name is an `h1`. Each page heading is an `h2`. Sections begin with an `h3`. You get the picture.
- Use the right element for the job. If you need a button, use a `<button>`. Don't use a clickable `<div>`. This seems obvious, but you'd be amazed how often I see this done. More on this later.
- All interactive elements on your page (buttons, links, menus, etc.) must be accessible using the keyboard only, i.e. without a mouse or trackpad. This goes hand in hand with the previous rule. If you use the wrong tags, you will have mountains of work to do, in order to make your app keyboard accessible. With the right tags, this takes care of itself. 

If you remember these three things, you'll be amazed how accessible your app suddenly becomes.

## Can We Code Now?

Yes! Let's get started. Download the starter code:

```
git clone https://github.com/brian-ogilvie/accessibility-article.git && cd accessibility-article && yarn install
```

Once that's done, let's check out the starter branch and fire up the dev server:

```
git checkout starter
yarn start
```