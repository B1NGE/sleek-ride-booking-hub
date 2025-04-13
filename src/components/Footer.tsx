
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-gold text-xl font-bold mr-1">SLEEK</span>
              <span className="text-white text-xl font-light">RIDE</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Premium limousine services for executives, special events, and airport transfers.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-gold">Home</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-gold">Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-gold">Sign Up</Link></li>
              <li><Link to="/bookings" className="text-gray-400 hover:text-gold">Manage Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gold">Airport Transfers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold">Corporate Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold">Wedding Transportation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold">Special Occasions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>info@sleekride.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sleek Ride. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
