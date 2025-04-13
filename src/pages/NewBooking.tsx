
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import BookingForm, { BookingFormData } from '../components/BookingForm';

const NewBooking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (formData: BookingFormData) => {
    // Generate a booking ID (in a real app, this would come from the backend)
    const bookingId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create a new booking with audit trail
    const newBooking = {
      ...formData,
      id: bookingId,
      date: formData.date instanceof Date ? formData.date.toISOString().split('T')[0] : formData.date,
      status: 'pending',
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: 'created',
          details: 'Booking created'
        }
      ]
    };

    // In a real app, this would be an API call to save the booking
    console.log('Creating new booking:', newBooking);
    
    // Show success message
    toast({
      title: "Success",
      description: `Booking ${bookingId} has been created successfully`,
    });
    
    // Navigate back to bookings page
    navigate('/bookings');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Booking</h1>
      <BookingForm 
        mode="create" 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default NewBooking;
