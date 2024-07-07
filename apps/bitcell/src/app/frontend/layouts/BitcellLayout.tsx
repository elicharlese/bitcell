import React from 'react';
import styles from '../styles/bitcelllayout.module.scss';

interface BitcellLayoutProps {
  children: React.ReactNode;
}

const BitcellLayout: React.FC<BitcellLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Bitcell</h1>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BitcellLayout;