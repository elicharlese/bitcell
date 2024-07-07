import React from 'react';
import styles from '../styles/home.module.scss';

const Notifications: React.FC = () => {
  // Placeholder for notifications logic
  return (
    <section className={styles.notifications}>
      <h2>Notifications</h2>
      <div className={styles.notificationsWrapper}>
        {/* Notifications UI logic goes here */}
        <p>No new notifications.</p>
      </div>
    </section>
  );
};

export default Notifications;