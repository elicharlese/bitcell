export interface App {
  id: string;
  name: string;
  description: string;
  version: string;
  developer: string;
  rating: number;
}

export interface AppStoreState {
  apps: App[];
  searchQuery: string;
}

export type AppStoreAction =
  | { type: 'SET_APPS'; payload: App[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string };