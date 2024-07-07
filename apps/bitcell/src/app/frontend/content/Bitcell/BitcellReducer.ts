import { BitcellState, BitcellAction } from '../types/BitcellTypes';

export const BitcellReducer = (state: BitcellState, action: BitcellAction): BitcellState => {
  switch (action.type) {
    case 'SET_NUCLEUS_DATA':
      return {
        ...state,
        nucleusData: action.payload,
      };
    case 'SET_MITOCHONDRIA_DATA':
      return {
        ...state,
        mitochondriaData: action.payload,
      };
    case 'SET_VACUOLE_DATA':
      return {
        ...state,
        vacuoleData: action.payload,
      };
    case 'SET_LIPID_STORE_DATA':
      return {
        ...state,
        lipidStoreData: action.payload,
      };
    default:
      return state;
  }
};