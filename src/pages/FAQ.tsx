
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from "../hooks/use-toast";
import { HelpCircle, Mail, Phone } from 'lucide-react';

const FAQ = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Help & Frequently Asked Questions</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions about our services, booking process, and policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  How do I book a limousine?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  You can book a limousine through our website by creating an account and using our online booking system. Alternatively, you can call our customer service for assistance. We recommend booking at least 24 hours in advance to ensure availability.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  What types of vehicles do you offer?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  We offer a variety of luxury vehicles including executive sedans, SUVs, stretch limousines, and premium vans. Each vehicle type has different passenger and luggage capacities. You can view our fleet details on our website.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  How far in advance should I book?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  We recommend booking as soon as you know your travel dates, especially for special events or peak seasons. For regular transportation, we suggest booking at least 24 hours in advance. For weddings and special events, we recommend booking 2-3 months ahead.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Cancellations made more than 24 hours before the scheduled pickup time will receive a full refund. Cancellations made within 24 hours of the scheduled pickup time will incur a 50% cancellation fee. No-shows will be charged the full amount.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-5" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  Do you provide airport pickups and drop-offs?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Yes, we specialize in airport transfers. Our chauffeurs monitor flight arrivals to ensure they are there when you arrive, even if your flight is delayed. We provide 60 minutes of free waiting time for international flights and 30 minutes for domestic flights.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-6" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  Are gratuities included in the price?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Gratuity is not included in the base price and is at the client's discretion. However, for special events and large group bookings, a standard 20% gratuity may be added to the total. This will be clearly indicated during the booking process.
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card className="luxury-card overflow-hidden">
              <AccordionItem value="item-7" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                  What if my plans change after booking?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  You can modify your booking details up to 12 hours before the scheduled pickup time through your account. For last-minute changes, please contact our customer service team directly.
                </AccordionContent>
              </AccordionItem>
            </Card>
          </Accordion>
        </div>

        <div>
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-gold" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Input type="email" placeholder="Your Email" required />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Your Message" rows={4} required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>support@sleekride.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
