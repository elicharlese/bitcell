import { HomeState, HomeAction } from '../types/HomeTypes';

export const HomeReducer = (state: HomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case 'SET_FEATURED_APPS':
      return {
        ...state,
        featuredApps: action.payload,
      };
    case 'SET_ANNOUNCEMENTS':
      return {
        ...state,
        announcements: action.payload,
      };
    case 'SET_KPIS':
      return {
        ...state,
        kpis: action.payload,
      };
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};