import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppDetails from '../components/AppDetails';
import { App } from '../types/AppTypes';
import { fetchAppById } from '../context/AppStoreService';
import MainLayout from '../../layouts/MainLayout';

const AppDetailsPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const [app, setApp] = useState<App | null>(null);

  useEffect(() => {
    fetchAppById(appId).then(setApp);
  }, [appId]);

  if (!app) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <AppDetails app={app} />
    </MainLayout>
  );
};

export default AppDetailsPage;