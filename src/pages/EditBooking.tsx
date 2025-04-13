
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import BookingForm, { BookingFormData } from '../components/BookingForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, User, MessageSquare } from 'lucide-react';

// Mock booking data - in a real app, this would come from an API
const mockBookings = [
  {
    id: 'BK-2023-0001',
    date: '2025-04-20',
    time: '14:30',
    pickupLocation: '123 Main St, New York, NY',
    dropoffLocation: 'JFK International Airport',
    vehicle: 'sedan',
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
    vehicle: 'suv',
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

const EditBooking = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewingAuditTrail, setViewingAuditTrail] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch booking data
    const fetchBooking = () => {
      setLoading(true);
      
      // Find booking in mock data - in a real app, this would be an API call
      const foundBooking = mockBookings.find(b => b.id === bookingId);
      
      setTimeout(() => {
        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          toast({
            title: "Error",
            description: "Booking not found",
            variant: "destructive",
          });
          navigate('/bookings');
        }
        setLoading(false);
      }, 500);
    };

    fetchBooking();
  }, [bookingId, navigate, toast]);

  const handleSubmit = (formData: BookingFormData) => {
    // Create updated booking with new audit trail entry
    const updatedBooking = {
      ...booking,
      ...formData,
      date: formData.date instanceof Date ? formData.date.toISOString().split('T')[0] : formData.date,
      auditTrail: [
        ...booking.auditTrail,
        {
          timestamp: new Date().toISOString(),
          action: 'updated',
          details: 'Booking details updated'
        }
      ]
    };

    // In a real app, this would be an API call to update the booking
    console.log('Updating booking:', updatedBooking);
    
    // Show success message
    toast({
      title: "Success",
      description: `Booking ${bookingId} has been updated successfully`,
    });
    
    // Navigate back to bookings page
    navigate('/bookings');
  };

  // Format date for display in audit trail
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Booking not found</p>
        <Button onClick={() => navigate('/bookings')} className="mt-4">
          Return to Bookings
        </Button>
      </div>
    );
  }

  if (viewingAuditTrail) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Audit Trail: {booking.id}</h1>
          <Button variant="outline" onClick={() => setViewingAuditTrail(false)}>
            Back to Editing
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Change History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {booking.auditTrail.map((entry: any, index: number) => (
                <div 
                  key={index} 
                  className="p-4 border border-border rounded-lg flex items-start"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium capitalize">{entry.action}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{entry.details}</p>
                  </div>
                </div>
              ))}
              
              {booking.auditTrail.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No changes have been recorded yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Booking: {booking.id}</h1>
        <Button 
          variant="outline" 
          onClick={() => setViewingAuditTrail(true)}
          className="mt-2 md:mt-0"
        >
          <Clock className="mr-2 h-4 w-4" />
          View Audit Trail
        </Button>
      </div>
      
      <BookingForm 
        mode="edit" 
        initialData={booking}
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default EditBooking;
