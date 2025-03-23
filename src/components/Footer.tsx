
import React from 'react';
import { cn } from '@/lib/utils';
import { personalData, socialLinks } from '@/data/portfolioData';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const currentYear = new Date().getFullYear();

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'github':
      return <Github className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'twitter':
      return <Twitter className="h-5 w-5" />;
    case 'mail':
      return <Mail className="h-5 w-5" />;
    default:
      return null;
  }
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 py-12 mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-muted-foreground text-sm">
              Portfolio of {personalData.name}, a {personalData.title} based in {personalData.location}.
            </p>
          </div>
          
          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-sm hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm hover:text-primary transition-colors">About</a></li>
              <li><a href="#projects" className="text-sm hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Connect Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.icon)}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {personalData.email}
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} {personalData.name}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Built with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse-slow" /> and modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
