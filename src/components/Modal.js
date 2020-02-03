import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useModal from '../hooks/useModal';

export default function Modal({ onDismiss, children }) {
  const closeButton = useRef();
  useModal(closeButton, onDismiss);

  return (
    <div className="Modal__scrim">
      <div className="Modal__content">
        <button
          ref={closeButton}
          type="button"
          alt="Close Modal"
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
