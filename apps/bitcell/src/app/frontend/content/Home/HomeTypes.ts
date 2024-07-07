export interface App {
  id: string;
  name: string;
  description: string;
}

export interface Announcement {
  id: string;
  message: string;
}

export interface KPI {
  id: string;
  title: string;
  progress: number;
}

export interface Activity {
  id: string;
  description: string;
}

export interface Notification {
  id: string;
  message: string;
}

export interface HomeState {
  featuredApps: App[];
  announcements: Announcement[];
  kpis: KPI[];
  activities: Activity[];
  notifications: Notification[];
}

export type HomeAction =
  | { type: 'SET_FEATURED_APPS'; payload: App[] }
  | { type: 'SET_ANNOUNCEMENTS'; payload: Announcement[] }
  | { type: 'SET_KPIS'; payload: KPI[] }
  | { type: 'SET_ACTIVITIES'; payload: Activity[] }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] };