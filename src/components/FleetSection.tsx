
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const vehicles = [
  {
    name: 'Executive Sedan',
    image: '/sedan.jpg',
    passengers: '1-3',
    luggage: '3',
    features: ['Leather Seats', 'Wi-Fi', 'Refreshments'],
    popular: true,
  },
  {
    name: 'Luxury SUV',
    image: '/suv.jpg',
    passengers: '1-6',
    luggage: '5',
    features: ['Spacious Interior', 'Privacy Glass', 'Premium Audio'],
  },
  {
    name: 'Stretch Limousine',
    image: '/limo.jpg',
    passengers: '1-8',
    luggage: '4',
    features: ['Bar Service', 'Entertainment System', 'Mood Lighting'],
  },
  {
    name: 'Premium Van',
    image: '/van.jpg',
    passengers: '1-12',
    luggage: '10',
    features: ['Reclining Seats', 'Individual AC', 'Extra Storage'],
  }
];

const FleetSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Fleet</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our selection of premium vehicles for your transportation needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <Card key={index} className="luxury-card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent z-10" />
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback image if the vehicle image fails to load
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';
                  }}
                />
                {vehicle.popular && (
                  <Badge className="absolute top-2 right-2 z-20 bg-gold text-primary-foreground">Popular</Badge>
                )}
              </div>
              <CardContent className="pt-4">
                <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>Passengers: {vehicle.passengers}</span>
                  <span>Luggage: {vehicle.luggage}</span>
                </div>
                <div className="space-y-1">
                  {vehicle.features.map((feature, i) => (
                    <div key={i} className="text-sm text-gray-300 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gold mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
