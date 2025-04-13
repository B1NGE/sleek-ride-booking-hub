
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from "../hooks/use-toast";
import { CalendarIcon, Clock, MapPin, User, Luggage, Car, MessageSquare, InfoIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Vehicle types
const vehicleTypes = [
  { id: 'sedan', name: 'Executive Sedan', capacity: 3, luggage: 2 },
  { id: 'suv', name: 'Luxury SUV', capacity: 6, luggage: 4 },
  { id: 'van', name: 'Passenger Van', capacity: 14, luggage: 14 },
  { id: 'stretch', name: 'Stretch Limousine', capacity: 8, luggage: 6 },
  { id: 'sprinter', name: 'Luxury Sprinter', capacity: 12, luggage: 12 },
];

export type BookingFormData = {
  id?: string;
  date: Date | string;
  time: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicle: string;
  passengers: number;
  luggage: number;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

type BookingFormProps = {
  initialData?: BookingFormData;
  mode: 'create' | 'edit';
  onSubmit: (data: BookingFormData) => void;
};

const defaultBooking: BookingFormData = {
  date: new Date(),
  time: '12:00',
  pickupLocation: '',
  dropoffLocation: '',
  vehicle: 'sedan',
  passengers: 1,
  luggage: 1,
  specialRequests: '',
  status: 'pending',
};

const BookingForm = ({ initialData = defaultBooking, mode, onSubmit }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>(initialData);
  const [date, setDate] = useState<Date | undefined>(
    initialData.date instanceof Date 
      ? initialData.date 
      : initialData.date ? new Date(initialData.date) : new Date()
  );
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Update form data when initialData changes (useful for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.date) {
        setDate(initialData.date instanceof Date 
          ? initialData.date 
          : new Date(initialData.date));
      }
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (value: string) => {
    setFormData(prev => ({ ...prev, vehicle: value }));
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setFormData(prev => ({ ...prev, [name]: numValue }));
    }
  };
  
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFormData(prev => ({ ...prev, date: newDate }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.pickupLocation || !formData.dropoffLocation || !date || !formData.time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Submit data to parent component
    onSubmit({
      ...formData,
      date: date,
    });
  };

  const handleCancel = () => {
    navigate('/bookings');
  };

  // Get selected vehicle details
  const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicle) || vehicleTypes[0];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'create' ? 'New Booking' : 'Edit Booking'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup & Dropoff Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gold" />
                <Input
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="Enter pickup address"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropoffLocation">Dropoff Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-luxury-purple" />
                <Input
                  id="dropoffLocation"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  placeholder="Enter destination address"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle Type</Label>
            <Select 
              value={formData.vehicle} 
              onValueChange={handleVehicleChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    <div className="flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      <span>{vehicle.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <InfoIcon className="h-3 w-3 mr-1" />
              {selectedVehicle.name} can accommodate up to {selectedVehicle.capacity} passengers and {selectedVehicle.luggage} pieces of luggage
            </div>
          </div>

          {/* Passengers & Luggage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="passengers">Number of Passengers</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max={selectedVehicle.capacity}
                  value={formData.passengers}
                  onChange={(e) => handleNumberChange('passengers', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="luggage">Pieces of Luggage</Label>
              <div className="relative">
                <Luggage className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="luggage"
                  name="luggage"
                  type="number"
                  min="0"
                  max={selectedVehicle.luggage}
                  value={formData.luggage}
                  onChange={(e) => handleNumberChange('luggage', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requirements or additional stops..."
                className="min-h-24 resize-none pl-10"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === 'create' ? 'Create Booking' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookingForm;
