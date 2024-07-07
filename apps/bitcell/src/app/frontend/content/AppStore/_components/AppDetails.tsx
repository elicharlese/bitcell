import React, { FC } from 'react';
import { App } from '../types/AppTypes';
import styles from './appstore.module.scss';

interface AppDetailsProps {
  app: App;
}

const AppDetails: FC<AppDetailsProps> = ({ app }) => (
  <div className={styles['app-details']}>
    <h2>{app.name}</h2>
    <p>{app.description}</p>
    <p>Version: {app.version}</p>
    <p>Developer: {app.developer}</p>
    <p>Rating: {app.rating}</p>
  </div>
);

export default AppDetails;