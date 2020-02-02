import React, { useState } from 'react';
import InfoButton from './InfoButton';
import Modal from './Modal';
import A11YContent from './A11YContent';
import Resources from './Resources';

export default function App() {
  const [modalVisble, setModalVisible] = useState(false);

  return (
    <>
      <main>
        <h1>Accessibility using React Hooks</h1>
        <p>
          Today we&rsquo;re going to learn some basics of accessibility, or
          #A11Y.
          <InfoButton onClick={() => setModalVisible(true)} />
          How could we utilize React hooks (and some common sense) to help our
          apps comply with best practices?
        </p>
      </main>
      <Resources />
      {modalVisble && (
        <Modal onDismiss={() => setModalVisible(false)}>
          <A11YContent />
        </Modal>
      )}
    </>
  );
}
