import React from 'react';
import styles from '../styles/bitcell.module.scss';

interface SectionProps {
  title: string;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, content }) => (
  <section className={styles.section}>
    <h2>{title}</h2>
    <div>{content}</div>
  </section>
);

export default Section;