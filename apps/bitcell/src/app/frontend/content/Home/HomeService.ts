import { App, Announcement, KPI, Activity, Notification } from '../types/HomeTypes';

export const fetchFeaturedApps = async (): Promise<App[]> => {
  // Replace with actual API call
  return [
    { id: '1', name: 'Featured App 1', description: 'This is featured app 1.' },
    { id: '2', name: 'Featured App 2', description: 'This is featured app 2.' },
  ];
};

export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  // Replace with actual API call
  return [
    { id: '1', message: 'Announcement 1' },
    { id: '2', message: 'Announcement 2' },
  ];
};

export const fetchKpis = async (): Promise<KPI[]> => {
  // Replace with actual API call
  return [
    { id: '1', title: 'KPI 1', progress: 75 },
    { id: '2', title: 'KPI 2', progress: 50 },
    { id: '3', title: 'KPI 3', progress: 90 },
  ];
};

export const fetchActivities = async (): Promise<Activity[]> => {
  // Replace with actual API call
  return [
    { id: '1', description: 'Activity 1' },
    { id: '2', description: 'Activity 2' },
  ];
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  // Replace with actual API call
  return [
    { id: '1', message: 'Notification 1' },
    { id: '2', message: 'Notification 2' },
  ];
};