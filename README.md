# Accessibility in React

As developers, how can we use React hooks and a good dose of common sense to quickly improve the accessibility of our apps?

## Resources

[Sample code on GitHub](https://github.com/brian-ogilvie/accessibility-article)

[Deployed App](https://accessibility-hooks.netlify.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5275cbe-3532-4b2e-b47d-d2cf9d884d3c/deploy-status)](https://app.netlify.com/sites/accessibility-hooks/deploys)

## Background

We are going to be getting into some deeper usage of React hooks in this article, so a basic understanding of what they are and how to use them is recommended. Click the link to read more about [React hooks](https://reactjs.org/docs/hooks-intro.html).

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

You can view the app in your browser at `localhost:1234`.

Here's the design we've been given: Our main page includes the term "A11Y", which many users might not recognize or understand. To help out those users, we've provided an info (<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1580478144/Random%20GitHub/info-circle-solid.svg" alt="info " width="14" />) icon next to the term. Clicking on the icon should present a modal containing further information. We haven't built the modal yet, but we have added the click handler on the info button. 

With your JavaScript console open in your browser, go ahead and confirm that it's working by clicking on the info icon. You should see "Info Button clicked" printed to the console. It's working? Great! Now, do me a favor and trigger that same event without using your mouse or trackpad. I'll wait...

By now, you've realized that this is impossible. The info button can't be selected by pressing anything on the keyboard. And even if you could get it focussed, nothing you press on the keyboard would actually trigger the click event. This is a major problem for the accessibility of our page. So how do we solve it? Let's open up `components/InfoButton.js` and take a look.

### One Possible Solution

This button needs to be tabbable, so we could add `tabIndex="0"` to the containing `span` tag. That takes care of getting it focussed, but we still can't actually click it. To solve that problem, we could add a `keypress` handler to the `span` as well. Then we could check whether the key that got pressed was either `Enter` or the spacebar and, if so, call the click handler. That code would look something like this:

```
export default function InfoButton({ onClick }) {
  function handleKeyPress({ key }) {
    if (key === 'Enter' || key === ' ') {
      onClick();
    }
  }

  return (
    <span
      tabIndex="0"
      className="InfoButton"
      onKeyPress={handleKeyPress}
      onClick={onClick}
    >
    {*/ Etc... */}
```

This will work, but if you followed this solution, you could be forgiven for thinking that accessibility is a giant pain, requiring a lot of extra code. The reason you feel that way is that we picked the wrong tool for the job. We've broken the rule in my second bullet point above. This element is meant to behave like a button, so let's use a real button. 

### A Far Better Solution

Delete all that extra junk we just wrote. All we need to do here is to turn this `span` tag into a `button` tag with a type attribute. So here's our fully accessible InfoButton component with only one small change: 

```
export default function InfoButton({ onClick }) {
  return (
    <button type="button" className="InfoButton" onClick={onClick}>
      {/* SVG code */}
    </button>
  );
}
```

Go ahead and test it out in the browser. No mouse allowed! Works perfectly! Buttons, right out of the box, give us keyboard fucus and can be triggered by the `Enter` or `space` key. There is no reason that we, as developers, should waste our time reinventing this behavior. If you take nothing else away from this article, remember this: **If it seems hard to provide accessibility for your site interactions, there's a good chance you're doing it wrong.**

## A More Complex Problem

So now that we've solved something simple, let's move ahead and build out our info modal. Instead of building it first and then circling back to make sure it's accessible, we're going to take the far easier path and consider accessibility before we write a single line of code. 

First off, let's get really clear on what a modal is and how it should behave. I've pulled the following highlights from [Material.io](https://material.io)

Description:

- A modal appears in front of app content.
- A modal disables all app functionality while visible.
- A modal on screen until confirmed, dismissed, or a required action has been taken.
- Surfaces behind the modal are scrimmed, making content on the surface less prominent.

Modals can be dismissed by:

- Clicking on a "Cancel" or "Close" button.
- Clicking on the scrim.

According to [w3.org](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html), accessible modals should also:

- Provide Focus to the first interactive element within the body. This prevents screen readers from being stuck in the underlying content.
- On being dismissed, return focus to where it was before the modal was presented. 
- Be dismissed by pressing the `ESC` key.

Alright, with all of that in mind, let's build it. 

## Step 1: Structure our Modal Component

The actual DOM structure of our component is dead simple. We'll have a scrim div that is fixed position, covering the whole window. Inside that, we'll have a container that provides the shape of the modal itself. The container will have a Close button and a spot for rendering children. That's all our Modal component will really have. It's only props are and `onDismiss`, which it will pass to the Close button's `onClick` method and the aforementioned `children` or content. By the way, if you're not familiar with the concept of children props in React, `children` is a reserved prop in React that reperesents anything between a component's openning and closing tags. For instance: 


```
<MyComponent>
  <div>This div is accessible inside MyComponent as props.children</div>
</MyComponent>
```

Go ahead and open up `components/Modal.js` to see that this structure is exactly what we just described. Dead simple. So let's get this thing on the screen and start adding our functionality.

We're going to need a state property that dictates whether the modal is visible in our app, so let's add `useState` to our imports at the top of `App.js`:

```
import React, { useState } from 'react';
```

Then in the first line of our App component, let's set up our state property:

```
const [modalVisible, setModalVisible] = useState(false);
```

We'll need to replace the `onClick` method of our `InfoButton` with the following, to update that state property: 

```
<InfoButton onClick={() => setModalVisible(true)} />
```

With that set up, let's actually import our `Modal` component and our content and then render them to the DOM. To the bottom of our imports at the top of `App.js`, add the following:

```
import Modal from './components/Modal';
import A11YContent from './components/A11YContent`;
```

And let's show it only when our `modalVisible` state property is `true`. Just below where `<Footer />` is rendered, before the Fragment closing tag `</>`, add the following:

```
{modalVisible && (
  <Modal onDismiss={() => setModalVisible(false)}>
    <A11YContent />
  </Modal>
)}
```

Save that, and let's return to our browser to check whether it's working. Click the info button: the modal appears. Click the close button: the modal goes away. Awesome! We have fulfilled our two of our requirements from above: the modal appears above app content, and it can be dismissed by clicking the close button. 