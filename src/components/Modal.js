import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ onDismiss, children }) {
  return (
    <div className="Modal__scrim">
      <div className="Modal__content">
        <button
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

Modal.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Modal.defaultProps = {
  children: <div />,
};
