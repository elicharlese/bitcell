import React, { FC } from 'react';
import { App } from '../types/AppTypes';
import { Link } from 'react-router-dom';
import styles from './appstore.module.scss';

interface AppCardProps {
  app: App;
}

const AppCard: FC<AppCardProps> = ({ app }) => (
  <div className={styles['app-card']}>
    <h3>{app.name}</h3>
    <p>{app.description}</p>
    <Link to={`/app/${app.id}`}>View Details</Link>
  </div>
);

export default AppCard;