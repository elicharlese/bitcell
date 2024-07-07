import { Dispatch } from 'react';
import { AppStoreAction, App } from '../types/AppTypes';
import { fetchAppsFromAPI } from './AppStoreService';

export const setApps = (dispatch: Dispatch<AppStoreAction>, apps: App[]) => {
  dispatch({
    type: 'SET_APPS',
    payload: apps,
  });
};

export const setSearchQuery = (dispatch: Dispatch<AppStoreAction>, query: string) => {
  dispatch({
    type: 'SET_SEARCH_QUERY',
    payload: query,
  });
};

export const fetchApps = async (dispatch: Dispatch<AppStoreAction>) => {
  const apps = await fetchAppsFromAPI();
  setApps(dispatch, apps);
};