import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Calendar from '../components/Calendar';
import PerformanceGraph from '../components/PerformanceGraph';
import KPICards from '../components/KPICards';
import Notifications from '../components/Notifications';
import RecentActivities from '../components/RecentActivities';
import BotSettings from '../components/BotSettings';
import HomeLayout from '../../../layouts/HomeLayout';
import HomeProvider from '../context/HomeContext';

const HomePage: React.FC = () => (
  <HomeProvider>
    <HomeLayout>
      <Hero />
      <KPICards />
      <PerformanceGraph />
      <Calendar />
      <RecentActivities />
      <Notifications />
      <BotSettings />
      <Features />
      <Testimonials />
      <ContactForm />
    </HomeLayout>
  </HomeProvider>
);

export default HomePage;