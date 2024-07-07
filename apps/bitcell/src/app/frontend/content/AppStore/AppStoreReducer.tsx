import { AppStoreState, AppStoreAction } from '../types/AppTypes';

export const AppStoreReducer = (state: AppStoreState, action: AppStoreAction): AppStoreState => {
  switch (action.type) {
    case 'SET_APPS':
      return {
        ...state,
        apps: action.payload,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};