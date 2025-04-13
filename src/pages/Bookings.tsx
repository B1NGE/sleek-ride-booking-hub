
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from "../hooks/use-toast";
import { 
  CalendarClock, Clock, FileEdit, Plus, MapPin, Calendar, 
  User, Clock3, Luggage, Car, MessageSquare, History
} from 'lucide-react';
import { Badge } from '../components/ui/badge';

// Mock booking data
const upcomingBookings = [
  {
    id: 'BK-2023-0001',
    date: '2025-04-20',
    time: '14:30',
    pickupLocation: '123 Main St, New York, NY',
    dropoffLocation: 'JFK International Airport',
    vehicle: 'Executive Sedan',
    passengers: 2,
    luggage: 2,
    status: 'confirmed',
    specialRequests: 'Extra stop at Starbucks',
    auditTrail: [
      {
        timestamp: '2025-04-10T09:00:00Z',
        action: 'created',
        details: 'Booking created'
      }
    ]
  },
  {
    id: 'BK-2023-0002',
    date: '2025-04-25',
    time: '09:00',
    pickupLocation: 'Hilton Hotel, Manhattan',
    dropoffLocation: '555 Business Center, Brooklyn',
    vehicle: 'Luxury SUV',
    passengers: 4,
    luggage: 4,
    status: 'pending',
    specialRequests: '',
    auditTrail: [
      {
        timestamp: '2025-04-12T15:30:00Z',
        action: 'created',
        details: 'Booking created'
      }
    ]
  }
];

const pastBookings = [
  {
    id: 'BK-2023-0003',
    date: '2025-03-15',
    time: '18:30',
    pickupLocation: 'LaGuardia Airport',
    dropoffLocation: 'Grand Hyatt, Manhattan',
    vehicle: 'Executive Sedan',
    passengers: 1,
    luggage: 2,
    status: 'completed',
    specialRequests: '',
    auditTrail: [
      {
        timestamp: '2025-03-10T12:00:00Z',
        action: 'created',
        details: 'Booking created'
      },
      {
        timestamp: '2025-03-15T18:30:00Z',
        action: 'completed',
        details: 'Ride completed'
      }
    ]
  }
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewBooking = () => {
    navigate('/new-booking');
  };

  const handleEditBooking = (id: string) => {
    navigate(`/edit-booking/${id}`);
  };

  const handleCancelBooking = (id: string) => {
    toast({
      description: `Booking ${id} has been cancelled.`,
    });
  };

  const handleViewAuditTrail = (id: string) => {
    navigate(`/edit-booking/${id}`, { state: { showAuditTrail: true } });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let variant = "outline";
    let label = status.charAt(0).toUpperCase() + status.slice(1);
    
    switch(status) {
      case "confirmed":
        variant = "default";
        break;
      case "pending":
        variant = "secondary";
        break;
      case "completed":
        variant = "outline";
        break;
      case "cancelled":
        variant = "destructive";
        break;
    }
    
    return (
      <Badge variant={variant as any}>{label}</Badge>
    );
  };

  // Booking card component
  const BookingCard = ({ booking, showActions = true }: { booking: any, showActions?: boolean }) => {
    return (
      <Card className="luxury-card mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{booking.id}</CardTitle>
            <StatusBadge status={booking.status} />
          </div>
          <CardDescription className="flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {booking.date} • <Clock className="h-4 w-4 mx-1" /> {booking.time}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-gold" />
                <div>
                  <div className="text-sm font-medium">Pickup</div>
                  <div className="text-sm text-gray-400">{booking.pickupLocation}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-luxury-purple" />
                <div>
                  <div className="text-sm font-medium">Dropoff</div>
                  <div className="text-sm text-gray-400">{booking.dropoffLocation}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-2 border-y border-border">
              <div className="flex flex-col items-center">
                <Car className="h-4 w-4 mb-1 text-muted-foreground" />
                <div className="text-xs text-center">{booking.vehicle}</div>
              </div>
              
              <div className="flex flex-col items-center">
                <User className="h-4 w-4 mb-1 text-muted-foreground" />
                <div className="text-xs text-center">{booking.passengers} Passengers</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Luggage className="h-4 w-4 mb-1 text-muted-foreground" />
                <div className="text-xs text-center">{booking.luggage} Luggage</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Clock3 className="h-4 w-4 mb-1 text-muted-foreground" />
                <div className="text-xs text-center">On Time</div>
              </div>
            </div>
            
            {booking.specialRequests && (
              <div className="flex items-start mt-2">
                <MessageSquare className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <div className="text-xs font-medium">Special Requests</div>
                  <div className="text-xs text-gray-400">{booking.specialRequests}</div>
                </div>
              </div>
            )}
            
            {booking.auditTrail && booking.auditTrail.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs w-full flex justify-center items-center text-muted-foreground hover:text-foreground"
                onClick={() => handleViewAuditTrail(booking.id)}
              >
                <History className="h-3 w-3 mr-1" />
                View Change History ({booking.auditTrail.length} {booking.auditTrail.length === 1 ? 'entry' : 'entries'})
              </Button>
            )}
            
            {showActions && booking.status !== 'completed' && booking.status !== 'cancelled' && (
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleEditBooking(booking.id)}
                >
                  <FileEdit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage and track your limousine bookings</p>
        </div>
        <Button onClick={handleNewBooking} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming" className="flex items-center">
            <CalendarClock className="h-4 w-4 mr-2" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Past
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingBookings.length > 0 ? (
            <div>
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You have no upcoming bookings</p>
              <Button onClick={handleNewBooking} className="mt-4">Create a Booking</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastBookings.length > 0 ? (
            <div>
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} showActions={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You have no past bookings</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
