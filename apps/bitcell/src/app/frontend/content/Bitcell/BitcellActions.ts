import { Dispatch } from 'react';
import { BitcellAction, NucleusData, MitochondriaData, VacuoleData, LipidStoreData } from '../types/BitcellTypes';
import { fetchNucleusData, fetchMitochondriaData, fetchVacuoleData, fetchLipidStoreData } from './BitcellService';
import { encryptData, decryptData } from '../utils/cryptoUtils';

const SECRET_KEY = 'your_secret_key';

export const setNucleusData = (dispatch: Dispatch<BitcellAction>, data: NucleusData) => {
  const encryptedData = encryptData(JSON.stringify(data), SECRET_KEY);
  dispatch({
    type: 'SET_NUCLEUS_DATA',
    payload: JSON.parse(decryptData(encryptedData, SECRET_KEY)),
  });
};

export const setMitochondriaData = (dispatch: Dispatch<BitcellAction>, data: MitochondriaData) => {
  const encryptedData = encryptData(JSON.stringify(data), SECRET_KEY);
  dispatch({
    type: 'SET_MITOCHONDRIA_DATA',
    payload: JSON.parse(decryptData(encryptedData, SECRET_KEY)),
  });
};

export const setVacuoleData = (dispatch: Dispatch<BitcellAction>, data: VacuoleData) => {
  const encryptedData = encryptData(JSON.stringify(data), SECRET_KEY);
  dispatch({
    type: 'SET_VACUOLE_DATA',
    payload: JSON.parse(decryptData(encryptedData, SECRET_KEY)),
  });
};

export const setLipidStoreData = (dispatch: Dispatch<BitcellAction>, data: LipidStoreData) => {
  const encryptedData = encryptData(JSON.stringify(data), SECRET_KEY);
  dispatch({
    type: 'SET_LIPID_STORE_DATA',
    payload: JSON.parse(decryptData(encryptedData, SECRET_KEY)),
  });
};

export const fetchInitialData = async (dispatch: Dispatch<BitcellAction>) => {
  const nucleusData = await fetchNucleusData();
  setNucleusData(dispatch, nucleusData);
  const mitochondriaData = await fetchMitochondriaData();
  setMitochondriaData(dispatch, mitochondriaData);
  const vacuoleData = await fetchVacuoleData();
  setVacuoleData(dispatch, vacuoleData);
  const lipidStoreData = await fetchLipidStoreData();
  setLipidStoreData(dispatch, lipidStoreData);
};