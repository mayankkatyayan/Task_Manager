
import React from 'react';
import { personalData } from '@/data/portfolioData';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              {personalData.title}
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I'm{' '}
            <span className={
              theme === 'synthwave'
                ? 'text-gradient-synthwave'
                : 'text-gradient-primary'
            }>
              {personalData.name}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {personalData.bio}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <a href="#contact" className="rounded-full">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full"
              >
                <Github className="mr-2 h-5 w-5" />
                View GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Background effects */}
      {theme === 'synthwave' && (
        <>
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-50 animate-float" />
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary/30 rounded-full filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />
        </>
      )}
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <a 
          href="#about" 
          className="inline-flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
