import React, { createContext, useReducer, useEffect } from 'react';
import { HomeReducer } from './HomeReducer';
import { HomeState, HomeAction } from '../types/HomeTypes';
import { fetchInitialData } from './HomeActions';

const initialState: HomeState = {
  featuredApps: [],
  announcements: [],
  kpis: [],
  activities: [],
  notifications: [],
};

export const HomeContext = createContext<{
  state: HomeState;
  dispatch: React.Dispatch<HomeAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const HomeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;