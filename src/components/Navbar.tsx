
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in when component mounts or route changes
  useEffect(() => {
    // This is a simplistic implementation - in a real app, this would check
    // authentication state from a context, Redux store, or token in localStorage
    const checkLoginStatus = () => {
      // For demo purposes, if the user is on the bookings page or related pages,
      // we'll assume they're logged in
      const loggedInRoutes = ['/bookings', '/new-booking', '/edit-booking'];
      const isOnProtectedRoute = loggedInRoutes.some(route => 
        location.pathname.startsWith(route)
      );
      
      // If coming from login page with success, consider them logged in
      if (location.pathname === '/bookings' && location.state?.from === '/login') {
        setIsLoggedIn(true);
      } 
      // For demo: If on protected route, ensure logged in state
      else if (isOnProtectedRoute) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [location]);

  const handleLogout = () => {
    // In a real app, this would clear the auth token, call a logout API, etc.
    setIsLoggedIn(false);
    setIsOpen(false);
    
    // Navigate to home
    navigate('/', { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-gold text-xl font-bold mr-1">SLEEK</span>
              <span className="text-white text-xl font-light">RIDE</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="nav-link nav-link-active">Home</Link>
            <Link to="/faq" className="nav-link">Help & FAQ</Link>
            {isLoggedIn ? (
              <>
                <Link to="/bookings" className="nav-link">My Bookings</Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center text-white"
                  onClick={handleLogout} 
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-sm animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link 
              to="/" 
              className="block px-3 py-2 text-white hover:bg-luxury-purple/20 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/faq" 
              className="block px-3 py-2 text-gray-300 hover:bg-luxury-purple/20 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Help & FAQ
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/bookings" 
                  className="block px-3 py-2 text-gray-300 hover:bg-luxury-purple/20 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  My Bookings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block px-3 py-2 text-gray-300 hover:bg-luxury-purple/20 rounded-md text-left flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link 
                  to="/login" 
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
