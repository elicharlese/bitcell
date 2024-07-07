import React from 'react';
import styles from '../styles/appstorelayout.module.scss';

interface AppStoreLayoutProps {
  children: React.ReactNode;
}

const AppStoreLayout: React.FC<AppStoreLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>App Store</h1>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppStoreLayout;