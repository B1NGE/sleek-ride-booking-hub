
import React from 'react';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import FleetSection from '../components/FleetSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div>
      <Hero />
      <ServicesSection />
      <FleetSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
