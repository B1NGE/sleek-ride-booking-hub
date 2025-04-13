
import React from 'react';
import { Car, Calendar, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const services = [
  {
    title: 'Airport Transfers',
    description: 'On-time pickup and drop-off at all major airports with flight tracking and free waiting time.',
    icon: Car,
  },
  {
    title: 'Corporate Events',
    description: 'Impress your clients and employees with our professional chauffeur service for all corporate occasions.',
    icon: Briefcase,
  },
  {
    title: 'Special Occasions',
    description: 'Make your special day memorable with our luxury vehicles for weddings, anniversaries, and other celebrations.',
    icon: Calendar,
  },
  {
    title: 'Group Transportation',
    description: 'Comfortable and stylish transportation for groups of all sizes with our fleet of luxury vehicles.',
    icon: Users,
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a variety of premium transportation services to meet your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="luxury-card">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-gold" />
                </div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
