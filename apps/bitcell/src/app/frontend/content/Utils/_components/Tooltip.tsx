import React from 'react';
import styles from '../styles/utils.module.scss';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className={styles.tooltipContainer}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;