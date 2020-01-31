import React from 'react';
import InfoButton from './InfoButton';

export default function App() {
  return (
    <>
      <main>
        <h1>Accessibility using React Hooks</h1>
        <p>
          Today we&rsquo;re going to learn some basics of accessibility, or
          #A11Y.
          <InfoButton onClick={() => console.log('Info Button clicked.')} />
          How could we utilize React hooks (and some common sense) to help our
          apps comply with best practices?
        </p>
      </main>
    </>
  );
}
