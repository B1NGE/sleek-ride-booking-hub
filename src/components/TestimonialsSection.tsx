
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Thompson',
    role: 'Business Executive',
    content: 'The service was impeccable. The chauffeur was professional and the vehicle was luxurious. Will definitely use Sleek Ride again for my business trips.',
    rating: 5,
  },
  {
    name: 'Jennifer Parker',
    role: 'Wedding Planner',
    content: 'My clients were thrilled with the limousine service. The attention to detail and punctuality made their special day even more memorable.',
    rating: 5,
  },
  {
    name: 'Robert Chen',
    role: 'Frequent Traveler',
    content: 'I use Sleek Ride for all my airport transfers. Their reliability and comfort are unmatched, especially after long international flights.',
    rating: 4,
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our clients have to say about our premium transportation services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="luxury-card border-t-2 border-t-gold">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-gray-500'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-luxury-purple flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
