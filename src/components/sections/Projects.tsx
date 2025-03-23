
import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { projects } from '@/data/portfolioData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code } from 'lucide-react';
import AnimatedImage from '../ui/AnimatedImage';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const handleProjectClick = (index: number) => {
    setSelectedProject(selectedProject === index ? null : index);
  };
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={cn(
            "section-title text-center",
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Featured Projects
        </h2>
        
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Explore my recent work and see how I approach complex problems with elegant solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const projectAnimation = useScrollAnimation({ 
              threshold: 0.1, 
              delay: index * 100 
            });
            
            return (
              <motion.div
                key={index}
                ref={projectAnimation.ref as React.RefObject<HTMLDivElement>}
                className={cn(
                  "group rounded-lg overflow-hidden glass-panel glass-panel-dark glass-panel-synthwave transition-all duration-300 hover:shadow-lg",
                  projectAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                )}
                whileHover={{ y: -5 }}
                layout
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <AnimatedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button size="sm" className="rounded-full" asChild>
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="rounded-full" asChild>
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full h-8 w-8"
                      onClick={() => handleProjectClick(index)}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Expanded View */}
                {selectedProject === index && (
                  <div className="p-6 pt-0">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border/50 pt-4 mt-4"
                    >
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
