
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { education } from '@/data/portfolioData';
import { motion } from 'framer-motion';

export const Education: React.FC = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={cn(
            "section-title text-center",
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Education & Qualifications
        </h2>
        
        <div className="max-w-4xl mx-auto mt-16 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />
          
          {education.map((edu, index) => {
            const isEven = index % 2 === 0;
            const eduAnimation = useScrollAnimation({ 
              threshold: 0.1, 
              delay: index * 100 
            });
            
            return (
              <div 
                key={index}
                className="relative mb-12 last:mb-0"
                ref={eduAnimation.ref as React.RefObject<HTMLDivElement>}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 z-10 mt-1" />
                
                {/* Content Card */}
                <motion.div
                  className={cn(
                    "md:w-1/2 glass-panel glass-panel-dark glass-panel-synthwave rounded-lg p-6 ml-6 md:ml-0",
                    isEven ? "md:mr-auto" : "md:ml-auto md:pl-6",
                    eduAnimation.isVisible ? "opacity-100" : "opacity-0",
                    isEven 
                      ? eduAnimation.isVisible ? "translate-x-0" : "-translate-x-20" 
                      : eduAnimation.isVisible ? "translate-x-0" : "translate-x-20"
                  )}
                  initial={false}
                  animate={{ 
                    opacity: eduAnimation.isVisible ? 1 : 0,
                    x: eduAnimation.isVisible ? 0 : (isEven ? -20 : 20)
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-primary">{edu.institution}</p>
                    </div>
                    <span className="mt-2 md:mt-0 text-muted-foreground whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {edu.description}
                  </p>
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Achievements</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
