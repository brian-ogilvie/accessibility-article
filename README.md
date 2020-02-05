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

The first thing I do with every single project is set up ESLint. Do yourself a favor, and don't skip this step. I don't need to memorize every single rule or guideline about accessibility, because my linter will let me know of problems in my code that I never anticipated. If you're using VSCode, install the ESLint extension, so that problems in your code will be underlined in red as you type. Hovering over the problems will give you a brief explanation of the issue and how to fix it. 

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

A lot of people who are much smarter than I am have been working on web accessibility for a long time. As developers, we should stand on the shoulders of giants. To that end, we ought not make our lives harder by trying to reinvent the wheel in our apps. Use the html elements that have been gifted to us. Here are a few rules to keep in mind:

- Headers (`h1`, `h2`, `h3`, etc.) should be used in descending order of importance and should never skip levels. Don't simply rely on font size to convey importance, because screen readers can't see that. The tags matter. My site name is an `h1`. Each page heading is an `h2`. Sections begin with an `h3`. You get the picture.
- Images contain `alt` tags. All images. Images that are purely decorative--unimportant for the understanding of the page content--should have an empty `alt` tag: `alt=""`. Also, don't include words like "image" or "picture" in the alt tag, as this is redundant. Think more about what the image is meant to convey, e.g. "Me consuming an entire large pizza."
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
git checkout --track origin/starter
yarn start
```

You can view the app in your browser at `localhost:1234`.

Here's the design we've been given: Our main page includes the term "A11Y", which many users might not recognize or understand. To help out those users, we've provided an info (<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1580478144/Random%20GitHub/info-circle-solid.svg" alt="info " width="14" />) icon next to the term. Clicking on the icon should present a modal containing further information. We haven't built the modal yet, but we have added the click handler on the info button. 

With your JavaScript console open in your browser, go ahead and confirm that it's working by clicking on the info icon. You should see "Info Button clicked" printed to the console. It's working? Great! Now, do me a favor and trigger that same event without using your mouse or trackpad. I'll wait...

By now, you've realized that this is impossible. The info button can't be selected by pressing anything on the keyboard. And even if you could get it focussed, nothing you press on the keyboard would actually trigger the click event. This is a major problem for the accessibility of our page. So how do we solve it? Let's open up `components/InfoButton.js` and take a look.

### One Possible Solution

This button needs to be tabbable, so we could add `tabIndex="0"` to the containing `span` tag. That takes care of getting it focussed, but we still can't actually click it. To solve that problem, we could add a `keypress` handler and a `role` to the `span` as well. Then we could check whether the key that got pressed was either `Enter` or the spacebar and, if so, call the click handler. That code would look something like this:

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
      role="button"
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

One more thing we could do here--because the button doesn't actually contain any text--is to add an `aria-label` so that screen readers can tell users what this button will do:

```
<button aria-label="More Info" type="button" className="InfoButton" onClick={onClick}>
```

## A More Complex Problem

So now that we've solved something simple, let's move ahead and build out our info modal. Instead of building it first and then circling back to make sure it's accessible, we're going to take the far easier path and consider accessibility before we write a single line of code. 

First off, let's get really clear on what a modal is and how it should behave. I've pulled the following highlights from [Material.io](https://material.io)

Description:

- A modal appears in front of app content.
- A modal disables all app functionality while visible.
- A modal remains on screen until confirmed, dismissed, or a required action has been taken.
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

The actual DOM structure of our component is dead simple. We'll have a scrim div that is fixed position, covering the whole window. Inside that, we'll have a container that provides the shape of the modal itself. The container will have a Close button and a spot for rendering children. That's all our Modal component will really have. Its only props are an `onDismiss` function--which it will pass to the Close button's `onClick` method--and the aforementioned `children` or content. By the way, if you're not familiar with the concept of children props in React, `children` is a reserved prop in React that represents anything between a component's opening and closing tags. For instance: 


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

Save that, and let's return to our browser to check whether it's working. Click the info button: the modal appears. Click the close button: the modal goes away. Awesome! We have fulfilled our two of our requirements from above: the modal appears above app content, and it can be dismissed by clicking the close button. Let's move on.

## Step 2: Transfer Focus

From here on out, let's agree to something: We will only interact with our app, using the keyboard. No mouse. No trackpad. With that in mind. Let's render and dismiss our modal again. For good measure, refresh the page first (`COMMAND + R`) so that all our keyboard focus is set back to the top of the DOM. You should find that getting the modal onto the screen is easy: press TAB to highlight the info button and then press Enter or space. Awesome! Now, tab to the close button. 

Oops.

See the problem? Our keyboard focus isn't where it belongs. It's stuck in the underlying app content. As you press TAB, you don't get the close button. You have to first tab through all of the links in the footer. Imagine if our page was super complicated, with a bunch of links, menus, and buttons. That would take forever. If you were a user who relied on your keyboard without a mouse, you'd be pretty annoyed right now. Worse, if you relied on a screen reader (i.e. you couldn't actually see the page), you would have no way of knowing that this modal even existed right now. Your screen reader would go right on traversing the DOM as though nothing had changed. 

To fix this issue, it's time to write our first custom hook. First, if it doesn't already exist, create a `hooks` directory inside of `src`:

```
mkdir src/hooks
```

Inside our hooks directory, let's create a new file called `useFocusTransfer.js`. To build this hook, we're going to take advantage of React's `useEffect` hook. `useEffect` allows us to perform a side effect in our app when certain conditions are met or when certain dependencies change. 

This hook will take as its only argument, a `ref` for the button we would like to move focus onto (more on this later). It will return nothing, simply performing our desired side effects. Here it is:

```
// hooks/useFocusTransfer.js

import { useEffect } from 'react';

export default function useFocusTransfer(transferToRef) {
  useEffect(() => {
    if (transferToRef.current) {
      transferToRef.current.focus();
    }
  }, [transferToRef.current]);
}
```

If you've never interacted with refs in React before, here are the basics. A `ref` gives us access to the actual html element that is painted to the DOM as a result of our React rendering code. The ref itself contains a `current` property that represents the DOM element. We use refs very sparingly because we usually want to let React handle all DOM querying and manipulation behind the scenes while we declaratively describe how the DOM should look, using JSX. However sometimes--now, for instance--we really do need a pointer to this button in the DOM becuase the `focus` method we want to call only exists on DOM nodes. It's important to note that the `current` property of our ref will be null until the DOM has been painted for the first time. That's why we need to check whether `transferToRef.current` exists before attempting to call the `.focus()` method. We add `transferToRef.current` to our `useEffect` dependency array, so that this hook will run as soon as that value changes. 

Now let's implement our new custom hook and put it to use in our Modal component. Back in `Modal.js`, we'll need our hook and also `useRef`. Edit the first line to be:

```
import React, { useRef } from 'react';
```

And add this as the third import:

```
import useFocusTransfer from '../hooks/useFocusTransfer';
```

Now to use these, we'll first need to define the ref and pass it as an argument to our custom hook. Add the following to our component definition:

```
export default function Modal({ onDismiss, children }) {
  const closeButton = useRef();
  useFocusTransfer(closeButton);
```

And we'll need to tell React which DOM element we'd like to attach that ref to. Inside our return statement, add the ref as an attribute of the button:

```
<button
  ref={closeButton}
```

Now that we have it all set up, let's make sure it works. Back in the browser (remember keyboard only, no mouse) click the info button. The close button should be focussed inside the modal. Hitting return again should dismiss the modal. Works? Sweeeeeeet. 

We're not quite done with transferring focus though. We also need to return the browser's focus to where it was before the Modal showed up. This is pretty easy to accomplish with another `useEffect`. One of the coolest features of `useEffect` is its built-in clean up. If we return a function from our effect hook, that function will run as "cleanup" before the next running of the effect or when our component leaves the DOM. In a way, `useEffect` is similar to a combination of the old `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` methods from class-based components all rolled into one awesome function.

Back in `useFocusTransfer.js` let's add this before our other `useEffect`:

```
useEffect(() => {
  const active = document.activeElement;
  return () => {
    if (active) active.focus();
  };
}, []);
```

`activeElement` represents the currently focussed element in the DOM (which might not exist under all circumstances). Notice the empty dependency array. We want this effect to run once and only once, when our component mounts. And we want the clean up function to run only once, when our component unmounts. Also, be sure that this effect comes before our other one. We need to get the reference to the active element before we shift focus to the close button. 

Now if you run this in your browser, you should see the focus automatically shift to the close button when the modal appears and shift back to the info button when the modal leaves. Now we've prevented screen readers and users alike from getting disoriented or lost by our modal component. 

## Step 3: Dismiss on Escape

This step is incredibly simple, requiring only a few lines of code. But because it's so common in an app (the need to dismiss a popup, menu, dropdown, alert, etc. when the escape button is pushed), I always write a custom hook for it and just use that everywhere to save myself some typing. Hooks are awesome, by the way.

Let's create a new file `hooks/useEscapeHandler.js`, and write our hook:

```
import { useEffect, useCallback } from 'react';

export default function useEscapeHandler(onEscape) {
  const handleEscape = useCallback(
    ({ key }) => {
      if (key === 'Escape') onEscape();
    },
    [onEscape]
  );
  
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);
}
```

When the component using this hook mounts, we attach a `keydown` event listener to the browser window. When a key is pressed, if that key is `Escape`, we execute whatever onEscape function was passed into our hook. In our case, that function will be dismissing the modal. When our component unmounts, `useEffect` removes our event listener from the window as cleanup.

What is `useCallback`, and why are we using it? This is a performance booster that React offers. It allows us essentially to memoize the definition of a function so that it doesn't get redefined as a new object every time this hook is called. That may seem like a small boost, but in this case it really matters. Our `useEffect` hook will have to run again, removing our window event listener and adding a new one, every time `handleEscape` is redefined. Because interacting with the DOM is the slowest part of most web applications, we really don't want to do this any more than is absolutely necessary. Imagine this hook being used inside a component that also has a form inside it. That component's state will constantly be updating as the user types into the form, which will call our hook again and again. On every single keystroke, the window will have event listeners added and removed. This will absolutely murder the performance of your app. Don't be the guy who tanks the app because of an escape key. Use `useCallback`. PSA over. 

Let's add our new escape handler to our modal. In `Modal.js`, add this as your fourth import:

```
import useEscapeHandler from '../hooks/useEscapeHandler';
```

And call it on the first line of our component definition:

```
export default function Modal({ onDismiss, children }) {
  useEscapeHandler(onDismiss);
```

Check it out in the browser. Working? Nice! 

## Step 4: Dismiss on Clicking the Scrim

One could make the argument that this is not strictly an accessibility issue, but it does make for a much nicer experience for all users, especially users on a mobile device who don't want to reach their thumbs all the way up to the Close button. And that's really what accessibility is all about: making a better experience for all users. 

Though nominally, we want to dismiss the modal when the user clicks or taps the scrim, we actually just care if they tap anywhere outside of our modal. So how do we detect a click that is NOT inside of a certain element. To figure that out, let's quickly discuss how browser events are processed. When you click on a part of a web page, that click is recognized first by the most deeply nested element--say a paragraph or even a span tag--in the spot where you clicked. Then the event is processed by that element's parent element and then the parent element's parent element. The event continues bubbling upwards until it reaches the root of the document. This gives every single element inside which this click happened a chance to run any event handlers it may have. 

The DOM exposes a really cool property that we can hook into from this event bubbling process: `event.target.closest()`. As an event propagates from its most deeply nested element all the way out to the root of the document, `.closest()` will return the first instance that the event bubbles through of whatever selector you request. If the event doesn't bubble through anything matching that selector, `.closest()` will return `null`. We're going to look for a `null` return to determine that a click has occurred outside of our Modal element. Sort of hard to explain in concept, so let's see it in action. 

As with our last step, this is something I use so commonly in apps that I always make a custom, reusable hook that tons of components can take advantage of. Let's create a new file in our `hooks` directory called `useOutsideClick.js`:

```
// hooks/useOutsideClick.js
import { useEffect, useCallback } from 'react';

export default function useOutsideClick(selector, onOutsideClick) {
  const handleOutsideClick = useCallback(
    ({ target }) => {
      if (target.closest(selector) === null) {
        onOutsideClick();
      }
    },
    [selector, onOutsideClick]
  );
  
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);
}
```

This is very similar in structure to our `useEscapeHandler` hook. The difference is in the body of our event handler function. We check whether `.closest()` returns `null` for our given selector. If so, the click has not occured inside that selector, so we execute the `onOutsideClick` function that we are given. 

What is this `selector` we keep talking about? In our case, it will be the CSS class name of the div containing our modal content: `.Modal__content`. And we will pass in the function to dismiss the modal as the argument for `onOutsideClick`. Let's see how we use this in our Modal component. 

Add this as your last import in `Modal.js`:

```
import useOutsideClick from '../hooks/useOutsideClick';
```

And implement it just under where we call our other two hooks:

```
useOutsideClick('.Modal__content', onDismiss);
```

Spin her up and check it out. Well, congratulations, and nice work! You've now built a robust, accessible modal component that provides a very friendly experience for all users in the varying ways that people consume the web. If you're interested in a bonus, please read our final section.

## Step 5: Code Cleanup

If you've read any of my other articles, you know that I'm a big fan of keeping React components concerned with presentation only. I don't want them performing a bunch of logic; I just want them to do their small part of displaying the current state of the app. This has never been more possible than it is now with React hooks. We've done a pretty good job so far in abstracting out our logic from the component. But I can't help thinking: What if I want to design a different modal for some other part of my app? I don't know. One with a pink border and a dancing unicorn animation over the scrim. When I build out that component, I will have to remember to import three separate hooks and use them correctly. What if I'm not the developer doing this? Some other developer will have to research the rules of how a modal is supposed to behave and then spend a bunch of time in THIS component understanding how it was built, and what the hooks do. You get the idea. 

Wouldn't it be great if there was just one hook that encapsulated everything a modal component is supposed to do and if we could just use that one hook for any modal component we ever decide to build? I think so. Let's make one really quickly. Create a new file `hooks/useModal.js`. This hook is simply going to be a composition of the three hooks we already wrote:

```
// hooks/useModal.js
import useEscapeHandler from './useEscapeHandler';
import useOutsideClick from './useOutsideClick';
import useFocusTransfer from './useFocusTransfer';

export default function useModal(firstElementRef, contentSelector, onDismiss) {
  useEscapeHandler(onDismiss);
  useOutsideClick(contentSelector, onDismiss);
  useFocusTransfer(firstElementRef);
}
```

Now we can remove all those lines from our Modal component and replace them with the single hook. Here's our final code in `Modal.js`:

```
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useModal from '../hooks/useModal';

export default function Modal({ onDismiss, children }) {
  const closeButton = useRef();
  useModal(closeButton, '.Modal__content', onDismiss);

  return (
    <div className="Modal__scrim">
      <div className="Modal__content">
        <button
          ref={closeButton}
          type="button"
          aria-label="Close Modal"
          title="Close Modal"
          className="close-button"
          onClick={onDismiss}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
```

This may seem like an insignificant change, but it will make the lives of your team members much easier as your app grows and as new team members come on board. 

Thanks for reading today! As a final thought, please remember this: Considering accessibility as you build your app ultimately makes the experience better for ALL your users. Now, go forth, and make the web awesome!

## Notes:

I was inspired to write this article after attending a talk by Magdalena Henke, who works for CBRE Build. She and her company are awesome, and her talk was excellent. You can find her on LinkedIn at [linkedin.com/in/magdalena-henke/](https://www.linkedin.com/in/magdalena-henke/).