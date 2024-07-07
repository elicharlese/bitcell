import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import LipidStore from '../content/Bitcell/sections/LipidStore';
import Mitochondria from '../content/Bitcell/sections/Mitochondria';
import Nucleus from '../content/Bitcell/sections/Nucleus';
import Vacuole from '../content/Bitcell/sections/Vacuole';
import BitcellNavigation from '../content/Bitcell/components/BitcellNavigation';
import BitcellLayout from '../layouts/BitcellLayout';
import BitcellProvider from '../content/Bitcell/context/BitcellContext';

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