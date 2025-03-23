
import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { experiences } from '@/data/portfolioData';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export const Experience: React.FC = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.1 });
  const [activeExperience, setActiveExperience] = useState(0);
  
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={cn(
            "section-title text-center",
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Work Experience
        </h2>
        
        <div className="mt-16 max-w-4xl mx-auto">
          {/* Timeline Header - Company Selector */}
          <div className="flex flex-wrap md:flex-nowrap gap-2 border-b border-border pb-2 mb-8 overflow-x-auto whitespace-nowrap">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveExperience(index)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all relative focus:outline-none",
                  activeExperience === index
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {exp.company}
                {activeExperience === index && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="experienceIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Experience Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 glass-panel glass-panel-dark glass-panel-synthwave rounded-lg"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{experiences[activeExperience].title}</h3>
                  <p className="text-primary">{experiences[activeExperience].company}</p>
                </div>
                <span className="mt-2 md:mt-0 text-muted-foreground">
                  {experiences[activeExperience].period}
                </span>
              </div>
              
              <p className="mb-6 text-muted-foreground">
                {experiences[activeExperience].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {experiences[activeExperience].skills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="px-3 py-1 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
