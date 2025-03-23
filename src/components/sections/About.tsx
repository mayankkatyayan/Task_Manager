
import React from 'react';
import { personalData } from '@/data/portfolioData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import AnimatedImage from '../ui/AnimatedImage';

export const About: React.FC = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2 });
  const textAnimation = useScrollAnimation({ threshold: 0.2, delay: 200 });
  const imageAnimation = useScrollAnimation({ threshold: 0.2, delay: 400 });
  
  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div 
            ref={imageAnimation.ref as React.RefObject<HTMLDivElement>}
            className={cn(
              "order-2 lg:order-1 transition-all duration-700 transform",
              imageAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
          >
            <AnimatedImage
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
              alt="Professional headshot"
              className="rounded-lg shadow-lg w-full h-auto"
              effect="float"
            />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div 
                className="glass-panel glass-panel-dark glass-panel-synthwave p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={imageAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold">5+</h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </motion.div>
              
              <motion.div 
                className="glass-panel glass-panel-dark glass-panel-synthwave p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={imageAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold">20+</h3>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </motion.div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <h2 
              ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
              className={cn(
                "section-title after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary transition-all duration-700",
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              About Me
            </h2>
            
            <div 
              ref={textAnimation.ref as React.RefObject<HTMLDivElement>}
              className={cn(
                "mt-6 space-y-4 text-muted-foreground transition-all duration-700",
                textAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <p className="text-lg leading-relaxed">
                {personalData.about}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div>
                  <h3 className="text-base font-medium mb-1">Name</h3>
                  <p className="text-muted-foreground">{personalData.name}</p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-1">Email</h3>
                  <p className="text-muted-foreground">{personalData.email}</p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-1">Phone</h3>
                  <p className="text-muted-foreground">{personalData.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-1">Location</h3>
                  <p className="text-muted-foreground">{personalData.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
