import React from 'react';
import styles from '../styles/home.module.scss';

const Hero: React.FC = () => (
  <section className={styles.hero}>
    <h1>Welcome to BitCell</h1>
    <p>Discover the best apps and utilities to enhance your experience.</p>
  </section>
);

export default Hero;