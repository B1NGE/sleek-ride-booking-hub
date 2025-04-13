
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  backgroundImage?: string;
}

const Hero = ({ backgroundImage = '/hero-limo.jpg' }: HeroProps) => {
  return (
    <div className="hero-section" style={{ 
      backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.7), rgba(26, 31, 44, 0.9)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container mx-auto px-4 py-24 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Luxury Transportation <span className="text-gold">On Demand</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 animate-slideUp">
            Experience the ultimate in comfort and style with our premium limousine service. Available 24/7 for your transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp">
            <Link to="/signup">
              <Button size="lg" className="hero-button">
                Book a Vehicle
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline" size="lg" className="text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
