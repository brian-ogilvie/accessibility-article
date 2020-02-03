import React, { useState } from 'react';
import Footer from './Footer';
import InfoButton from './InfoButton';
import Modal from './Modal';
import A11YContent from './A11YContent';

export default function App() {
  const [modalVisble, setModalVisible] = useState(false);

  return (
    <div className="App">
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
      <Footer />
      {modalVisble && (
        <Modal onDismiss={() => setModalVisible(false)}>
          <A11YContent />
        </Modal>
      )}
    </div>
  );
}
