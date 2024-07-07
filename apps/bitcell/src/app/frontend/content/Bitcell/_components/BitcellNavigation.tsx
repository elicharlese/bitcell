import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/bitcell.module.scss';

const BitcellNavigation: React.FC = () => (
  <nav className={styles.nav}>
    <ul>
      <li><NavLink to="/bitcell/nucleus" activeClassName={styles.active}>Nucleus</NavLink></li>
      <li><NavLink to="/bitcell/mitochondria" activeClassName={styles.active}>Mitochondria</NavLink></li>
      <li><NavLink to="/bitcell/vacuole" activeClassName={styles.active}>Vacuole</NavLink></li>
      <li><NavLink to="/bitcell/lipid-store" activeClassName={styles.active}>Lipid Store</NavLink></li>
    </ul>
  </nav>
);

export default BitcellNavigation;