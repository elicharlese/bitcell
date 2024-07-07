import React, { createContext, useReducer, useEffect } from 'react';
import { BitcellReducer } from './BitcellReducer';
import { BitcellState, BitcellAction } from '../types/BitcellTypes';
import { fetchInitialData } from './BitcellActions';

const initialState: BitcellState = {
  nucleusData: null,
  mitochondriaData: null,
  vacuoleData: null,
  lipidStoreData: null,
};

export const BitcellContext = createContext<{
  state: BitcellState;
  dispatch: React.Dispatch<BitcellAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const BitcellProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(BitcellReducer, initialState);

  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <BitcellContext.Provider value={{ state, dispatch }}>
      {children}
    </BitcellContext.Provider>
  );
};

export default BitcellProvider;