
import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { personalData, socialLinks } from '@/data/portfolioData';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const Contact: React.FC = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.1 });
  const formAnimation = useScrollAnimation({ threshold: 0.1, delay: 200 });
  const infoAnimation = useScrollAnimation({ threshold: 0.1, delay: 400 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send this data to your server
    console.log('Form submitted:', data);
    
    toast.success('Message sent successfully!', {
      description: 'Thanks for reaching out. I\'ll get back to you soon.',
    });
    
    form.reset();
    setIsSubmitting(false);
  };
  
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={cn(
            "section-title text-center",
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Get In Touch
        </h2>
        
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Have a project in mind or want to explore collaboration opportunities? Feel free to reach out.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div 
            className="lg:col-span-2"
            ref={formAnimation.ref as React.RefObject<HTMLDivElement>}
          >
            <Card className={cn(
              "glass-panel glass-panel-dark glass-panel-synthwave transition-all duration-500",
              formAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Message subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="min-h-32 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-4" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div 
            ref={infoAnimation.ref as React.RefObject<HTMLDivElement>}
            className={cn(
              "transition-all duration-500",
              infoAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <Card className="glass-panel glass-panel-dark glass-panel-synthwave h-full">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  You can also reach me through these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium">Email</h4>
                    <a 
                      href={`mailto:${personalData.email}`} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalData.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium">Phone</h4>
                    <a 
                      href={`tel:${personalData.phone.replace(/\s+/g, '')}`} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalData.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-base font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      {personalData.location}
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-border">
                  <h4 className="text-base font-medium mb-4">Connect With Me</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((link) => (
                      <a 
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-foreground/5 hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label={link.platform}
                      >
                        {/* Icon rendered based on the `icon` field in the data */}
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                I'm currently available for freelance work or full-time positions.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
