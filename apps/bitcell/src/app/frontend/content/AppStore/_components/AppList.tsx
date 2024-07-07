import React, { FC, useContext, useEffect } from 'react';
import { AppStoreContext } from '../context/AppStoreContext';
import AppCard from './AppCard';
import { fetchApps } from '../context/AppStoreActions';
import styles from './appstore.module.scss';

const AppList: FC = () => {
  const { state, dispatch } = useContext(AppStoreContext);

  useEffect(() => {
    fetchApps(dispatch);
  }, [dispatch]);

  return (
    <div className={styles['app-list']}>
      {state.apps.map(app => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
};

export default AppList;