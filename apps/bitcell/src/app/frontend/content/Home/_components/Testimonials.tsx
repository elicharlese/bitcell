import React from 'react';
import styles from '../styles/home.module.scss';

const Testimonials: React.FC = () => (
  <section className={styles.testimonials}>
    <h2>What Our Users Say</h2>
    <div className={styles.testimonialList}>
      <div className={styles.testimonial}>
        <p>"BitCell has transformed my workflow!"</p>
        <p>- Happy User</p>
      </div>
      <div className={styles.testimonial}>
        <p>"A must-have for any professional."</p>
        <p>- Satisfied User</p>
      </div>
    </div>
  </section>
);

export default Testimonials;