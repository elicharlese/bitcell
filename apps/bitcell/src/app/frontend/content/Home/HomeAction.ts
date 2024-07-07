import { Dispatch } from 'react';
import { HomeAction, App, Announcement, KPI, Activity, Notification } from '../types/HomeTypes';
import { fetchFeaturedApps, fetchAnnouncements, fetchKpis, fetchActivities, fetchNotifications } from './HomeService';

export const setFeaturedApps = (dispatch: Dispatch<HomeAction>, apps: App[]) => {
  dispatch({
    type: 'SET_FEATURED_APPS',
    payload: apps,
  });
};

export const setAnnouncements = (dispatch: Dispatch<HomeAction>, announcements: Announcement[]) => {
  dispatch({
    type: 'SET_ANNOUNCEMENTS',
    payload: announcements,
  });
};

export const setKpis = (dispatch: Dispatch<HomeAction>, kpis: KPI[]) => {
  dispatch({
    type: 'SET_KPIS',
    payload: kpis,
  });
};

export const setActivities = (dispatch: Dispatch<HomeAction>, activities: Activity[]) => {
  dispatch({
    type: 'SET_ACTIVITIES',
    payload: activities,
  });
};

export const setNotifications = (dispatch: Dispatch<HomeAction>, notifications: Notification[]) => {
  dispatch({
    type: 'SET_NOTIFICATIONS',
    payload: notifications,
  });
};

export const fetchInitialData = async (dispatch: Dispatch<HomeAction>) => {
  const apps = await fetchFeaturedApps();
  setFeaturedApps(dispatch, apps);
  const announcements = await fetchAnnouncements();
  setAnnouncements(dispatch, announcements);
  const kpis = await fetchKpis();
  setKpis(dispatch, kpis);
  const activities = await fetchActivities();
  setActivities(dispatch, activities);
  const notifications = await fetchNotifications();
  setNotifications(dispatch, notifications);
};