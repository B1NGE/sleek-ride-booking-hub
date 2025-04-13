
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Car } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
          <Car className="h-12 w-12 text-gold" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-6">
          We couldn't find the page you're looking for.
        </p>
        <p className="text-gray-500 mb-8">
          The page may have been moved, deleted, or never existed. Let's get you back on track.
        </p>
        
        <Link to="/">
          <Button size="lg" className="hero-button">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
