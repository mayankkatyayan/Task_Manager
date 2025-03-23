
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { skills } from '@/data/portfolioData';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={cn(
            "section-title text-center",
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Skills & Technologies
        </h2>
        
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          A comprehensive overview of my technical skills and competencies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skills.map((skillCategory, categoryIndex) => {
            const categoryAnimation = useScrollAnimation({ 
              threshold: 0.1, 
              delay: categoryIndex * 100 
            });
            
            return (
              <div 
                key={categoryIndex}
                ref={categoryAnimation.ref as React.RefObject<HTMLDivElement>}
                className={cn(
                  "glass-panel glass-panel-dark glass-panel-synthwave p-6 rounded-lg transition-all duration-500",
                  categoryAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
              >
                <h3 className="text-xl font-bold mb-6">{skillCategory.category}</h3>
                
                <div className="space-y-6">
                  {skillCategory.items.map((skill, skillIndex) => {
                    // Calculate delay based on category and item indices
                    const delay = 0.1 + (categoryIndex * 0.05) + (skillIndex * 0.05);
                    
                    return (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        
                        <motion.div
                          initial={{ width: 0 }}
                          animate={categoryAnimation.isVisible ? { width: "100%" } : { width: 0 }}
                          transition={{ duration: 0.5, delay }}
                        >
                          <Progress value={skill.level} className="h-2" />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
