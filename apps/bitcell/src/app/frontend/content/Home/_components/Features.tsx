import React from 'react';
import styles from '../styles/home.module.scss';

const Features: React.FC = () => (
  <section className={styles.features}>
    <h2>Features</h2>
    <div className={styles.featureList}>
      <div className={styles.feature}>
        <h3>Feature 1</h3>
        <p>Details about Feature 1.</p>
      </div>
      <div className={styles.feature}>
        <h3>Feature 2</h3>
        <p>Details about Feature 2.</p>
      </div>
      <div className={styles.feature}>
        <h3>Feature 3</h3>
        <p>Details about Feature 3.</p>
      </div>
    </div>
  </section>
);

export default Features;