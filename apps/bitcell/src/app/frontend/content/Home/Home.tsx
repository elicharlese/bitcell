import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import HomeLayout from '../../../layouts/HomeLayout';
import HomeProvider from '../context/HomeContext';

const Home: React.FC = () => (
  <HomeProvider>
    <HomeLayout>
      <Hero />
      <Features />
      <Testimonials />
      <ContactForm />
    </HomeLayout>
  </HomeProvider>
);

export default Home;