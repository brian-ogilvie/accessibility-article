import React from 'react';

export default function Footer() {
  return (
    <div className="Footer">
      <h2 className="Footer__heading">Resources:</h2>
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
