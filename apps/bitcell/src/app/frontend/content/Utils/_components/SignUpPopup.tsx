import React, { useState } from 'react';
import styles from '../styles/utils.module.scss';

interface SignUpPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSignUp: (email: string) => void;
}

const SignUpPopup: React.FC<SignUpPopupProps> = ({ isVisible, onClose, onSignUp }) => {
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    onSignUp(email);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpPopup;