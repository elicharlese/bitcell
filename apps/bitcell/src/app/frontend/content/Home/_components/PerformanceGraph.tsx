import React from 'react';
import styles from '../styles/home.module.scss';

const PerformanceGraph: React.FC = () => {
  // Placeholder for the performance graph logic
  return (
    <section className={styles.performanceGraph}>
      <h2>Performance Graph</h2>
      <div className={styles.graphWrapper}>
        {/* Performance graph UI logic goes here */}
        <p>Graph showing trading performance over time.</p>
      </div>
    </section>
  );
};

export default PerformanceGraph;