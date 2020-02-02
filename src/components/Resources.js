import React from 'react';

export default function Resources() {
  return (
    <div className="Resources">
      <h2>Resources:</h2>
      <ul className="random-links">
        <li>
          <a tabIndex="0" href="https://a11yproject.com/">
            The A11Y Project
          </a>
        </li>
        <li>
          <a tabIndex="0" href="https://material.io/">
            Material Design
          </a>
        </li>
        <li>
          <a
            tabIndex="0"
            href="https://www.w3.org/WAI/planning/statements/generator/#create"
          >
            Create an Accessibility Statement
          </a>
        </li>
      </ul>
    </div>
  );
}
