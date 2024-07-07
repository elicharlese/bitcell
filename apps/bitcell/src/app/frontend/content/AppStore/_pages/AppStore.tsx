import React from 'react';
import AppList from '../components/AppList';
import AppSearch from '../components/AppSearch';
import MainLayout from '../../layouts/MainLayout';

const AppStore: React.FC = () => (
  <MainLayout>
    <div className="app-store">
      <AppSearch />
      <AppList />
    </div>
  </MainLayout>
);

export default AppStore;