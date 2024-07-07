import React, { createContext, useReducer } from 'react';
import { AppStoreReducer } from './AppStoreReducer';
import { AppStoreState, AppStoreAction } from '../types/AppTypes';

const initialState: AppStoreState = {
  apps: [],
  searchQuery: '',
};

export const AppStoreContext = createContext<{
  state: AppStoreState;
  dispatch: React.Dispatch<AppStoreAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppStoreReducer, initialState);

  return (
    <AppStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStoreContext.Provider>
  );
};

export default AppStoreProvider;