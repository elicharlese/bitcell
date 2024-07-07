import { App } from '../types/AppTypes';

export const fetchAppsFromAPI = async (): Promise<App[]> => {
  // Replace with actual API call
  return [
    { id: '1', name: 'App One', description: 'This is app one', version: '1.0', developer: 'Dev One', rating: 4.5 },
    { id: '2', name: 'App Two', description: 'This is app two', version: '1.1', developer: 'Dev Two', rating: 4.0 },
  ];
};

export const fetchAppById = async (id: string): Promise<App | null> => {
  const apps = await fetchAppsFromAPI();
  return apps.find(app => app.id === id) || null;
};