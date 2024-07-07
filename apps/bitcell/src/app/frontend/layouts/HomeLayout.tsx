import React from 'react';
import styles from '../styles/homelayout.module.scss';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Home</h1>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeLayout;