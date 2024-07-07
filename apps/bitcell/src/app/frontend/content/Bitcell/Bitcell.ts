import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import LipidStore from './LipidStore';
import Mitochondria from './Mitochondria';
import Nucleus from './Nucleus';
import Vacuole from './Vacuole';
import BitcellNavigation from '../components/BitcellNavigation';
import BitcellLayout from '../../../layouts/BitcellLayout';
import BitcellProvider from '../context/BitcellContext';

const Bitcell: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <BitcellProvider>
      <BitcellLayout>
        <BitcellNavigation />
        <Switch>
          <Route exact path={`${path}/nucleus`} component={Nucleus} />
          <Route exact path={`${path}/mitochondria`} component={Mitochondria} />
          <Route exact path={`${path}/vacuole`} component={Vacuole} />
          <Route exact path={`${path}/lipid-store`} component={LipidStore} />
        </Switch>
      </BitcellLayout>
    </BitcellProvider>
  );
};

export default Bitcell;